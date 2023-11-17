import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize('sqlite::memory:');
const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING
});

await sequelize.sync();

const app = express()
const port = 1488

app.use(cors())
app.use(bodyParser.json())

app.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({
      where: {
        email,
        password
      }
    })

    if (!user) {
      throw new Error('Пользователь не найден')
    }

    res.json(user)
  } catch (e) {
    res.status(404).json(e.message)
  }
})

app.post('/register', async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.json(newUser);
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      res.status(500).json('Пользователь с таким email уже существует')

      return
    }

    res.status(500)
  }
})

app.get('/users', async (req, res) => {
  res.json(await User.findAll());
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})