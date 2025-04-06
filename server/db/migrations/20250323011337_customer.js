export async function up(knex) {
  return knex.schema.createTable('customer', (table) => {
    table.increments('id')
    table.string('email')
    table.string('first_name')
    table.string('last_name')
    table.string('phone')
    table.string('pickup_time')
    table.string('comment')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('customer')
}
