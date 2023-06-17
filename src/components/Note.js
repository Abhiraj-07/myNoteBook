import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";

const Note = () => {
  const navigate = useNavigate();

  let [note, setNotefor] = useState({
    _id: "",
    Etitle: "",
    Edescription: "",
    Epriority: "",
    Etag: "",
  });

  const context = useContext(NoteContext);
  const { notes, setNote, addnote, fetchNotes, updatenote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("AuthToken")) {
      navigate("/home");
      fetchNotes();
    } else {
      alert(" please login first ");
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const toggleEditModal = (pnote) => {
    setNotefor({
      _id: pnote._id,
      Etitle: pnote.title,
      Edescription: pnote.description,
      Epriority: pnote.priority,
      Etag: pnote.tag,
    });
    ref.current.click();
  };
  let updatingNote = () => {
    updatenote(
      note.Etag,
      note.Epriority,
      note.Edescription,
      note.Etitle,
      note._id
    );
    refClose.current.click();
  };

  let handleChange = (e) => {
    setNotefor({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Edit note
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-Etitle" id="exampleModalLabel">
                Editing the note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="Etitle">title</label>
                <input
                  type="text"
                  value={note.Etitle}
                  className="form-control"
                  id="Etitle"
                  onChange={handleChange}
                  placeholder="Etitle"
                  name="Etitle"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Edescription">description</label>
                <input
                  value={note.Edescription}
                  type="text"
                  className="form-control"
                  id="Edescription"
                  onChange={handleChange}
                  name="Edescription"
                  aria-describedby="emailHelp"
                  placeholder="Enter Edescription"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Epriority">priority</label>
                <input
                  type="number"
                  value={note.Epriority}
                  className="form-control"
                  id="Epriority"
                  placeholder="Epriority"
                  name="Epriority"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Etag">tag</label>
                <input
                  onChange={handleChange}
                  type="text"
                  value={note.Etag}
                  className="form-control"
                  id="Etag"
                  placeholder="Etag"
                  name="Etag"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  updatingNote();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1 id="headingNotes">Your notes</h1>

      <div className="d-flex flex-column  flex-wrap  " id="FeatchedNotes ">
        <div id="notesContainer">
          {notes.length === 0 && " create a note first "}
          {notes.map((note) => {
            return (
              <NoteItem
                key={note._id}
                toggleEditModal={toggleEditModal}
                note={note}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Note;
