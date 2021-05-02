const { Router } = require('express');
const router = Router();
const Todo = require('../models/Todo');


router.post('/add', async (req, res) => {
    try {
        const { text, id } = req.body
        const todo = await new Todo({
            text,
            completed: false,
            id
        })
        await todo.save()
        res.json(todo)
    } catch (error) { console.log(error) }
});

router.delete('/delete', async (_req, res) => {
    try {
        const todo = await Todo.deleteMany({ completed: true })
        res.json(todo)
    } catch (error) { console.log(error) }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id })
        res.json(todo)
    } catch (error) { console.log(error) }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const { text } = req.body
        const todo = await Todo.findOne({ _id: req.params.id })
        todo.text = text
        await todo.save()
        res.json(todo)
    } catch (error) { console.log(error) }
});

router.put('/complete/:id', async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id })
        todo.completed = !todo.completed
        await todo.save()
        res.json(todo)
    } catch (error) { console.log(error) }
});

router.put('/complete', async (_req, res) => {
    try {
        const todos = await Todo.updateMany({ completed: false }, { $set: { completed: true } })
        res.json(todos)
    } catch (error) { console.log(error) }
});

router.put('/uncomplete', async (_req, res) => {
    try {
        const todos = await Todo.updateMany({ completed: true }, { $set: { completed: false } })
        res.json(todos)
    } catch (error) { console.log(error) }
});

module.exports = router