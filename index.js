const express = require('express')
const dotenv = require('dotenv')
const bodyparser = require("body-parser")
const cors = require("cors")
const db = require('./models')
const bookRoutes = require('./routes/bookRoutes')

dotenv.config()

const PORT = 8000

const app = express()

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json({ limit: "50mb" }));

db.sequelize.sync().then(() => {
    console.log("db has been sync")
})

app.use('/api', bookRoutes)

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))