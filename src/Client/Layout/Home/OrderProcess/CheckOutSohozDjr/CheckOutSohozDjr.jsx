import { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  Box,
  Avatar,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MuiTelInput } from 'mui-tel-input';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';

const defaultTheme = createTheme();

export default function CheckOutSohozDjr() {
  // toDo : handleSubmit need user after register
  const { register,  } = useForm(); 

  const [manualBrand, setManualBrand] = useState('');
  const [UserPhone, setUserPhone] = useState('');
  // const navigate = useNavigate();

  const handleChange = (newPhone) => {
    setUserPhone(newPhone);
  };

  // const onSubmit = (formData) => {
  //   const createOrderFromApp = {
  //     name: formData.name,
  //     phone: formData.phone,
  //     brandName: formData.brandName,
  //     quantity: formData.quantity,
  //     address: formData.address,
  //     addressCode: formData.addressCode
  //   };
  //   console.log(createOrderFromApp, "total order");

  //   Swal.fire({
  //     text: "Do You want Add a Customer",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, submit it!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       fetch("https://sohozserver.onrender.com/customerDataSohozDjr", {
  //         method: "POST",
  //         headers: {
  //           "content-type": "application/json"
  //         },
  //         body: JSON.stringify(createOrderFromApp)
  //       })
  //         .then((response) => {
  //           if (response.status === 409) {
  //             // Customer already exists, show an error message
  //             return response.json().then((data) => {
  //               Swal.fire({
  //                 text: data.error,
  //                 icon: "error"
  //               });
  //             });
  //           }
  //           if (response.ok) {

  //             // Successful submission, perform any desired actions
  //             Swal.fire({
  //               text: "Your Order is Completed",
  //               icon: 'success',
  //               showCancelButton: false,
  //               confirmButtonColor: '#3085d6',
  //               confirmButtonText: 'Yes, Got it!'
  //             }).then((result) => {
  //               if (result.isConfirmed) {
  //                 // refetch()
  //                 navigate("/dashboardHomeSohozDjr")
  //               }
  //             })

  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Error:", error);
  //         });
  //     }
  //   });
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Link to="/">
          <WestIcon sx={{ mt: 2, ml: 1, position: 'absolute', color: "#1976E5" }}></WestIcon>
        </Link>
        <Box
          sx={{
            paddingTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, background: "#1976D2" }}>
            <AddShoppingCartIcon sx={{ color: "white" }} />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "gray" }}>
            Order Now
          </Typography>
          {/* <Typography component="h1" variant="p" sx={{ color: "gray", mt: 1 , fontSize: "14px" }}>
                        Last ID : {userIds}
                    </Typography> */}


                    {/* toDo : onSubmit={handleSubmit(onSubmit)} this line will after noValidate */}
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item xs={6} sm={6}>
                <TextField
                  autoComplete="given-name"
                  {...register("name", { required: true, maxLength: 30 })}
                  required
                  fullWidth
                  id="firstName"
                  label="Full Name"

                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Brand Name</InputLabel>
                  <Select
                    {...register("brandName", { required: true })}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={manualBrand}
                    // || (data ? data.brandName : '')
                    label="Brand Name"
                    onChange={(event) => {
                      setManualBrand(event.target.value);
                    }}
                  >
                    <MenuItem value="Omera">Omera</MenuItem>
                    <MenuItem value="Petromax">Petromax</MenuItem>
                    <MenuItem value="Beximco">Beximco</MenuItem>
                    <MenuItem value="Basundhara">Basundhara</MenuItem>
                    <MenuItem value="Jmi">Jmi</MenuItem>
                    <MenuItem value="Fresh">Fresh</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MuiTelInput
                  id="outlined-helperText"
                  label="Phone"
                  required
                  {...register("phone", { required: true, maxLength: 20 })}
                  fullWidth
                  defaultCountry="BD"
                  value={UserPhone} // Set the value using the UserPhone state
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="User Address"
                  {...register("address", { required: true })}

                />
              </Grid>

              <Grid item xs={6}>
                <TextField

                  fullWidth
                  id="addressCode"
                  label="Address Code"
                  {...register("addressCode")}

                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="quantity"
                  label="Quantity "
                  {...register("quantity", { required: true })}

                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              ORDER NOW
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
