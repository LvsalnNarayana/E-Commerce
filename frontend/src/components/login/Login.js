import React, { useEffect } from 'react';
import {
    Container
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login_user } from '../../actions/user_action.js';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user_state = useSelector(state => state.user);
    const login_submit_handler = (e) => {
        e.preventDefault();
        dispatch(login_user({ email: e.target.email.value, password: e.target.password.value }));
    }
    useEffect(() => {
        if (user_state.user_message.status === 200) {
            navigate(-1)
        }
    });
    return (
        <section className='py-5'>
            <Container fluid>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" alt="Sample" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={login_submit_handler}>
                            <div className="form-outline mb-5">
                                <label className="form-label" htmlFor="email">Email address</label>
                                <input name='email' type="email" className="form-control mt-1"
                                    placeholder="Enter a valid email address" />
                            </div>

                            <div className="form-outline mb-5">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input name='password' type="password" className="form-control mt-1"
                                    placeholder="Enter password" />
                            </div>

                            <div className="d-flex justify-content-between align-items-center">

                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" value="" />
                                    <label className="form-check-label">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div>

                            <div className="text-center text-lg-start mt-5 pt-2">
                                <input type="submit" className="btn btn-dark" value={"Login"} />
                                <p className="small fw-bold mt-4 pt-1 mb-0">Don't have an account? <a href="#!"
                                    className="link-primary">Register</a></p>
                            </div>

                        </form>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Login