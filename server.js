import express from "express"
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

let app = express()

app.use(express.json())

let db = []

app.get('/', (req, res) => {
    res.sendFile(join(dirname(fileURLToPath(import.meta.url)), '/public/index.html'))
})

app.get('/css', (req, res) => {
    res.sendFile(join(dirname(fileURLToPath(import.meta.url)), '/public/style.css'))
})

app.get('/js', (req, res) => {
    res.sendFile(join(dirname(fileURLToPath(import.meta.url)), '/public/main.js'))
})

app.post('/create-goal', (req, res) => {
    db.push(req.body)
    res.status(200).send(db)
})

app.get('/goals', (req, res) => {
    res.status(200).send(db)
})

app.delete('/delete-goal/:goal', (req, res) => {
    const goalName = req.params.goal

    for (let i = 0; i < db.length; i++) {
        if (goalName === db[i].goal) {
            db.splice(i, 1)
        }
    }
    res.status(200).send(db)
})

app.listen(8090, () => {
    console.log('we started on port 8090!')
})