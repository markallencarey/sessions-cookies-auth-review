require('dotenv').config()
const express = require('express')
const app = express()
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')

app.use(express.json())

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(
  dbInstance => {
    console.log('DB ready')
    app.set('db', dbInstance)
    app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`))
  }
)

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000*60*60*24*7*52
  }
}))

app.post('/auth/signup', authCtrl.signup)
app.post('/auth/signin', authCtrl.signin)
app.post('/auth/signout', authCtrl.signout)