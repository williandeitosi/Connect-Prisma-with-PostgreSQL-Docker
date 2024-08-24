import buildApp from './app'

const app = buildApp()

app
  .listen({ port: 8080, host: '0.0.0.0' })
  .then((address) => console.log(`server listening on ${address}`))
  .catch((err) => {
    console.log('Error starting server:', err)
    process.exit(1)
  })
