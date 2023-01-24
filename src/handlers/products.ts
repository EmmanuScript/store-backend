import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import { Products, ProductStore } from '../models/products.model'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  const books = await store.getProducts()
  res.json(books)
}

const show = async (_req: Request, res: Response) => {
   const book = await store.getProductById(_req.body.id)
   res.json(book)
}

const create = async (req: Request, res: Response) => {
    try {
        const authorizationHeader  = req.headers.authorization
        const token = authorizationHeader!.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try {
        const products: Products = {
            id: req.body.title,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }

        const newBook = await store.createProduct(products)
        res.json(newBook)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader!.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try {
        const deleted = await store.deleteProduct(req.body.id)
        res.json(deleted)
    } catch (error) {
        res.status(400)
        res.json({ error })
    }
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', create)
  app.delete('/products', destroy)
}

export default productRoutes