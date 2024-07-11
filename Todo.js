const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title : {required: true , type: String},
    description: {required: true , type : String},
    date: {type : String}
})

const Todo = mongoose.model('Todo' , todoSchema)

module.exports = Todo