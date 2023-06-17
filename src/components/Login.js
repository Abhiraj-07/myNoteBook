import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Loign = () => {
  const navigate = useNavigate();

  let [loginData, SetloginData] = useState({
    email: "",
    password: "",
  });

  let handleChange = (e) => {
    SetloginData({ ...loginData, [e.target.name]: e.target.value });
    console.log(loginData);
  };

  const loginUser = async () => {
    console.log("login");

    // here is the url of our backend 
    let url = `http://localhost:400/api/auth/login`;

    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    });

    let data = await response.json();
    console.log(data);
    if (data.success === true) {
      // save auth token
      localStorage.setItem("AuthToken", data.AuthToken);
      alert("login successfull ");
      navigate("/");
    } else {
      alert(data.message);
    }
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginUser();
        }}
        className="myform"
      >
        {/* <!-- Email input --> */}
        <div className="form-outline  ">
          <input
            type="email"
            onChange={handleChange}
            value={loginData.email}
            name="email"
            id="form2Example1"
            className="form-control "
          />
          <label className="form-label" htmlFor="form2Example1">
            Email address
          </label>
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            onChange={handleChange}
            name="password"
            value={loginData.password}
            className="form-control"
          />
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
        </div>

        {/* <!-- 2 column grid layout for inline styling --> */}
        <div className="row mb-4">
          <div className="col">
            {/* <!-- Simple link --> */}
            <Link to="/login/forgotpassword">Forgot password?</Link>
          </div>
        </div>

        {/* <!-- Submit button --> */}
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>

        {/* <!-- Register buttons --> */}
        <div className="text-center">
          <p>
            Not a member? <Link to="/signup">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Loign;
