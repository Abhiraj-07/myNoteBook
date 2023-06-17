import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  let [data, setData] = useState({
    email: "",
    password: "",
    age: "",
    gender: "",
    firstName: "",
    lastName: "",
    checked: true,
  });

  let handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  let CreateUSer = async () => {
    console.log("savimh user");
    let url = `http://localhost:400/api/auth/createuser`;

    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmpassword,
        gender: data.gender,
        age: data.age,
        firstName: data.firstName,
        lastName: data.lastName,
      }),
    });

    let datae = await response.json();
    if (datae.success === true) {
      // save auth token
      localStorage.setItem("AuthToken", datae.AuthToken);
      navigate("/");
    } else {
      alert(datae.message);
    }
    window.location.reload();
  };

  return (
    <>
      <section className="vh-100 " id="signupContainer">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: `25px` }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>
                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={(e) => {
                          e.preventDefault();
                          CreateUSer();
                        }}
                      >
                        <div className="d-flex flex-row align-items-center mb-4 ">
                          <i className="fas fa-user fa-lg me-3 fa-fw "></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              value={data.firstName}
                              onChange={handleChange}
                              type="text"
                              name="firstName"
                              id="form3Example1cfirstname"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1cfirstname"
                            >
                              First Name
                            </label>
                          </div>

                          <div className="form-outline flex-fill mb-0 mx-2">
                            <input
                              type="text"
                              onChange={handleChange}
                              value={data.lastName}
                              id="form3Example1clastname"
                              className="form-control"
                              name="lastName"
                            />
                            <label
                              className="form-label  "
                              htmlFor="form3Example1clastname"
                            >
                              Last Name
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fa-solid fa-calendar-days fa-bounce"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              name="age"
                              type="number"
                              onChange={handleChange}
                              value={data.age}
                              id="form3Example3cAge"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3cAge"
                            >
                              Your Age
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fa-sharp fa-solid fa-venus fa-beat"></i>
                          <div className="form-outline flex-fill mb-0">
                            <select
                              id="form3Example3cGender"
                              onChange={handleChange}
                              name="gender"
                              value={data.gender}
                            >
                              <option value="">-Select Gender-</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              name="email"
                              onChange={handleChange}
                              value={data.email}
                              id="form3Example3c"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              onChange={handleChange}
                              name="password"
                              value={data.password}
                              id="form3Example4c"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              value={data.confirmpassowrd}
                              onChange={handleChange}
                              type="password"
                              name="confirmpassword"
                              id="form3Example4cd"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4cd"
                            >
                              Repeat your password
                            </label>
                          </div>
                        </div>

                        <div className="form-check d-flex  mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            id="form2Example3c"
                            name="termsandconditions"
                            value={data.checked}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2Example3"
                          >
                            I agree all statements in
                            <Link to="/termsandconditions">
                              Terms of service
                            </Link>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="error"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
