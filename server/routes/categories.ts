import { Router } from 'express'

import * as db from '../db/index.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const categories = await db.getAllCategories()

    res.json({ categories })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
