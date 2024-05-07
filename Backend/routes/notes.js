const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note')

const {body,validationResult} =  require('express-validator')

// ROUTE 1 : Get All the Notes using : GET "api/auth/fetchallnotes" Login Required
router.get('/fetchallnotes',fetchuser,async (req, res) => 
{
    try
    {
        const notes = await Note.find({user : req.user.id});
        res.json(notes)
    }
    catch(error) 
    {
        console.log(error.message)
        res.status(500).send("Internals Server Error Occured")
    }



  
})


// ROUTE 2 : Add a new note using : POST "api/notes/addnote" Login Required
router.post('/addnote',fetchuser,[body('title','Enter a Valid Title').isLength({min : 3}),
body('description','Enter A Valid decription of atleast 6 characters').isLength({min :6}),],
async (req, res) => 
{

try
{
    const {title,description,tag} = req.body;

// If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const note = new Note({title,description,tag,user : req.user.id});
    const savedNote= await note.save()

    res.json(savedNote)
}
   catch(error)
   {
    console.log(error.message)
    res.status(500).send("Internals Server Error Occured")

   }
   
})



// ROUTE 3 : Update an existing Note : POST "api/notes/updatenote" Login Required

// Fpr Update We Usually Do put request
router.put('/updatenote/:id',fetchuser,[body('title','Enter a Valid Title').isLength({min : 3}),
body('description','Enter A Valid decription of atleast 6 characters').isLength({min :6}),],
async (req, res) => 
{
    const {title,description,tag} = req.body;

    // Create new Note object
    const newNote = {};

    if(title)
    {
        newNote.title  = title;
    }
    if(description)
    {
        newNote.description  = description;
    }
    if(tag)
    {
        newNote.tag  = tag;
    }

    
    // find a Note to be updated 
    let  note = await Note.findById(req.params.id);
    if(!note)
    {
        res.status(404).send("Not Found");
    }

    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote},{new : true});
    res.json({note});

})

// ROUTE 4 : Delete an existing Note : DELETE "api/notes/deletenote" Login Required


router.delete('/deletenote/:id',fetchuser,[body('title','Enter a Valid Title').isLength({min : 3}),
body('description','Enter A Valid decription of atleast 6 characters').isLength({min :6}),],
async (req, res) => 
{
    // const {title,description,tag} = req.body;

    try
    {
    // find a Note to be Delete and Deleted it
    let  note = await Note.findById(req.params.id);
    if(!note)
    {
        res.status(404).send("Not Found");
    }

    // Allow Deleteion Only If User Own This Notes
    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not allowed");
    }

    
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Succes" : "Note Has been Deleted"})
}

    catch(error) 
    {
        console.log(error.message)
        res.status(500).send("Internals Server Error Occured")
    }
})

module.exports = router;