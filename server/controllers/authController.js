const bcrypt = require('bcryptjs')

module.exports = {
  signup: async (req, res) => {
    const db = req.app.get('db')

    const { username, password, is_admin } = req.body

    const foundUser = await db.auth.get_user(username)

    if (foundUser[0]) {
      return res.status(400).send('Try another username')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = await db.auth.add_new_user(username, hash, is_admin)
    delete newUser[0].hash

    req.session.user = { ...newUser[0] }
    
    res.status(200).send(req.session.user)
  },

  signin: (req, res) => {

  },

  signout: (req, res) => {

  }
}