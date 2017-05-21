const express = require('express')
// const mongoose = require('mongoose')
const routes = require('./app/routes')

const app = express()
require('dotenv').load()

// mongoose.connect(process.env.MONGO_URI)
// mongoose.Promise = global.Promise

app.use('/public', express.static('/public'))

routes(app)

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Error')
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log('server listening on port:', port);
})
