import connection from './connection.ts'
import { Fruit } from '../../models/fruit.ts'
import { Category } from '../../models/category.ts'

export async function getAllFruits(db = connection): Promise<Fruit[]> {
  return db('fruit').select()
}

export async function getAllCategories(): Promise<Category[]> {
  return await connection('category').select('*')
}
