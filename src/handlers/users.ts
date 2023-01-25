import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

import { User, UserStore } from '../models/users.model'

dotenv.config({

})

interface JwtPayload {
    _id: string
  }
  

const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
    app.delete('/users', destroy)
    app.post('/users/authenticate', authenticate)
    app.patch('/users', update)
}

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (_req: Request, res: Response) => {
    try{
        const user = await store.show(parseInt(_req.params.id))
        res.json(user)
    }catch(err){
        res.json(err)
    }
   
  
}



const create = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password,
    }
    try {
        const newUser = await store.create(user)
        res.status(201).json(newUser)
    } catch(err) {
        res.status(400)
        console.log(err)
        res.json("Error: User not created, " + user)
    }
}

const destroy = async (_req: Request, res: Response) => {
    const deleted = await store.delete(_req.body.id)
    res.json(deleted)
}

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
      username: req.body.username,
      password: req.body.password,
    }
    try {
        const u = await store.authenticate(user.username, user.password)
        var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET);
        res.json(token)
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
  }

  const update = async (req: Request, res: Response) => {
    const user: User = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password: req.body.password,
    }
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader!.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as JwtPayload
        if((parseInt(decoded._id)) !== user.id) {
            throw new Error('User id does not match!')
        }
    } catch(err) {
        res.status(401)
        res.json(err)
        return
    }

    try {
        const updated = await store.create(user)
        res.json(updated)
    } catch(err) {
        res.status(400)
        res.json('Error: Error undapting users' + user)
    }
}

export default userRoutes