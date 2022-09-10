const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { OAuth2Client } = require('google-auth-library')
const hitters = require('./services/hitters')
const pitchers = require('./services/pitchers')

dotenv.config()
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

const users = []

function upsert(array, item) {
    const i = array.findIndex((_item) => _item.email === item.email)
    i > -1 ? array[i] = item : array.push(item)
}

app.post('/api/google-login', async (req, res) => {
    const { token } = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload()
    upsert(users, { name, email, picture })
    res.status(201)
    res.json({ name, email, picture })
})

const usersRouter = require('./routes/users')

app.use('/users', usersRouter)

app.get('/hitterStats', hitters.getHitterStats)
app.get('/pitcherStats', pitchers.getPitcherStats)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})