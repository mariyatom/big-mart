export async function up(knex) {
  return knex.schema.createTable('product', (table) => {
    table.increments('id')
    table.string('name')
    table.integer('price')
    table.string('currency')
    table.string('image')
    table.string('description')
    table.integer('category_id').references('category.id')
    table.string('location')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('product')
}
