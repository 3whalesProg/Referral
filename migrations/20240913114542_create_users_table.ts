import type { Knex } from "knex"


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary() 
        table.string('email').unique().notNullable()
        table.string('firstName').notNullable()
        table.string('secondName').notNullable() 
        table.string('thirdName').notNullable()
        table.string('password').notNullable()
        table.timestamps(true, true)
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users')
}

