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
const createResponseSchema = z.object({
  questionnaire_id: z.number().int().positive(),
  respondent_id: z.string().min(1),
  answers: z.record(z.any())
});

// Submit response
router.post('/', async (req, res) => {
  try {
    const validation = createResponseSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.error.format() 
      });
    }

    const { questionnaire_id, respondent_id, answers } = validation.data;

    const [responseId] = await db('responses').insert({
      questionnaire_id,
      respondent_id,
      answers: JSON.stringify(answers),
      completed_at: new Date().toISOString()
    });

    res.status(201).json({ id: responseId });
  } catch (error) {
    logger.error('Error creating response:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get responses by questionnaire ID
router.get('/:questionnaireId', async (req, res) => {
  try {
    const { questionnaireId } = req.params;

    const responses = await db('responses')
      .where({ questionnaire_id: questionnaireId })
      .orderBy('started_at', 'desc');

    res.json(responses.map(r => ({
      ...r,
      answers: JSON.parse(r.answers)
    })));
  } catch (error) {
    logger.error('Error fetching responses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;