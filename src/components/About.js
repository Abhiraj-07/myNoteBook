import React from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const About = () => {
  return (
    <>
      <div className="container">
        <div>
          this is a basic web app which helps to save the important task along
          with its date , priority, category/tag , a little of description for
          differnt users.
        </div>
        <div>
          <br />
          here i have used react js for front end and node js for the backend
          and mongo db for the data base
        </div>
      </div>
    </>
  );
};

export default About;
