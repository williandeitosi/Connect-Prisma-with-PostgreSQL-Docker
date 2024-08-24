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
  const { userId } = request.params as { userId: string }
  const { email, name } = request.body as { email: string; name: string }

  const id = Number(userId)

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


export const delete = async (request: FastifyRequest, reply: FastifyReply) => {
  const {userId} = request.params as {userId: string}

  const id = Number(userId)

  if(isNaN(id)){
    return reply.status(400).send({ error: 'Invalid ID format' })
    
  }

  // TODO continuar a logica para o delel de usuarios
}