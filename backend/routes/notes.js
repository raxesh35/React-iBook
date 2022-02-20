const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

// Route 1 :: Get all notes for authenticated users using :: GET "/api/notes/fetchallnotes"

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const fetchnotes = await Notes.find({ user: req.user.id });
        res.json(fetchnotes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some errors occured (" + error.message + ")");
    }
})

// Route 2 :: Add notes using :: POST "/api/notes/addnotes"

router.post('/addnotes',fetchuser, [
    body('name', 'Please enter a valid name').exists(),
    body('description', 'Description must have minimum 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const{name,description,tag} = req.body;
        const notes = await Notes.create({
            name,
            description,
            tag,
            user: req.user.id,
        })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some errors occured (" + error.message + ")");
    }
});

// Route 3 :: Update note by note Id using :: PUT "/api/notes/updatenote"

router.put('/updatenote/:id',fetchuser, async (req, res) => {
    try {
        const{name,description,tag} = req.body;
        const newnote = {};
        if (name) {newnote.name=name};
        if (description) {newnote.description=description};
        if (tag) {newnote.tag=tag};
        let getNote = await Notes.findById(req.params.id);
        if (!getNote) {
            return res.status(404).json({error: 'Note not found'});
        }
        if (getNote.user.toString() != req.user.id) {
            return res.status(404).json({error: 'Unauthorized access'});
        }
        getNote = await Notes.findByIdAndUpdate(req.params.id, {$set: newnote}, {new:true})
        res.json(getNote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some errors occured (" + error.message + ")");
    }
});

// Route 4 :: Delete note by note Id using :: DELETE "/api/notes/deletenote"

router.delete('/deletenote/:id',fetchuser, async (req, res) => {
    try {
        let getNote = await Notes.findById(req.params.id);
        if (!getNote) {
            return res.status(404).json({error: 'Note not found'});
        }
        if (getNote.user.toString() != req.user.id) {
            return res.status(404).json({error: 'Unauthorized access'});
        }
        getNote = await Notes.findByIdAndDelete(req.params.id)
        res.json({'success': 'Note deleted successfully', getNote: getNote})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some errors occured (" + error.message + ")");
    }
});

module.exports = router;