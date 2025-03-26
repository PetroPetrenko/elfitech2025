import knex from 'knex';
import config from '../db/knexfile';
import type { Questionnaire } from '../types/questionnaire';

const db = knex(config);

export const questionnairesDb = {
  async create(data: Omit<Questionnaire, 'id' | 'createdAt' | 'updatedAt' | 'completionCount'>) {
    const [questionnaire] = await db('questionnaires')
      .insert({
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description,
        time_limit: data.timeLimit,
        status: data.status || 'draft',
        questions_data: JSON.stringify(data.questions || []),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        completion_count: 0,
      })
      .returning('*');

    return questionnaire;
  },

  async update(id: string, data: Partial<Questionnaire>) {
    const [questionnaire] = await db('questionnaires')
      .where({ id })
      .update({
        title: data.title,
        description: data.description,
        time_limit: data.timeLimit,
        status: data.status,
        questions_data: data.questions ? JSON.stringify(data.questions) : undefined,
        updated_at: new Date().toISOString(),
      })
      .returning('*');

    return questionnaire;
  },

  async findById(id: string) {
    return db('questionnaires').where({ id }).first();
  },

  async findAll(filters: { search?: string; status?: string; sortBy?: string; sortOrder?: 'asc' | 'desc' }) {
    let query = db('questionnaires');

    if (filters.search) {
      query = query.where('title', 'like', `%${filters.search}%`);
    }

    if (filters.status) {
      query = query.where('status', filters.status);
    }

    if (filters.sortBy) {
      const column = filters.sortBy === 'completionCount' ? 'completion_count' : filters.sortBy;
      query = query.orderBy(column, filters.sortOrder || 'desc');
    } else {
      query = query.orderBy('created_at', 'desc');
    }

    const results = await query;
    
    // Transform database records to frontend format
    return results.map(record => ({
      id: record.id,
      title: record.title,
      description: record.description,
      questions: JSON.parse(record.questions_data || '[]'),
      createdAt: record.created_at,
      updatedAt: record.updated_at,
      status: record.status,
      timeLimit: record.time_limit,
      completionCount: record.completion_count,
      questionCount: JSON.parse(record.questions_data || '[]').length
    }));
  },

  async delete(id: string) {
    return db('questionnaires').where({ id }).del();
  }
};