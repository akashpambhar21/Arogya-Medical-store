import React from 'react';
import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {TextField} from "@mui/material";

const EditMedicine = (props) => {

    const [inputs, setInputs] = useState({
        name: "",
        manufacturer: "",
        unitPrice: "",
        quantity: "",
        imageUrl:"",
    });

    const [open, setOpen] = useState(props.isEditOpen);
 

    const handleSubmit = (e) => {
        e.preventDefault();
            postData(inputs);
    };

    const postData = (data) => {
        axios.put(`https://localhost:7131/api/Medicines/${localStorage.getItem("medid")}`, data).then(
            (response) => {
                console.log(response.data);
                props.onUpdate();
                alert('Updated Successfully');
                handleClose();
            },
            (error) => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        setOpen(props.isEditOpen);
    }, [props.isEditOpen]);

    useEffect(() => {
        setInputs(props.inputs);
    }, [props.inputs]);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleClose = () => {
        props.onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle id="form-dialog-title" sx={{ display: "flex", marginLeft: "auto", color: '#0a2538', marginRight: "55%", width: "40%" }}>Edit Medicine</DialogTitle>
                        <TextField
                            name="name"
                            varient="outlined"
                            label="Medicine Name"
                            value={inputs.name}
                            style={{ marginTop: "25px" }}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            name="manufacturer"
                            varient="outlined"
                            label="Manufacturer"
                            value={inputs.manufacturer}
                            style={{ marginTop: "25px" }}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                       <TextField
                            name="unitPrice"
                            varient="outlined"
                            label="Unit Price"
                            value={inputs.unitPrice}
                            type="number"
                            style={{ marginTop: "10px" }}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            name="quantity"
                            varient="outlined"
                            label="Quantity"
                            type="number"
                            value={inputs.quantity}
                            style={{ marginTop: "10px" }}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            name="imageUrl"
                            varient="outlined"
                            label="ImageUrl"
                            type="string"
                            value={inputs.imageUrl}
                            style={{ marginTop: "10px" }}
                            onChange={handleChange}
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
                                onClick={handleSubmit}
                                sx={{ "&:hover": { backgroundColor: "#0a2538", color: 'white', }, marginLeft: "5%", marginTop: "2%", width: "40%", backgroundColor: '#0a2538', color: "white" }}
                            >
                                Update
                            </Button>

                        </Grid>
                    </form>
                </DialogContent>

            </Dialog>

        </>
    )
    
}

export default EditMedicine;