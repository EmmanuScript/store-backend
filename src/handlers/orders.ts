import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import { Order, OrderStore } from '../models/order.model'

const store = new OrderStore()

const show = async (_req: Request, res: Response) => {
   const order = await store.getCurrentOrderByUserId(_req.body.id)
   res.json(order)
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
        const order: Order = {
            quantity: req.body.qunatity,
            status: req.body.user_id,
            product_id: req.body.product_id,
            user_id: req.body.user_id
        }

        const newOrder = await store.createOrder(order)
        res.json(newOrder)
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
        const deleted = await store.deleteOrder(req.body.id)
        res.json(deleted)
    } catch (error) {
        res.status(400)
        res.json({ error })
    }
}

const productRoutes = (app: express.Application) => {
  app.get('/order/:id', show)
  app.post('/order', create)
  app.delete('/order', destroy)
}

export default productRoutes