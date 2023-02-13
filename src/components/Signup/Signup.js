import React, { useEffect, useState } from 'react';
import { TextField, Button, Link, InputAdornment, CircularProgress } from '@mui/material';
import "./Signup.css";
import { useNavigate } from 'react-router-dom';
import { EmailTwoTone, PasswordSharp, SupervisedUserCircleOutlined, TextFieldsSharp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus, signUp } from '../../features/contactSlice';
import { toast } from 'react-toastify';
import Loading from '../Home/Loading/Loading';
const Signup = () => {
    let user = useSelector(state => (state.contact.registerUser));
    const message = useSelector(state => state.contact.statusMessage);
    const loading = useSelector(state => state.contact.isLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (message !== "User registered successfully" && message !== null) {
            toast.error(`${message}`, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(() => {
                dispatch(setStatus())
            }, [1000])
        }
        setTimeout(() => {
            dispatch(setStatus())
        }, [1000])
    }, [message]);

    useEffect(() => {
        if (user?.name && user?.email) {
            toast.success("User Registered, Now LogIn", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate("/login", { replace: true });
        }
    }, [user]);

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        confirmPass: ''
    });

    const handleChange = event => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        const { name, email, password, confirmPass } = inputs;
        if (password === confirmPass) {
            dispatch(signUp({ name, email, password }));
            setInputs({
                name: '',
                email: '',
                password: '',
                confirmPass: '',
            })
        }
        else {
            toast.error("Password doesn't match", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <div className='signup-container'>
            {
                loading ?
                    <>
                        <CircularProgress />
                        <Loading />
                    </>
                    :
                    <>
                        <h2><SupervisedUserCircleOutlined /> Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name="name"
                                label="Name"
                                value={inputs.name}
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <TextFieldsSharp />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                name="email"
                                label="Email"
                                value={inputs.email}
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailTwoTone />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                name="password"
                                label="Password"
                                type="password"
                                value={inputs.password}
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PasswordSharp />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                name="confirmPass"
                                label="Confirm Password"
                                type="password"
                                value={inputs.confirmPass}
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PasswordSharp />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Signup
                            </Button>
                        </form>
                        <p>Have any account? Then <Link onClick={() => { navigate("/login") }}>Login</Link> </p>
                    </>
            }
        </div>
    );
};

export default Signup;