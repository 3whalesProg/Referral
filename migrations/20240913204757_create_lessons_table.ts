import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('lessons', (table) => {
        table.increments('id').primary()
        table.string('subject').notNullable()
        table.text('description').nullable()
        table.date('scheduled_date').notNullable();
        table.enum('type', ['subscription', 'free']).notNullable()
        table.timestamps(true, true)
      })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('lessons')
}

