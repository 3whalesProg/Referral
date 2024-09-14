import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('users', (table) => {
        table.integer('referredBy').unsigned().nullable(); 
        table.foreign('referredBy').references('id').inTable('users');  // делаю ключем, что бы потом можно было удобно получать 
        table.index('referredBy'); // использую, что бы в будущем поиск по таблице шел быстрее
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('users', (table) => {
        table.dropIndex('referredBy') 
        table.dropForeign('referredBy')
        table.dropColumn('referredBy')
      });
}

