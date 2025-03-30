export async function up(knex) {
  return knex.schema.createTable('admin', (table) => {
    table.increments('id').primary()
    table.string('username').notNullable().unique() // Ensure unique usernames
    table.string('password').notNullable()
    table.boolean('is_valid').defaultTo(true) // Default to true
    table.timestamps(true, true) // Adds created_at & updated_at
  })
}

export async function down(knex) {
  return knex.schema.dropTable('admin')
}
