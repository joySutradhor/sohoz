// import * as React from 'react';import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { MuiTelInput } from 'mui-tel-input'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
// import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

import 'react-toastify/dist/ReactToastify.css';
import Social from '../../Components/Social/Social';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function RegisterPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // using for phone field 
  const [phone, setPhone] = useState('')
  const handleChange = (newPhone) => {
    setPhone(newPhone)
  }

  // for password show or off 
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const handleClickShowPasswordTwo = () => setShowPasswordTwo((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPasswordTwo = (event) => {
    event.preventDefault();
  };

  
  // using if condition for show errors 
  if (errors.name?.type === 'required') {
    toast.error('Name is required', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, // Close the notification after 3 seconds (adjust as needed)
    });
  }
  if (errors.email?.type === 'required') {
    toast.error('Email address can not be empty', {
      position: toast.POSITION.RIGHT_CENTER,
      autoClose: 3000, // Close the notification after 3 seconds (adjust as needed)
    });
  }

  if (errors.password?.type === 'required') {
    toast.error('Password can not be empty', {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 3000, // Close the notification after 3 seconds (adjust as needed)
    });
  }
  if (errors.confirmPassword?.type === 'required') {
    toast.error('Please confirm your Password', {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 3000, // Close the notification after 3 seconds (adjust as needed)
    });
  }

  // collect data using react hook form 
  const onSubmit = (data) => {
    console.log(data)
  }

  


  

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  {...register("name", { required: true, maxLength: 30 })}
                  required
                  fullWidth
                  id="firstName"
                  label="Full Name"
                  autoFocus
                />
                {/* {errors.name?.type === 'required' && <p role="alert">First name is required</p>} */}
              </Grid>
              <Grid item xs={12} sm={6}>

                <MuiTelInput id="outlined-helperText"
                  label="Phone"
                  required
                  {...register("phone", { required: true, maxLength: 20 })}
                  fullWidth
                  defaultCountry="BD"
                  value={phone}
                  onChange={handleChange} />

              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", { required: true })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                  // fullWidth
                  autoComplete="new-password"
                  {...register("password", { required: true, minLength: 6 })}
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl  variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-passwordTwo">Confirm Password</InputLabel>
                  <OutlinedInput
                  autoComplete="new-password"
                  {...register("confirmPassword", { required: true, minLength: 6 })}
                  
                    id="outlined-adornment-passwordTwo"
                    type={showPasswordTwo ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordTwo}
                          onMouseDown={handleMouseDownPasswordTwo}
                          edge="end"
                        >
                          {showPasswordTwo ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              Sign Up
            </Button>
            <p className='text-center mb-1 text-gray-400'>or</p>
            <Social></Social>
            <Grid container className='flex justify-center mb-6'>
              <Grid item >
                {/* <Link  variant="body2">
                  Already have an account? Sign in
                </Link> */}
                <Link className='text-[#2976d2] font-roboto underline' to="/login"> Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}