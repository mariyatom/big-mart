export async function up(knex) {
  return knex.schema.createTable('payment', (table) => {
    table.increments('id')
    table.string('first_name')
    table.string('last_name')
    table.string('phone')
    table.string('country')
    table.string('address')
    table.string('city')
    table.string('region')
    table.string('zip')
    table.string('total_amount')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('payment')
}
