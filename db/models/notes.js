const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
})

const Note =  mongoose.model('notes', NoteSchema);

module.exports = Note;