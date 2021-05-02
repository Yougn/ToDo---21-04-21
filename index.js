const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000

// Middleware для того, что бы express понимал, что при PUT и POST запросах
// данные будут прииходить в формате json
app.use(express.json({ extended: true }));

app.use('/api/todo', require('./routes/todo.route'));

async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.lokv4.mongodb.net/todo?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        mongoose.set('useFindAndModify', true)
        app.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
};

start();
