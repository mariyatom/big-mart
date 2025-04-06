import bcrypt from 'bcrypt'

export async function seed(knex) {
  await knex('admin').del()

  const hashedPassword = await bcrypt.hash('admin123', 10) // Change 'admin123' to a secure password

  await knex('admin').insert([
    {
      username: 'admin',
      password: hashedPassword,
      is_valid: true,
    },
  ])
}
