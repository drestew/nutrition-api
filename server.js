const express = require('express')
const app = express()
const PORT = 8000
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'nutrition-facts'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (req, res) => {
    db.collection('food-items').find().sort({ likes: -1 }).toArray()
        .then(data => {
            res.render('index.ejs', { info: data })
        })
        .catch(error => console.error(error))
})

app.post('/addFood', (req, res) => {
    db.collection('food-items').insertOne({
        name: req.body.name,
        calories: req.body.calories,
        protein: req.body.protein,
        carbs: req.body.carbs,
        fat: req.body.fat,
        likes: 0,
    })
        .then(res.redirect('/'))
})

app.put('/addOneLike', (req, res) => {
    db.collection('food-items').updateOne({ name: req.body.name }, {
        $set: {
            likes: req.body.likes + 1
        }
    })
        .then(results => {
            res.json('Like Added!')
        })
        .catch(error => console.error(error))
})

app.delete('/deleteFood', (req, res) => {
    db.collection('food-items').deleteOne({ name: req.body.name })
        .then(result => {
            res.json('Item Deleted!')
        })
        .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT)