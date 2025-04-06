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

// used for admin's content management system

router.post('/', async (req, res, next) => {
  try {
    const { category, link, image } = req.body
    const newTodo = {
      category,
      link,
      image,
    }
    const id = await db.addNewCategory(newTodo)
    res.status(201).json({ id })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const category = await db.getCategoriesById(id)
    if (!category) {
      return res.sendStatus(404) // not found
    }
    res.json(category)
  } catch (e) {
    next(e)
  }
})

// PATCH, Set Headers: Content-Type: application/json,
//  Enter Body (raw JSON)
router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id) // Extract ID from URL params
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid event ID' })
    }
    const existingCategory = await db.getCategoriesById(id) // Check if category exists
    if (!existingCategory) {
      return res.sendStatus(404) // category not found
    }
    const { category, link, image } = req.body
    const updatedCategory = {
      category,
      link,
      image,
    }
    await db.updateCategory(id, updatedCategory) // Update the Category in DB
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const deletedRows = await db.deleteCategory(id) //should be 1 if successful, 0 if no todo with that ID exists
    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Event not found' })
    }
    res.sendStatus(204) // No content (successful deletion)
  } catch (e) {
    next(e)
  }
})
export default router
