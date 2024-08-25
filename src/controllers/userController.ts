import type { FastifyReply, FastifyRequest } from 'fastify'
import { userIdSchema, userSchema } from '../schemas/userSchemas'
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
    const result = userSchema.safeParse(request.body)

    if (!result.success)
      return reply
        .status(400)
        .send({ error: 'Invalid input', details: result.error.errors })

    const { email, name } = result.data

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
  const userResult = userSchema.safeParse(request.body)
  if (!userResult.success) {
    return reply
      .status(400)
      .send({ error: 'Invalid input', details: userResult.error.errors })
  }
  const { email, name } = userResult.data

  const idResult = userIdSchema.safeParse(request.params)

  if (!idResult.success) {
    return reply
      .status(400)
      .send({ error: 'Invalid ID format', details: idResult.error.errors })
  }

  const id = Number(idResult.data?.userId)

  if (isNaN(id)) {
    return reply.status(400).send({ error: 'Invalid ID format' })
  }

  try {
    const editUser = await userService.updateUser(id, email, name)
    if (!editUser) {
      return reply.status(404).send({ error: 'User not found' })
    }
    return reply.status(200).send(editUser)
  } catch (err) {
    console.error('Error updating user:', err)
    return reply.status(500).send({ error: 'Internal Server Error' })
  }
}

export const deleteUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { userId } = request.params as { userId: string }

  const id = Number(userId)

  if (isNaN(id)) return reply.status(400).send({ error: 'Invalid ID format' })

  try {
    await userService.deleteUser(id)
    reply.status(200).send({ message: 'Accepted' })
  } catch (err) {
    reply.status(500).send({ error: 'No Content' })
  }
}
