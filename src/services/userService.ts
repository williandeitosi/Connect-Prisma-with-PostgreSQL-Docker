import prisma from '../config/database'

export const getAllUsers = async () => {
  return prisma.user.findMany()
}

export const createUser = async (email: string, name: string) => {
  return prisma.user.create({
    data: {
      email,
      name,
    },
  })
}

export const findByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  })
}

export const updateUser = async (id: number, email: string, name: string) => {
  return prisma.user.update({
    where: { id },
    data: { email, name },
  })
}

export const deleteUser = async (id: number) => {
  return prisma.user.delete({
    where: {
      id,
    },
  })
}
