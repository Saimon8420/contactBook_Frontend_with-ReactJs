import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteContact, getContact, getCurrent, setStatus } from '../../../features/contactSlice';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./Contact.css";
import { Delete, Edit } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Contact = () => {
    const dispatch = useDispatch();
    const contact = useSelector(state => (state.contact.setContact));
    const message = useSelector(state => state.contact.statusMessage);
    const loading = useSelector(state => state.contact.isLoading);

    useEffect(() => {
        dispatch(getContact());
    }, [message]);

    useEffect(() => {
        if (message === "remove successful!" && message !== null && message !== "Update successful!") {
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
            setTimeout(() => {
                dispatch(setStatus())
            }, [1000])
        }
        else {
            if (message !== null && message !== "Update successful!") {
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
        }
    }, [message]);

    const navigate = useNavigate();
    const handleDelete = (id) => {
        const confirm = window.confirm("Are you want to delete");
        if (confirm) {
            dispatch(deleteContact(id));
        }
    }

    const handleEdit = (contact) => {
        dispatch(getCurrent(contact));
        navigate("/updatecontact", { replace: true });
    }
    return (
        <div className='display-contact'>
            {
                loading ?
                    <>
                        <CircularProgress />
                        <Loading />
                    </>
                    : <>
                        <h2>All Contacts</h2>
                        {!contact.length > 0 ? <div>
                            <Button type='submit' variant="contained" onClick={() => navigate("/addcontact")}>Add Contact</Button></div>
                            :
                            contact?.map(each => <div className='each-user' key={each._id}>
                                <p>Name: {each.name}</p>
                                <p>Phone: {each.phone}</p>
                                <p>Email:{each.email}</p>
                                <p>Address: {each.address}</p>
                                <button onClick={() => handleEdit(each)}><Edit /></button><button onClick={() => handleDelete(each?._id)}><Delete /></button>
                            </div>)
                        }
                        <div className='contact-table'>
                            {!contact.length > 0 ? <div>
                                <Button type='submit' variant="contained" onClick={() => navigate("/addcontact")}>Add Contact</Button>
                            </div>
                                :
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Name</StyledTableCell>
                                                <StyledTableCell align="right">Email</StyledTableCell>
                                                <StyledTableCell align="right">Phone</StyledTableCell>
                                                <StyledTableCell align="right">Address</StyledTableCell>
                                                <StyledTableCell align="right">Action</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {contact?.map((each) => (
                                                <StyledTableRow key={each.name}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {each.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">{each.email}</StyledTableCell>
                                                    <StyledTableCell align="right">{each.phone}</StyledTableCell>
                                                    <StyledTableCell align="right">{each.address}</StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        <button onClick={() => handleEdit(each)}><Edit /></button><button onClick={() => handleDelete(each?._id)}><Delete /></button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            }
                        </div>
                    </>
            }
        </div >
    );
};

export default Contact;