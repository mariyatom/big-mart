import express from 'express'
import * as Path from 'node:path'

import fruitRoutes from './routes/fruits.ts'
import categories from './routes/categories'
import products from './routes/products.ts'
import orders from './routes/orders.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/fruits', fruitRoutes)
server.use('/api/v1/categories', categories)
server.use('/api/v1/products', products)
server.use('/api/v1/orders', orders)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
