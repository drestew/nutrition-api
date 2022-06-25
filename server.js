const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
require('dotenv').config
const MongoClient = require('mongodb').MongoClient

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'nutrition-facts'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const food = {
    'teryaki chicken': {
        'fat': '4g',
        'carbs': '17g',
        'protein': '32g',
        'calories': '140',
    },

    'cheesburger': {
        'fat': '16g',
        'carbs': '29g',
        'protein': '24g',
        'calories': '370',
    },

    'potato salad': {
        'fat': '8g',
        'carbs': '43g',
        'protein': '4g',
        'calories': '230',
    },

    'unknown': {
        'fat': '0g',
        'carbs': '0g',
        'protein': '0g',
        'calories': '0g',
    },
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/:food', (req, res) => {
    const foodItem = req.params.food
    console.log(food[foodItem])
    res.json(food)
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`server now running on port ${PORT}`)
})