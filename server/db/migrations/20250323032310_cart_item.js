export async function up(knex) {
  return knex.schema.createTable('cart_item', (table) => {
    table.increments('id')
    table
      .integer('cart_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cart')
      .onDelete('CASCADE')
    table
      .integer('product_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('product')
    table.integer('quantity').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return knex.schema.dropTable('cart_item')
}
