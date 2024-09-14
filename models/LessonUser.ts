import knex from '../db'
import { Knex } from 'knex';

// Определение интерфейса для данных связи между уроком и пользователем
export interface ILessonUser {
  lesson_id: number;
  user_id: number;
}

class LessonUser {
  private knex: Knex;

  constructor(knexInstance: Knex) {
    this.knex = knexInstance;
  }

  
  public async existsSingUp(lessonId: number, userId: number): Promise<boolean> { //проверяем, записан ли пользователь на этот урок
    const count = await this.knex('lesson_user')
      .where({ lesson_id: lessonId, user_id: userId })
      .count({ count: '*' });

    const isExist:any = count[0]?.count
    return  isExist > 0
  }

  public async сlassSignup(lessonId: number, userId: number): Promise<LessonUser> { //записать пользователя на урок
    return this.knex('lesson_user').insert({ lesson_id: lessonId, user_id: userId });
  }
}

const lessonUser = new LessonUser(knex);
export default lessonUser;