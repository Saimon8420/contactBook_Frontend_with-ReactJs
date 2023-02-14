import { Contacts, EmailSharp, LocationCity, Phone, TextFields } from '@mui/icons-material';
import { Button, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, setStatus } from '../../../features/contactSlice';
import './Contact.css';
import { toast } from 'react-toastify';
const CreateContact = () => {
    const dispatch = useDispatch();
    const message = useSelector(state => state.contact.statusMessage);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        address: "",
        phone: ""
    });

    useEffect(() => {
        if (message !== "A new contact was saved" && message !== null) {
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
        else {
            if (message !== null) {
                toast.success(`${message}`, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setInputs({
                    name: "",
                    email: "",
                    address: "",
                    phone: ""
                })
            }
            setTimeout(() => {
                dispatch(setStatus())
            }, [1000])
        }
    }, [message]);

    const handleChange = (event) => {
        setInputs({
            ...inputs, [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const { name, address } = inputs;
        const checkNumber = (str) => {
            return /^[0-9]+$/.test(str);
        };
        const checkAddress = (str) => {
            return /^(?!^[0-9]*$)(?!.*@).*$/i.test(str);
        }
        if (checkAddress(address) !== true) {
            toast.error("Provide a valid address!", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
        else if (checkNumber(name) === true) {
            toast.error("Name, can't set only number!", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
        else {
            dispatch(addContact(inputs));
        }
    }
    return (
        <div className='create-contact'>
            <h2><Contacts /> Add New Contact</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    name='name'
                    id="filled-name-input"
                    label="Name"
                    type="text"
                    autoComplete="current-name"
                    variant="filled"
                    value={inputs.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    placeholder='Latiful Kabir'
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <TextFields />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    name='email'
                    id="filled-email-input"
                    label="Email"
                    type="text"
                    autoComplete="current-email"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    placeholder='latiful@gmail.com'
                    value={inputs.email}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailSharp />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    name='phone'
                    id="filled-phone-input"
                    label="Phone"
                    type="text"
                    autoComplete="current-number"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    placeholder='+8801957009796'
                    value={inputs.phone}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Phone />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    name='address'
                    id="filled-address-input"
                    label="Address"
                    type="text"
                    autoComplete="current-address"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    placeholder='Dhaka, Bangladesh'
                    value={inputs.address}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationCity />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button type='submit' variant="contained">Add Contact</Button>
            </form>
        </div>
    );
};

export default CreateContact;