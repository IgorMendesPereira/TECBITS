const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const path = require('path')

const app = express()

const port = 3308

app.use('/files',express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))); //rota para acessar arquivos estaticos que são as fotos
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(port)

console.log("Listen port", port)