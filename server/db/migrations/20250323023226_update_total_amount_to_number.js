export async function up(knex) {
  return knex.schema.table('payment', (table) => {
    table.float('total_amount').alter() // Change to integer
  })
}

export async function down(knex) {
  return knex.schema.table('payment', (table) => {
    table.string('total_amount').alter() // Revert back to string if needed
  })
}
