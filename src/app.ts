import fastify from 'fastify'
import userRoutes from './routes/userRoutes'

const buildApp = () => {
  const app = fastify()

  app.register(userRoutes)
  return app
}

export default buildApp
