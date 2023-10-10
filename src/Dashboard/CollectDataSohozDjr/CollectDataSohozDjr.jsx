// import * as React from 'react';import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { MuiTelInput } from 'mui-tel-input'
import {  useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import FormControl from '@mui/material/FormControl';
// import Input from '@mui/material/Input';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import IconButton from '@mui/material/IconButton';

import 'react-toastify/dist/ReactToastify.css';
// import Social from '../../Components/Social/Social';
// import { AuthContext } from '../../Providers/Providers';
// import Swal from 'sweetalert2';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function CollectDataSohozDjr() {
  const { register, handleSubmit, reset,  } = useForm();

  // using for phone field 
  const [phone, setPhone] = useState('')
  const handleChange = (newPhone) => {
    setPhone(newPhone)
  }

 

  
  

  // for post method 
  const Navigate = useNavigate() ;


  // collect data using react hook form 
  const onSubmit = (data) => {
    // console.log(data)
    console.log(data.name , data.phone , data.brandName)
    const saveUser = {name: data.name , phone : data.phone , brand : data.brandName , role : "marketting"}
    console.log(saveUser)
    fetch("http://localhost:5000/collectData" , {
        method : "POST" , 
        headers : {
            "content-type" : "application/json"
        }, 
        body : JSON.stringify(saveUser)
    })
    reset()

    alert("ok submited data")
    Navigate("/dashboardHomeSohozDjr")
};


  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Container  component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonOutlineOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Collected Data 
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
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
                <TextField
                  {...register("brandName")}
                  fullWidth
                  id="brand"
                  label="Brand Name"
                
                />
                {/* {errors.name?.type === 'required' && <p role="alert">First name is required</p>} */}
              </Grid>
              <Grid item xs={12} sm={6}>

                <MuiTelInput id="outlined-helperText"
                  label="Phone"
                  {...register("phone", { required: true, maxLength: 20 })}
                  required
                  fullWidth
                  defaultCountry="BD"
                  value={phone}
                  onChange={handleChange} />

              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              Collect Data
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}