import { db } from '../database/init.js';

export class UserRepository {
  findAll() {
    return db.prepare('SELECT id, email, name, role, created_at, updated_at FROM users').all();
  }

  findById(id) {
    return db.prepare('SELECT id, email, name, role, created_at, updated_at FROM users WHERE id = ?').get(id);
  }

  findByEmail(email) {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  }

  create(userData) {
    const { lastInsertRowid } = db.prepare(`
      INSERT INTO users (email, password, name, role)
      VALUES (@email, @password, @name, @role)
    `).run(userData);

    return this.findById(lastInsertRowid);
  }

  update(id, userData) {
    const fields = Object.keys(userData)
      .filter(key => userData[key] !== undefined)
      .map(key => `${key} = @${key}`)
      .join(', ');

    if (!fields) return this.findById(id);

    db.prepare(`
      UPDATE users
      SET ${fields}, updated_at = CURRENT_TIMESTAMP
      WHERE id = @id
    `).run({ ...userData, id });

    return this.findById(id);
  }

  delete(id) {
    return db.prepare('DELETE FROM users WHERE id = ?').run(id);
  }
}