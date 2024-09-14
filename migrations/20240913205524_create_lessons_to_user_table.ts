import type { Knex } from "knex"


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('lesson_user', (table) => {
        table.integer('lesson_id').unsigned().notNullable()
        table.integer('user_id').unsigned().notNullable()
        table.foreign('lesson_id').references('id').inTable('lessons').onDelete('CASCADE')
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
        table.primary(['lesson_id', 'user_id'])
      })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('lesson_user')
}

