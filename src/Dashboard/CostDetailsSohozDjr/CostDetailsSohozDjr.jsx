import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import 'react-toastify/dist/ReactToastify.css';
import { InputAdornment } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Swal from 'sweetalert2';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function CostDetailsSohozDjr() {
  const { register, handleSubmit, reset, } = useForm()
  // const Navigate = useNavigate();

  // collect data using react hook form 
  const onSubmit = async (data) => {
    Swal.fire({
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit!',
      cancelButtonText: 'No, cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Get the current date
        const currentDate = new Date().toLocaleDateString("en-GB");
  
        // Convert the cost to an integer
        const integerCost = parseInt(data.totalCost, 10);
  
        const saveUser = {
          totalCost: integerCost,
          details: data.details,
          yourCode: data.yourCode,
          date: currentDate,
        };
  
        try {
          const response = await fetch("http://localhost:5000/costDetailsSohozDjr", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(saveUser)
          });
  
          if (response.ok) {
            reset();
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Submit Details successfully.',
              showConfirmButton: false,
              timer: 1500, // Close the notification after 1.5 seconds
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'An error occurred while saving data.',
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An error occurred while saving data.',
          });
        }
      }
    });
  };
  
  


  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Link to="/dashboardHomeSohozDjr">
          <WestIcon sx={{ mt: 6, ml: 1, position: 'absolute' }}></WestIcon>
        </Link>
        <Box
          sx={{
            paddingTop: 8,
            height: "100vh",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'tomato' }}>
            <SentimentVeryDissatisfiedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cost Details
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Total Cost "
                  id="outlined-start-adornment"
                  fullWidth
                  required
                  autoFocus
                  {...register("totalCost", { required: true })}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Taka</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  {...register("details", { required: true })}
                  required
                  fullWidth
                  id="details"
                  label="Cost Details"

                />
                {/* {errors.name?.type === 'required' && <p role="alert">First name is required</p>} */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  {...register("yourCode", { required: true })}
                  fullWidth
                  id="code"
                  label="Your code"

                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}