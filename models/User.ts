import knex from '../db'; // Импортируйте настроенный экземпляр Knex
import { Knex } from 'knex';

// Определение интерфейса для модели User
export interface IUser {
  id?: number; 
  email: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  password: string;
  isSubscriber: boolean;
  referredBy?: any;
  createdAt?: Date; 
  updatedAt?: Date; 
}

// Класс модели User
export class User {
  private knex: Knex;

  constructor(knexInstance: Knex) {
    this.knex = knexInstance;
  }

  public async getAll(): Promise<IUser[]> {
    return this.knex('users').select('*');
  }

  //Получение User по id
  public async getById(id: number): Promise<IUser | undefined> {
    return this.knex('users').where({ id }).first();
  }

  //Создание нового User
  public async create(user: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
    const [newUser] = await this.knex('users').insert(user).returning('*');
    return newUser;
  }

  //Обновление информации User по id
  public async update(id: number, user: Partial<Omit<IUser, 'id'>>): Promise<number> {
    return this.knex('users').where({ id }).update(user);
  }

  //Удаление User по id
  public async delete(id: number): Promise<number> {
    return this.knex('users').where({ id }).del();
  }

  //Получение User по email
  public async getByEmail(email: string): Promise<IUser | undefined> {
    return this.knex('users').where({ email }).first();
  }

  public async getReferrals(userId: number): Promise<Omit<IUser, 'password'>[]> {
    const referrals = await this.knex('users').where({ referredBy: userId });
    return referrals.map(({ password, ...rest }) => rest); //исключаю пароли из ответа
  }

  public async getLessons(id: number): Promise<any[]> {
    return this.knex('lessons')
      .join('lesson_user', 'lessons.id', 'lesson_user.lesson_id')
      .where('lesson_user.user_id', id);
  }

  public async setSubscriber(id: number): Promise<number> {
    return this.knex('users')
      .where({ id })
      .update({ isSubscriber: true });
  }
}

const userModel = new User(knex);
export default userModel;