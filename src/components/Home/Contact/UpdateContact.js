import { Contacts, EmailSharp, LocationCity, Phone, TextFields } from '@mui/icons-material';
import { Button, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setStatus, updateContact } from '../../../features/contactSlice';
import './Contact.css';
import { toast } from 'react-toastify';
const UpdateContact = () => {
    const curContact = useSelector(state => state.contact?.currentContact);
    const message = useSelector(state => state.contact.statusMessage);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (message === "Update successful!" && message !== null) {
            toast.success("Update successful!", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate("/contact");
        }
        else {
            if (message !== null) {
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
            }
        }
        setTimeout(() => {
            dispatch(setStatus())
        }, [1000])
    }, [message]);

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        address: "",
        phone: ""
    });

    const handleChange = (event) => {
        setInputs({
            ...inputs, [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let { name, email, address, phone } = inputs;
        if (!name && !email && (!address || address === Number) && !phone) {
            toast.error("Input any One field and then submit update", {
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
        else {
            const checkNumber = (str) => {
                return /^\d+$/.test(str);
            }
            if ((checkNumber(address) === true)) {
                toast.error("Provide Valid Address", {
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
            else {
                name = name || curContact[0].name;
                email = email || curContact[0].email;
                address = address || curContact[0].email;
                phone = phone || curContact[0].phone;
                dispatch(updateContact({ name, email, address, phone, _id: inputs._id = curContact[0]._id }));
                setInputs({
                    name: "",
                    email: "",
                    address: "",
                    phone: ""
                })
            }
        }
    }
    return (
        <div className='update-contact'>
            <div className='curr-contact'>
                <h2><Contacts /> Current Contact Info</h2>
                <p>Name:  {curContact[0]?.name}</p>
                <p>Email: {curContact[0]?.email}</p>
                <p>Phone: {curContact[0]?.phone}</p>
                <p>Address: {curContact[0]?.address}</p>
            </div>
            <h2><Contacts /> Set Update Info</h2>
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
                    placeholder='Enter name'
                    // required
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
                    placeholder='Enter email'
                    value={inputs.email}
                    onChange={handleChange}
                    // required
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
                    placeholder='Enter number'
                    value={inputs.phone}
                    onChange={handleChange}
                    // required
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
                    placeholder='Enter address'
                    value={inputs.address}
                    onChange={handleChange}
                    // required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationCity />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button type='submit' variant="contained">Update Contact</Button>
            </form>
        </div>
    );
};

export default UpdateContact;