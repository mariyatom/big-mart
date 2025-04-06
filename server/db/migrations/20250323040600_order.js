export async function up(knex) {
  return knex.schema.createTable('order', (table) => {
    table.increments('id')
    table
      .integer('customer_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('customer')
      .onDelete('CASCADE')
    table
      .integer('payment_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('payment')
      .onDelete('CASCADE')
    table
      .integer('cart_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cart')
      .onDelete('CASCADE')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.text('order_email')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('order')
}
