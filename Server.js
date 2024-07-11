const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const Todo = require('./Todo')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1/todolist')
.then(() => console.log('MongoDB Connected'))
.catch((error) => console.log(error))

app.post('/addtodo', async(req,res) => {
    try{
        const {title, description, date} = req.body
        const newTodo = new Todo ({title, description, date})
        await newTodo.save()
        res.status(201).json({message: 'Todo Saved!'})
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})




app.get('/todolist', async(req,res) => {
    try{
        const todos = await Todo.find()
        res.status(200).json(todos)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})


app.delete('/DeleteTodo/:id', async(req,res) => {
    const {id} = req.params

    try{
        await Todo.findByIdAndDelete(id)
        res.status(201).json({message: 'Todo Deleted'})
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})


app.put('/updateTodo/:id', async(req,res) => {
    try{
        const {title, description} = req.body;
        const date = new Date().toLocaleString();
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, {title, description,date}, {new : true})
        res.status(200).json(updateTodo)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

app.listen(PORT, () => {
    console.log(`App is Listening in ${PORT}`)
})