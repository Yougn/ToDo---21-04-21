const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    text: { type: String },
    completed: {type: Boolean},
    id: { type: Types.ObjectId }
});

module.exports = model('Todo', schema);