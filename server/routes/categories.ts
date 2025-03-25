import { Router } from 'express'

import * as db from '../db/index.ts'

const router = Router()

//http://localhost:3002/api/v1/categories
router.get('/', async (req, res) => {
  try {
    const categories = await db.getAllCategories()

    res.json({ categories })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Something went wrong while loading all categories' })
  }
})

export default router

// used for admin's content management system

router.post('/', async (req, res, next) => {
  try {
  } catch (e) {
    next(e)
  }
})
