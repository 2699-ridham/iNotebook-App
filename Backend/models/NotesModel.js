const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    //this is way to catch the particular things from the another model
    //here we are getting user id so that we can save and get notes from that particular users account
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('notes', NotesSchema);