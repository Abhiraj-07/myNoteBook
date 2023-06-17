import React, { useState } from "react";
import NoteContext from "./NoteContext";
import { json } from "react-router-dom";

let URLnotes = `http://localhost:400/api`;

const NoteState = (props) => {
  let NotesInitial = [];
  let [notes, setNote] = useState(NotesInitial);

  // to get all notes
  let fetchNotes = async () => {
    const response = await fetch(`${URLnotes}/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        AuthToken:localStorage.getItem('AuthToken'),
      },
    });

    let json = await response.json();

    console.log(json);
    setNote(await json.sort((a,b)=>{
      return a.priority-b.priority
    }));
  };
  // to add a note
  let addnote = async (title, description, tag, priority) => {
    let newNote = [
      {
        _id: "646f8a50c4acbbec43821f5h",
        user_id: "646354b376da597a3bb9e159",
        tag: tag,
        title: title,
        description: description,
        priority: priority,
        date: "2023-05-25T16:18:00.857Z",
      },
    ];
    
    setNote(notes.concat(newNote))


    
    console.log(notes);
    // to add data to the db
    const response = await fetch(`${URLnotes}/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        AuthToken:localStorage.getItem('AuthToken'),
      },

      body: JSON.stringify({title, description, tag, priority}), // body data type must match "Content-Type" header
    });
    console.log(response.json());
  };
  // to delete a note
  let deletenote = async (id) => {
    console.log("delete clicked");
    let newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNote(newNotes);

    // deleting from data base
    const response = await fetch(`${URLnotes}/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        AuthToken:localStorage.getItem('AuthToken'),
      },
    });
    console.log(response);
  };
  // to edite a note
  let updatenote = async (tag, priority, description, title, id) => {
    let newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      if (id === newNote[index]._id) {
        console.log(" old note" + newNote[index]);
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].priority = priority;
        newNote[index].tag = tag;
      }
     
      setNote(newNote);
      // to fetch data from the db
      const response = await fetch(`${URLnotes}/notes/editnote/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          AuthToken:
            "eyJhbGciOiJIUzI1NiJ9.NjQ2MzU0YjM3NmRhNTk3YTNiYjllMTU5.sAf2jGqm1fm8uqQZ2NccM4-zLZ5ZmM_0xxpqRCXQ_Bw",
        },
        body: JSON.stringify({ title, description, priority, tag }), // body data type must match "Content-Type" header
      });
      // console.log(response.json());
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNote, fetchNotes, updatenote, deletenote, addnote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
