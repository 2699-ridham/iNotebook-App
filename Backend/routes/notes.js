const express = require("express");
const router = express.Router();
const Note = require("../models/NotesModel");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');

//get all notes of the logined user api- >/api/notes/fetchallnotes - login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const allNotes = await Note.find({ user: req.user.id });
        res.json(allNotes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

//add notes of the logined user api- >/api/notes/addnotes - login required
router.post('/addnotes', fetchuser, [
    body('title', 'title must be min. 2 characters').isLength({ min: 2 }),
    body('description', 'description must be min. 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    //destructuring
    const { title, description, tag } = req.body;
    try {
        const notes = new Note({
            title, description, tag, user: req.user.id
        });
        const savenotes = await notes.save();
        res.json(savenotes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

//update notes of logined user api -> api/notes/updatenotes/:id - login required
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    //destructuring
    const { title, description, tag } = req.body;

    try {
        //create a new note object for upadation
        const newnote = {};
        if (title) { newnote.title = title }
        if (description) { newnote.description = description }
        if (tag) { newnote.tag = tag }
        //if couldn't find any note on that particular id
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        //check weather the user in his own account or not
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

//delete notes of logined user api -> api/notes/deletenotes/:id - login required
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {

    try {
        //find the if id is valid or not
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        //check for the user which actually owns the note or not
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Notes has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})
module.exports = router;