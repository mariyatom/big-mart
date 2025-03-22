import connection from './connection.ts'
import { Fruit } from '../../models/fruit.ts'
import { Category } from '../../models/category.ts'
import { Product } from '../../models/product.ts'

export async function getAllFruits(db = connection): Promise<Fruit[]> {
  return db('fruit').select()
}

export async function getAllCategories(): Promise<Category[]> {
  return await connection('category').select('*')
}
export async function getAllProducts(): Promise<Product[]> {
  return await connection('product').select('*')
}
