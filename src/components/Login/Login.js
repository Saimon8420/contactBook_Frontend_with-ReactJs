import React, { useEffect, useState } from 'react';
import { TextField, Button, Link, InputAdornment, CircularProgress } from '@mui/material';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { EmailTwoTone, LoginTwoTone, PasswordSharp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginUser, setStatus } from '../../features/contactSlice';
import { toast } from 'react-toastify';
import Loading from '../Home/Loading/Loading';

const Login = () => {
    const data = useSelector(state => (state.contact.setUser));
    const message = useSelector(state => state.contact.statusMessage);
    const loading = useSelector(state => state.contact.isLoading);
    const navigate = useNavigate();

    useEffect(() => {
        if (message !== "User successfully loggedIn" && message !== null && message !== "User registered successfully") {
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
        dispatch(getUser());
    }, []);

    useEffect(() => {
        if (data?.name && data?.email) {
            toast.success("User successfully loggedIn", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate("/", { replace: true });
        }
    }, [data]);

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const handleChange = event => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        });
    };
    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(loginUser(inputs));
        setInputs({
            email: '',
            password: ''
        })
    };
    return (
        <div className='login-container'>
            {loading ?
                <>
                    <CircularProgress />
                    <Loading />
                </>
                : <>
                    <h2> <LoginTwoTone /> Login</h2>
                    <form onSubmit={handleSubmit}>
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
                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                    </form>
                    <p>Haven't any account? Then <Link onClick={() => { navigate("/signup") }}>Signup</Link> </p>
                </>
            }
        </div>
    );
};

export default Login;
