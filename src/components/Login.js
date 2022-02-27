import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
    const host = 'http://localhost:5000';
    const [credentials, setCredentials] = useState({email:"", password:""});
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}) 
        });

        const json = await response.json();
        console.log(json)
        if (json.success) {
            // Store token in localstorage and redirect
            localStorage.setItem('token', json.authToken)
            props.showAlert('success', 'Successfully logged in !!')
            navigate("/");
        }
    }
    return (
        <div>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid"
                                alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleSubmit}>

                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start my-4">
                                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                </div>

                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="email">Email address</label>
                                    <input type="email" name="email" value={credentials.email} onChange={onChange} id="email" className="form-control form-control-lg"
                                        placeholder="Enter a valid email address" />
                                    
                                </div>

                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input type="password" name='password' value={credentials.password} onChange={onChange} id="password" className="form-control form-control-lg"
                                        placeholder="Enter password" />                                    
                                </div>

                               {/*  <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                      <a href="#!" className="text-body">Forgot password?</a> 
                                </div> */}

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg"
                                        style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Login</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/signup"
                                        className="link-danger">Register</Link></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                
            </section>
        </div>
    )
}

export default Login
