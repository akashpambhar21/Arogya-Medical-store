import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Paper,
    Grid,
    Avatar,
    Typography,
    TextField,
    Button,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import NavBar from "../Navbar/Navbar";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import axios from "axios";

const AddMedicine = () => {
    
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        manufacturer: "",
        unitPrice: "",
        quantity: "",
        imageUrl:"",
    });


    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post("https://localhost:7131/api/Medicines", inputs).then(
            (response) => {
                alert('Added Successfully');
                navigate('/');
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const paperStyle = {
        padding: 20,
        margin: "10vh auto",
        width: 400,
    };

    const smallDev = {
        padding: 20,
        margin: "10vh auto",
        width: 450,
    };

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));


    return (
        <>
            <NavBar />
            <Grid align="center" className="gridMedStyle" style={{ marginTop: "8%" }}>
                <Paper elevation={5} style={!isMatch ? paperStyle : smallDev}>
                    <Grid align="center">
                        <Avatar sx={{ width: 70, height: 70, backgroundColor: "#78c6ff" }}>
                            <MedicalServicesIcon
                                sx={{ fontSize: 50, backgroundColor: "#78c6ff" }}
                            />
                        </Avatar>
                        <Typography variant="h6" style={{ marginTop: "5px" }}>
                            Add Medicine
                        </Typography>
                    </Grid>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="name"
                            varient="outlined"
                            label="Medicine Name"
                            value={inputs.name}
                            style={{ marginTop: "20px", marginRight: "5px" }}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            name="manufacturer"
                            varient="outlined"
                            label="Manufacturer"
                            value={inputs.manufacturer}
                            style={{ marginTop: "10px" }}
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
                        
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 1, "&:hover": { backgroundColor: '#78c6ff', color: 'white', }, backgroundColor: '#78c6ff' }}
                            fullWidth
                        >
                            Submit
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </>
    );
}

export default AddMedicine;