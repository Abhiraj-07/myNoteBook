import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React  from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";

import NoteState from "./context/notes/NoteState";
import Termsandconditions from "./components/Termsandconditions";
function App() {
  return (
    <>
            <React.StrictMode>
      <NoteState>
            <Navbar />
            <div className="container">
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />

              <Route exact path="/about"   element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/login/forgotpassword" element={<ForgotPassword />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route
                exact
                path="/termsandconditions"
                element={<Termsandconditions />}
                />
          </Routes>
        </BrowserRouter>
            </div>
      </NoteState>
                </ React.StrictMode>
    </>
  );
}

export default App;
