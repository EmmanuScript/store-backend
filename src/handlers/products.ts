import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import { Products, ProductStore } from '../models/products.model'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  const product = await store.getProducts()
  res.json(product)
}

const show = async (_req: Request, res: Response) => {
   const Product = await store.getProductById(parseInt(_req.params.id))
   res.json(Product)
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
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }

        const newProduct = await store.createProduct(products)
        res.json(newProduct)
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

const productByCat = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader!.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try{
        const category: string = String(req.params.category);
        const productByCat = await store.getProdCategory(category);
        return res.json(productByCat);
    } catch(err){
        res.status(400)
        res.json({ err })
    }
    
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', create)
  app.delete('/products', destroy)
  app.get('/products/:category')
}

export default productRoutes