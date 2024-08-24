import type { FastifyReply, FastifyRequest } from 'fastify'
import * as userService from '../services/userService'

export const getUsers = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const data = await userService.getAllUsers()
    return data
  } catch (err) {
    reply.status(500).send({ error: 'internal Server Error' })
  }
}

export const newUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, name } = request.body as { email: string; name: string }

    const emailExists = await userService.findByEmail(email)
    if (!email || !name) {
      reply.status(400).send({ error: 'Email and Name are required' })
    }

    if (emailExists) {
      return reply
        .status(409)
        .send({ error: 'User with this email already exists' })
    }

    const newUser = await userService.createUser(email, name)
    reply.status(201).send(newUser)
  } catch (err) {
    reply.status(500).send({ error: 'Internal Server Error' })
  }
}

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  // TODO: PEGAR POR PARAMETRO

  const { email, name } = request.body as { email: string; name: string }
  const emailExists = await userService.findByEmail(email)

  if (!emailExists) {
    reply.status(404).send({ error: 'Email not found' })
  } else {
    const editUser = await userService.updateUser(email, name)
    reply.status(201).send(editUser)
  }
}
