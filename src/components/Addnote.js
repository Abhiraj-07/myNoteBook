import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const Addnote = () => {
  let [neNote, changenote] = useState({
    title: "",
    description: "",
    priority: "",
    tag: "",
  });
  let handleChange = (e) => {
    changenote({ ...neNote, [e.target.name]: e.target.value });
    console.log(neNote);
  };

  const context = useContext(NoteContext);
  const { addnote } = context;
  let SaveData = (e) => {
    let addNoteButtonDocument = document.getElementById("addNoteButton");
    let addnoteDocument = document.getElementById("addnoteContainer");

    addnoteDocument.style.display = "none";
    addNoteButtonDocument.style.display = "inline";

    e.preventDefault();
    addnote(neNote.title, neNote.description, neNote.tag, neNote.priority);
    changenote({
      title: "",
      description: "",
      priority: "",
      tag: "",
    });
  };
  let handleAddnote = () => {
    let addnote = document.getElementById("addnoteContainer");
    let addNoteButton = document.getElementById("addNoteButton");
    if (addnote.style.display == "none") {
      addnote.style.display = "inline";
      addNoteButton.style.display = "none";
    } else {
      addnote.style.display = "none";
      addNoteButton.style.display = "inline";
    }
  };

  return (
    <>
      <button
        className="btn btn-outline-dark"
        id="addNoteButton"
        onClick={handleAddnote}
      >
        add a note{" "}
      </button>

      <div id="addnoteContainer">
        <div id="addnote">
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control  buttonStyle"
                id="title"
                placeholder="Enter the title"
                onChange={handleChange}
                name="title"
                value={neNote.title}
              />
            </div>
            <div className="form-group">
              <input
                value={neNote.tag}
                type="text"
                className="form-control  buttonStyle"
                id="tag"
                placeholder=" Enter the tag"
                onChange={handleChange}
                name="tag"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={neNote.description}
                className="form-control  buttonStyle"
                id="description"
                name="description"
                aria-describedby="emailHelp"
                placeholder="Enter the description"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                value={neNote.priority}
                type="number"
                className="form-control  buttonStyle"
                id="priority"
                placeholder=" Enter the priority"
                name="priority"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={SaveData}
            >
              Add Note
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addnote;
