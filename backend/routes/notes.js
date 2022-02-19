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
module.exports = router;