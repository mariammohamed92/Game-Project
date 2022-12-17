// import logo from "./../../images/logo.png";
import axios from "axios";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Joi from "joi";


export default function Register() {

  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    password: "",
  });

  let navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);

  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    console.log(myUser);
  };

  async function sendUserDataToApi() {
    let { data } = await axios.post(
      "https://sticky-note-fe.vercel.app/signup",
      user
    );

    if (data.message === "success") {
      setLoading(false);

      navigate("/");
    } else {
      setLoading(false);

      setError(data.message);
    }
  };

  function validateRegisterForm() {
    let scheme = Joi.object({
      first_name: Joi.string().min(3).max(10).required(),
      last_name: Joi.string().min(3).max(10).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,8}$/),
    });
    return scheme.validate(user, { abortEarly: false });
  };

  function submitRegisterForm(e) {
    e.preventDefault();
    setLoading(true);
    let validation = validateRegisterForm();
    if (validation.error) {
      setErrorList(validation.error.details);
    } else {
      sendUserDataToApi();
    }
  };

  return <>
  <div className="container my-5 py-5">
    <div className="row">
      <div className="col-md-6 bg-register-image">

      </div>
      <div className="col-md-6 gray py-5">
        <h2 className="text-gray mb-4 text-center">Create My Account!</h2>

        {error ? (
              <div className="alert text-white bg-danger">ERROR! {error}</div>
            ) : (
              ""
            )}

            <form onSubmit={submitRegisterForm}>
              <div className="row mb-3 form-group">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <input type="text" 
                  onChange={getUserData}
                  className="form-control my-inputs"
                  placeholder="First Name"
                  name="first_name"
                  id="first_name"
                  />
                  <p className="text-danger">
                    {
                      errorList.filter(
                        (error) => error.context.label === "first_name"
                      )[0]?.message
                    }
                  </p>

                </div>
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <input type="text" 
                  onChange={getUserData}
                  className="form-control my-inputs"
                  placeholder="Last Name"
                  name="last_name"
                  id="last_name"
                  />
                  <p className="text-danger">
                    {
                      errorList.filter(
                        (error) => error.context.label === "last_name"
                      )[0]?.message
                    }
                  </p>

                </div>

              </div>

              <div className="form-group mb-3">
              <input
                  onChange={getUserData}
                  type="email"
                  className="form-control my-inputs"
                  placeholder="Email Address"
                  name="email"
                  id="email"
                />
                <p className="text-danger">
                  {
                    errorList.filter(
                      (error) => error.context.label === "email"
                    )[0]?.message
                  }
                </p>
              </div>
              <div className="form-group mb-3">
                <input
                  onChange={getUserData}
                  type="number"
                  className="form-control my-inputs"
                  placeholder="Age"
                  name="age"
                  id="age"
                />
                <p className="text-danger">
                  {
                    errorList.filter(
                      (error) => error.context.label === "age"
                    )[0]?.message
                  }
                </p>
              </div>
              <div className="form-group mb-3">
                <input
                  onChange={getUserData}
                  type="password"
                  className="form-control my-inputs"
                  placeholder="Password"
                  name="password"
                  id="password"
                />
                <p className="text-danger">
                  {errorList.filter(
                    (error) => error.context.label === "password"
                  )[0]
                    ? '"password" should start with uppercase the form 3 and 8 characters lowercase'
                    : ""}
                </p>
              </div>
              <button
                type="submit"
                className="btn btn-submit text-white submitButton w-100 mb-3 py-2 btn-user btn-block">
                {loading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Create Account"
                )}

              </button>
            </form>

            <p className="text-muted small text-center">
              This site is protected by reCAPTCHA and the Google
              <a
                className="text-muted mx-1"
                href="https://policies.google.com/privacy"
              >
                Privacy Policy
              </a>
              and
              <a
                className="text-muted mx-1"
                href="https://policies.google.com/terms"
              >
                Terms of Service
              </a>
              apply.
            </p>
            <hr className="text-light" />
            <p className="small text-center text-muted">
              Already a member?
              <Link
                className="ms-2 text-primary text-decoration-none"
                to="/"
              >
                Log In
                <i className="fas fa-chevron-right small"></i>
              </Link>
            </p>


      </div>
    </div>

  </div>
  
  
  
  
  </>
}

