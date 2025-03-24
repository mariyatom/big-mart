import { Router } from 'express'

import * as db from '../db/index.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const products = await db.getAllProducts()

    res.json({ products })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Something went wrong while loading all products' })
  }
})

router.get('/search', async (req, res) => {
  try {
    const { searchTerm } = req.query

    if (
      !searchTerm ||
      typeof searchTerm !== 'string' ||
      searchTerm.trim().length === 0
    ) {
      return res.status(400).json({ message: 'Search term is required' }) //400 Bad Request
    }

    const products = await db.searchProducts(searchTerm as string)

    res.json({ products })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'Something went wrong while searching for products' }) //500 Internal Server Error
  }
})

export default router
