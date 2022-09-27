const express = require('express')
const cors = require('cors')
const app = express()
const { prorate } = require('./controllers/prorateController')
const router = express.Router()

require('dotenv').config()
const port = process.env.BACKEND_PORT
const frontendURL = `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}`


app.use(cors({
  origin: frontendURL
}))
app.use(express.json())


router.post('/prorate', prorate)

app.use('/', router)

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})