import { React, useState, useContext } from "react";
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
  FormControl,
  Checkbox,
  FormControlLabel
} from "@mui/material";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import '../style.css';
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    passwordConfirm: "",
    Type: "user",
    showPassword: false,
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClickShowPassword = () => {
    setInputs({
      ...inputs,
      showPassword: !inputs.showPassword,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://localhost:7131/api/Users", inputs).then(
      (response) => {
        console.log(response);
        navigate('/login',{replace:true});
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
      <Grid align="center" className="gridStyle">
        <Paper elevation={5} style={!isMatch ? paperStyle : smallDev}>
          <Grid align="center">
            <Avatar sx={{ width: 60, height: 60 }}>
              <AccountCircleRoundedIcon
                sx={{ fontSize: 60, backgroundColor: "#78c6ff" }}
              />
            </Avatar>
            <Typography variant="h6" style={{ marginTop: "5px" }}>
              Sign Up
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex" }}>
              <TextField
                name="FirstName"
                varient="outlined"
                label="First name"
                value={inputs.FirstName}
                style={{ marginTop: "20px", marginRight: "5px" }}
                onChange={handleChange}
                required
              />
              <TextField
                name="LastName"
                varient="outlined"
                label="Last name"
                value={inputs.LastName}
                style={{ marginTop: "20px" }}
                onChange={handleChange}
                required
              />
            </div>
            <TextField
              name="Email"
              varient="outlined"
              label="Email"
              value={inputs.Email}
              style={{ marginTop: "10px" }}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              name="Password"
              style={{ marginTop: "10px" }}
              varient="outlined"
              type={inputs.showPassword ? "text" : "password"}
              label="Password"
              value={inputs.Password}
              onChange={handleChange}
              fullWidth
              required
            />
            
            <TextField
              name="passwordConfirm"
              style={{ marginTop: "10px" }}
              varient="outlined"
              type={inputs.showPassword ? "text" : "password"}
              label="Confirm Password"
              value={inputs.passwordConfirm}
              helperText="Password must contain minimum of 8 characters"
              onChange={handleChange}
              fullWidth
              required
            />
            <FormControl
              sx={{ mt: 0.5, marginRight: "170px" }}
            >
              <FormControlLabel control={<Checkbox onChange={handleClickShowPassword} defaultunChecked />} label="Show Password" />
            </FormControl>
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
};

export default Signup;
