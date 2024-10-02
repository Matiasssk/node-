const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "040-765431"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "040-573457"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "040-8654346775"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const info = `Phonebook ha info for ${persons.length} people`
    response.send(`
        <h1>Phonebook has info for ${persons.length} people
        <h2>${Date()}<h2>
        `)
    
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
   
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id) 

    response.status(204).end()
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
morgan.token('body', req => {
    return JSON.stringify(req.body)
  })


app.post('/api/persons', (request, response) => {
    
    const body = request.body
    const nimi = persons.find(person => person.name === body.name)

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if (nimi) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 3000),
    }

    persons = persons.concat(person)

    response.json(person)
})
/*
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
    */