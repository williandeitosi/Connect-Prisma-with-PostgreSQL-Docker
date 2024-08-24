import type { FastifyInstance } from 'fastify'
import * as userController from '../controllers/userController'

export default async function (fastify: FastifyInstance) {
  fastify.get('/', userController.getUsers)
  fastify.post('/', userController.newUser)

  fastify.put('/:userId', userController.update)
  fastify.delete('/:userId', userController.delete)
}
