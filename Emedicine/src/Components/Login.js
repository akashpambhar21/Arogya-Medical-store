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

} from "@mui/material";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import '../style.css';
import axios from "axios";
import {UserContext} from "./UserContext";

const Login = () => {

  const [inputs, setInputs] = useState({
    Email: "",
    Password: "",
    showPassword: false,
  });
  
  const {user,setUser} = useContext(UserContext);
  const navigate = useNavigate();
  
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`https://localhost:7131/api/Users/${inputs.Email}`,{}).then(
      (response) => {
        console.log(response.data);
        if(response.data.password !== inputs.Password){
          alert('Password not matching');
        }
        else{
          setTimeout(() => {
            alert('Login Successful');
          },100);
          setUser(response.data);
          localStorage.setItem("isLoggedIn",true);
          localStorage.setItem("userId",response.data.id);
          navigate('/');
        }
      },
      (error) => {
        console.log(error);
        alert("User doesn't Exist");
      }
    );
  };

  const paperStyle = {
    padding: 20,
    margin: "18vh auto",
    width: 350,
  };

  const smallDev = {
    padding: 20,
    margin: "18vh auto",
    width: 350,
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
              Log In
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              name="Email"
              varient="outlined"
              label="Email"
              value={inputs.Email}
              style={{ marginTop: "25px" }}
              onChange={handleChange}
              fullWidth
              required
            />

            <FormControl
              sx={{ width: "100%", marginTop: 2 }}
              variant="outlined"
              required
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="Password"
                type={inputs.showPassword ? "text" : "password"}
                value={inputs.Password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {inputs.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                fullWidth
                required
              />
            </FormControl>

            <Grid
              container
              spacing={2}
              style={{ marginTop: "19px" }}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                component={Link}
                to="/signup"
                style={{ width: "50%", textTransform: "capitalize" }}
              >
                Create an account
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ "&:hover": { backgroundColor: '#78c6ff', color: 'white', }, marginTop: 1, width: "40%", backgroundColor: '#78c6ff' }}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;