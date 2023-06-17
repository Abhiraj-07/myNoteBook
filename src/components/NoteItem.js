import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  let { note, toggleEditModal } = props;
  const context = useContext(NoteContext);
  const { deletenote } = context;

  return (
    <>
    <div id="ItemContainer">

      <fieldset className="px-2"  >
        <legend className="d-flex justify-content-between ">
          <spam className="">{note.priority}</spam>
          <spam className="">{note.tag}</spam>
        </legend>
        <div className=" m-2"id="cardBoxWidth" >
          <div className="card my-2" style={{ width: "18rem" }}>
            <span className=" position-absolute  top-0 end-0 my-1 my-1 mx-1">
              {note.date.slice(0, 10)}
            </span>
            <span className="d-inline text-right">
              <i
                className="fa-solid fa-file-pen mx-2 my-1"
                onClick={() => {
                  toggleEditModal(note);
                }}
              ></i>
              <i
                className="fa-sharp fa-solid fa-trash mx-2 my-1"
                onClick={() => {
                  deletenote(note._id);
                }}
              ></i>
            </span>
            <div className="card-body my-0">
              <h5 className="card-title text-center">{note.title}</h5>
              <p className="card-text ">{note.description}</p>
            </div>
            <span className="position-absolute bottom-0 end-0 my-1">
              {note.comment}
            </span>
          </div>
        </div>
      </fieldset>
      </div>

    </>
  );
};

export default NoteItem;
