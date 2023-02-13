import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// extra reducers for User(getUser,Login,Register)
export const getUser = createAsyncThunk("contactBook/getUser", async () => {
    let userData = [];
    await fetch("https://mushy-puce-octopus.cyclic.app/auth", {
        method: "get",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`
        },
    })
        .then(res => res.json())
        .then(data => {
            userData = data;
        });
    return userData;
})

export const loginUser = createAsyncThunk("contactBook/loginUser", async (action) => {
    let userData = [];
    await fetch("https://mushy-puce-octopus.cyclic.app/login", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(action)
    })
        .then(res => res.json())
        .then(data => {
            userData = data;
            localStorage.setItem("user-token", data.token)
        });
    return userData;
})

export const signUp = createAsyncThunk("contactBook/signUp", async (action) => {
    let userData = [];
    if (action) {
        await fetch("https://mushy-puce-octopus.cyclic.app/register", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(action)
        })
            .then(res => res.json())
            .then(data => {
                userData = data;
            });
        return userData;
    }
});

// extra reducers for Contact(getContact,addContact,updateContact,deleteContact)
export const getContact = createAsyncThunk("contactBook/getContact", async () => {
    let contactData = [];
    await fetch("https://mushy-puce-octopus.cyclic.app/allcontacts", {
        method: "get",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`
        },
    })
        .then(res => res.json())
        .then(data => {
            contactData = data.contacts;
        });
    return contactData;
})

export const addContact = createAsyncThunk("contactBook/addContact", async (action) => {
    const { name, email, phone, address } = action;
    let status = [];
    if (action) {
        await fetch(`https://mushy-puce-octopus.cyclic.app/contact`, {
            method: "post",
            headers: {
                "Authorization": `bearer ${localStorage.getItem("user-token")}`,
                "content-type": "application/json"
            },
            body: JSON.stringify({ name, email, phone, address })
        })
            .then(res => res.json())
            .then(data => {
                status = data;
            });
        return status;
    }
});

export const deleteContact = createAsyncThunk("contactBook/deleteContact", async (action) => {
    let status = [];
    if (action) {
        await fetch(`https://mushy-puce-octopus.cyclic.app/contact/${action}`, {
            method: "delete",
            headers: {
                "content-type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                status = data;
            });
        return status;
    }
});

export const updateContact = createAsyncThunk("contactBook/updateContact", async (action) => {
    const { name, email, phone, address, _id } = action;
    let status = [];
    if (action) {
        await fetch(`https://mushy-puce-octopus.cyclic.app/contact/${_id}`, {
            method: "put",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ name, email, phone, address })
        })
            .then(res => res.json())
            .then(data => {
                status = data;
            });
        return status;
    }
});

export const contactSlice = createSlice({
    name: "contactBook",
    initialState: {
        isLoading: false,
        setUser: [],
        setContact: [],
        currentContact: [],
        registerUser: [],
        error: null,
        statusMessage: null,
    },
    reducers: {
        logOut: (state) => {
            state.setUser = [];
            state.setContact = [];
            state.currentContact = [];
            state.registerUser = [];
        },
        getCurrent: (state, action) => {
            if (action.payload) {
                state.currentContact = [action.payload];
            }
        },
        setStatus: (state) => {
            state.statusMessage = null;
        }
    },
    extraReducers: builder => {
        // getUser
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.setUser = action.payload;
            state.error = null;
        });
        builder.addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.setUser = [];
            state.error = action.error.message;
        })

        // loginUser
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.setUser = action.payload.user;
            if (action.payload?.error) {
                state.statusMessage = action.payload.error;
            }
            else {
                state.statusMessage = action.payload.message;
            }
            state.error = null;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.setUser = [];
            state.error = action.error.message;
        })

        // signUp/registerUser
        builder.addCase(signUp.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.isLoading = false;
            state.registerUser = action.payload.data;
            if (action.payload?.error) {
                state.statusMessage = action.payload.error;
            }
            else {
                state.statusMessage = action.payload.message;
            }
            state.error = null;
        });
        builder.addCase(signUp.rejected, (state, action) => {
            state.isLoading = false;
            state.registerUser = [];
            state.error = action.error.message;
        })

        // getContact
        builder.addCase(getContact.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getContact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.setContact = action.payload;
            state.error = null;
        });
        builder.addCase(getContact.rejected, (state, action) => {
            state.isLoading = false;
            state.setContact = [];
            state.error = action.error.message;
        })

        //addContact
        builder.addCase(addContact.fulfilled, (state, action) => {
            if (action.payload?.error) {
                state.statusMessage = action.payload.error;
            }
            else {
                state.statusMessage = action.payload?.message;
            }
        })

        //updateContact
        builder.addCase(updateContact.fulfilled, (state, action) => {
            if (action.payload?.error) {
                state.statusMessage = action.payload.error;
            }
            else {
                state.statusMessage = action.payload?.message;
            }
        })

        //deleteContact
        builder.addCase(deleteContact.fulfilled, (state, action) => {
            if (action.payload?.message) {
                state.statusMessage = action.payload.message;
            }
        })
    }
})
export const { logOut, getCurrent, setStatus } = contactSlice.actions;
export default contactSlice.reducer;