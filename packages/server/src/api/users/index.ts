import {
  type AnyObject,
  type User,
  type Res,
  type Req,
  type Create,
} from '@speed-tracker/common'
import serverDB from '@speed-tracker/server-db'
import { type Request, type Response, Router } from 'express'

export const userRouter: Router = Router()
  .get('/api/v1/users', (_, res: Response<Res<User[]>>) => {
    serverDB.user
      .readAll()
      .then((data) => {
        res.status(200).send({ success: true, data })
      })
      .catch((error) => {
        res.status(500).send({ success: false, error })
      })
  })

  .get('/api/v1/users/:id', (req, res: Response<Res<User | null>>) => {
    const { params } = req
    const { id } = params

    serverDB.user
      .read(id)
      .then((data) => {
        res.status(200).send({ success: true, data })
      })
      .catch((error) => {
        res.status(500).send({ success: false, error })
      })
  })

  .post(
    '/api/v1/users',
    (req: Request<AnyObject, Res<User | null>, Req<Create<User>>>, res) => {
      const { body } = req
      const { data } = body

      if (data === undefined) {
        res.status(400).send({ success: false })
        return
      }

      serverDB.user
        .create(data)
        .then((data) => {
          res.status(200).send({ success: true, data })
        })
        .catch((error) => {
          res.status(500).send({ success: false, error })
        })
    }
  )

  .put(
    '/api/v1/users/:id',
    (req: Request<AnyObject, Res<User | null>, Req<User>>, res) => {
      const { body } = req
      const { data } = body

      if (data === undefined) {
        res.status(400).send({ success: false })
        return
      }

      const { id, ...updatedProps } = data

      serverDB.user
        .update(id, updatedProps)
        .then((data) => {
          res.status(200).send({ success: true, data })
        })
        .catch((error) => {
          res.status(500).send({ success: false, error })
        })
    }
  )

  .delete('/api/v1/users/:id', (req, res: Response<Res<User | null>>) => {
    const { params } = req
    const { id } = params

    serverDB.user
      .delete(id)
      .then((data) => {
        res.status(200).send({ success: true, data })
      })
      .catch((error) => {
        res.status(500).send({ success: false, error })
      })
  })
