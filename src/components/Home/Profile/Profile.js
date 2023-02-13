import { Button, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../features/contactSlice';
import Loading from '../Loading/Loading';
import "./Profile.css";

const Profile = () => {
    const user = useSelector(state => (state.contact?.setUser));
    const loading = useSelector(state => state.contact.isLoading);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user?.name || !user?.email) {
            navigate("/login", { replace: true })
        }
    }, [user]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, []);

    return (
        <div className='display-profile'>
            {loading ?
                <>
                    <CircularProgress />
                    <Loading />
                </>
                : <>
                    <h2>Welcome, {user?.name}</h2>
                    <h3>User email:{user?.email}</h3>
                    <Button type='submit' variant="contained" onClick={() => navigate("/addcontact")}>Add Contact</Button>
                    <Button type='submit' variant="contained" onClick={() => navigate("/contact")}>View All</Button>
                </>
            }
        </div>
    );
};

export default Profile;