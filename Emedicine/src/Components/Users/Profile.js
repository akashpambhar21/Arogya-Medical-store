import React from 'react';
import { UserContext } from '../UserContext';
import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {TextField} from "@mui/material";


function Profile(props) {
    const [open, setOpen] = useState(props.isProfileOpen);
    const [inputs, setInputs] = useState({
        firstName: "",
        password: "",
        lastName: "",
        email: "",
    });
    const context = useContext(UserContext);
    const navigate = useNavigate();

    const deleteUser = () => {
        axios.delete(`https://localhost:7131/api/Users/${localStorage.getItem("userId")}`).then(
            (response) => {
                console.log(response.data);
                setTimeout(() =>{
                    alert('deleted successfully');
                },100); 
                navigate('/login',{replace:true});
            },
            (error) => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        if (localStorage.getItem("userId") == null) {
            setTimeout(() => {
                alert('Log in First');
            }, 100);
            navigate('/login');
        }
        else {
            if (context.user == null) {
                axios.get(`https://localhost:7131/api/Users/${localStorage.getItem("userId")}`).then(
                    (response) => {
                        console.log(response);
                        context.setUser(response.data);
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            }
            else {
                console.log(context.user);
                context.user.password = "";
                setInputs(context.user);
            }
        }
    }, [context.user, props.isProfileOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputs.email.includes("@") || !inputs.email.includes(".")) {
            alert('Invalid Email Address');
        }
        if (inputs.password.length < 8) {
            alert('Password length must be greater or equal to 8.')
        }
        else {
            postData(inputs);
        }
    };

    const postData = (data) => {

        axios.put(`https://localhost:7131/api/Users/${localStorage.getItem("userId")}`, data).then(
            (response) => {
                console.log(response.data);
                axios.get(`https://localhost:7131/api/Users/${localStorage.getItem("userId")}`).then(
                    (response) => {
                        console.log(response);
                        context.setUser(response.data);
                        handleClose();
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            },
            (error) => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        setOpen(props.isProfileOpen)
    }, [props.isProfileOpen]);


    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleClose = () => {
        setInputs("");
        setEditable(false);
        props.onClose();
    };
    const [editable, setEditable] = useState(false);
    const onEdit = () => {
        setEditable(true);
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle id="form-dialog-title" sx={{ display: "flex", marginLeft: "auto", color: '#0a2538', marginRight: "55%", width: "40%" }}>{editable ? "Edit Profile" : "View Profile"}</DialogTitle>
                        <TextField
                            name="firstName"
                            varient="outlined"
                            label="First Name"
                            value={inputs.firstName}
                            style={{ marginTop: "25px" }}
                            onChange={handleChange}
                            disabled={!editable}
                            fullWidth
                            required
                        />

                        <TextField
                            name="lastName"
                            varient="outlined"
                            label="Last Name"
                            value={inputs.lastName}
                            style={{ marginTop: "25px" }}
                            onChange={handleChange}
                            disabled={!editable}
                            fullWidth
                            required
                        />
                        {editable && <TextField
                            name="password"
                            varient="outlined"
                            label="Password"
                            value={inputs.password}
                            style={{ marginTop: "25px" }}
                            onChange={handleChange}
                            fullWidth
                            required
                        />}
                        <TextField
                            name="email"
                            varient="outlined"
                            label="Email"
                            value={inputs.email}
                            style={{ marginTop: "25px" }}
                            onChange={handleChange}
                            disabled={!editable}
                            fullWidth
                            required
                        />
                        <Grid
                            container
                            spacing={2}
                            style={{ marginTop: "20px" }}
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                        >

                            <Button
                                type="submit"
                                onClick={editable ? handleSubmit : onEdit}
                                sx={{ "&:hover": { backgroundColor: "#0a2538", color: 'white', }, marginLeft: "5%", marginTop: "2%", width: "40%", backgroundColor: '#0a2538', color: "white" }}
                            >
                                {editable ? "Submit" : "Edit"}
                            </Button>
                            <Button
                                onClick={deleteUser}
                                variant="contained"
                                sx={{ "&:hover": { backgroundColor: "#0a2538", color: 'white', }, marginLeft: "5%", marginTop: "2%", width: "40%", backgroundColor: '#0a2538', color: "white" }}
                            >
                                Delete
                            </Button>

                        </Grid>
                    </form>
                </DialogContent>

            </Dialog>

        </>
    )
}

export default Profile;