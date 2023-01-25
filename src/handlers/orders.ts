import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import { Order, OrderStore } from '../models/order.model'

const store = new OrderStore()

const show = async (_req: Request, res: Response) => {
   const order = await store.getCurrentOrderByUserId(_req.body.id)
   res.json(order)
}

const showById = async (_req: Request, res: Response) => {
    try {
        const authorizationHeader  = _req.headers.authorization
        const token = authorizationHeader!.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try{
        const userId = parseInt(_req.params.userId);
        const currentOrder = await store.getCurrentOrderByUserId(userId);
    return res.json(currentOrder);
    }catch(err){
        res.status(400)
        res.json(err)
    }
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
            quantity: req.body.quantity,
            status: req.body.status,
            products_id: req.body.products_id,
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

const orderRoutes = (app: express.Application) => {
  app.get('/order/:userId', showById)
  app.post('/order', create)
  app.delete('/order', destroy)
}

export default orderRoutes