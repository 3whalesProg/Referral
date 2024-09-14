import knex from '../db'
import { Knex } from 'knex'


export interface Lesson {
  id: number
  subject: string
  description?: string
  scheduled_date: Date
  type: 'subscription' | 'free';
  created_at?: Date
  updated_at?: Date
}

export class Lesson {
  private knex: Knex;

  constructor(knexInstance: Knex) {
    this.knex = knexInstance
  }

  public async getAll(offset: any ): Promise<Lesson[]> {
    return this.knex('lessons')
      .select('*')
      .orderBy('scheduled_date', 'asc') 
      .limit(10) 
      .offset(offset); 
  }

  public async getById(id: number): Promise<Lesson | null> {
    return this.knex('lessons').where({ id }).first();
  }

  public async getUsers(id: number): Promise<any[]> {
    return this.knex('users')
      .join('lesson_user', 'users.id', 'lesson_user.user_id')
      .where('lesson_user.lesson_id', id)
  }
}

const lessonModel = new Lesson(knex)
export default lessonModel