// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')

const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Olá Willian')
})

app.listen(port, () => {
  console.log(`Server is runnig on port: ${port}`)
})
