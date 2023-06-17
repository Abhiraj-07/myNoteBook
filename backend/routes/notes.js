const express = require("express");
const Notes = require("../models/Notes");
const auth = require("../middleware/authentication");

const router = express.Router();
// to get all notes
router.get("/fetchallnotes", auth, async (req, res) => {
  try {
    let notes = await Notes.find({ user_id: req.id });
    res.send(notes);
  } catch (error) {
    res.send(error);
  }
});
// to get add a  note
router.post("/addnote", auth, async (req, res) => {
  try {
    let note = new Notes({
      user_id: req.id,
      description: req.body.description,
      title: req.body.title,
      tag: req.body.tag,
      priority: req.body.priority,
    });
    await note.save();

    res.send(note);
  } catch (error) {
    res.send(error);
  }
});

// to edit a note
router.put("/editnote/:id", auth, async (req, res) => {
  try {
    let OldNote = {};
    // to get the tata in which we need to implemet the changes
    if (req.body.description) {
      OldNote.description = req.body.description;
    }
    if (req.body.title) {
      OldNote.title = req.body.title;
    }
    if (req.body.tag) {
      OldNote.tag = req.body.tag;
    }
    if (req.body.priority) {
      OldNote.priority = req.body.priority;
    }
    let note = await Notes.findById(req.params.id);
    if(note.user_id==req.id){

      if (note) {
       let changed = await Notes.findByIdAndUpdate(req.params.id,{$set:OldNote},{new:true});
        res.send( changed);
      } else {
        res.send(" note found ");
      }
    }else{
      res.send(" user not matching found ");


    }
    // if(note){
    //   console.log("old note" + note);

    //   console.log("new note" + note);

    //   await note.save();
    //   res.send(note);
    // }else{
    //   res.send(" not found ");
    // }
  } catch (error) {
    res.send(error);
  }
});

// to delete a note 
router.delete("/deletenote/:id", auth, async (req, res) => {
  try {
    let check = await Notes.findById(req.params.id)
    // to check that note exists or not
    if(check){
      // to verify user
      if(check.user_id.toString()==req.id){
       let deletednote =  await Notes.findByIdAndDelete(req.params.id)
       res.send(" note deleted")
      }else{
        res.send(" not valid user ")
      }
    }else{
      res.send(" no note found ");
    }

  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
