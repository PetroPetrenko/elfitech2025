import express from 'express';
import { z } from 'zod';
import { db } from '../../../db';
import { logger } from '../../../utils/logger';
import { rateLimit } from 'express-rate-limit';

const router = express.Router();

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

router.use(apiLimiter);

// Validation schemas
const questionSchema = z.object({
  question_text: z.string().min(1),
  question_type: z.enum(['text', 'single', 'multiple', 'image']),
  options: z.array(z.string()).nullable(),
  required: z.boolean(),
  order: z.number().int().min(0)
});

const createQuestionnaireSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  questions: z.array(questionSchema)
});

// Create questionnaire
router.post('/', async (req, res) => {
  try {
    // Debug: Log incoming request
    console.log('Received questionnaire creation request:', req.body);
    logger.info('Questionnaire creation request received', { body: req.body });

    const validation = createQuestionnaireSchema.safeParse(req.body);
    
    if (!validation.success) {
      logger.warn('Validation failed for questionnaire creation', {
        errors: validation.error.format()
      });
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.error.format() 
      });
    }

    const { title, description, questions } = validation.data;

    // Debug: Log pre-database operation
    console.log('Attempting database operation with:', { title, description, questions });
    logger.info('Starting questionnaire database transaction');

    const [questionnaireId] = await db.transaction(async (trx) => {
      try {
        // Debug: Log database operations
        console.log('Creating questionnaire record');
        const [id] = await trx('questionnaires').insert({
          title,
          description,
          status: 'draft'
        });

        console.log('Creating question records');
        await trx('questions').insert(
          questions.map(q => ({
            ...q,
            questionnaire_id: id,
            options: q.options ? JSON.stringify(q.options) : null
          }))
        );

        logger.info('Database transaction successful', { questionnaireId: id });
        return [id];
      } catch (error) {
        logger.error('Database transaction failed', { error });
        throw error;
      }
    });

    // Debug: Log successful creation
    console.log('Database operation result:', { questionnaireId });
    logger.info('Questionnaire created successfully', { id: questionnaireId });

    res.status(201).json({ id: questionnaireId });
  } catch (error) {
    console.error('Error creating questionnaire:', error);
    logger.error('Error in questionnaire creation endpoint', { error });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all questionnaires
router.get('/', async (req, res) => {
  try {
    const questionnaires = await db('questionnaires')
      .select('*')
      .orderBy('created_at', 'desc');

    res.json(questionnaires);
  } catch (error) {
    logger.error('Error fetching questionnaires:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get questionnaire by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const questionnaire = await db('questionnaires')
      .where({ id })
      .first();

    if (!questionnaire) {
      return res.status(404).json({ error: 'Questionnaire not found' });
    }

    const questions = await db('questions')
      .where({ questionnaire_id: id })
      .orderBy('order');

    res.json({
      ...questionnaire,
      questions: questions.map(q => ({
        ...q,
        options: q.options ? JSON.parse(q.options) : null
      }))
    });
  } catch (error) {
    logger.error('Error fetching questionnaire:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;