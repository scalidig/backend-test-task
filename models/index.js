const { Sequelize, DataTypes } = require('sequelize')
const dotenv = require("dotenv")

dotenv.config()

const user = process.env.DB_USER
const host = process.env.HOST
const database = process.env.DATABASE
const password = process.env.PASSWORD
const port = process.env.PORT

const sequelize = new Sequelize(`postgres://${user}:${password}@${host}:${port}/${database}`, {
    dialect: "postgres",
})

sequelize.authenticate().then(() => {
    console.log(`Database connected`)
}).catch((err) => {
    console.log(err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.books = require('./bookModel')(sequelize, DataTypes)

module.exports = db