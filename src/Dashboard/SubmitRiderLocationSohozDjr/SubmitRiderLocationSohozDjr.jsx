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
import Swal from 'sweetalert2';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

const defaultTheme = createTheme();

export default function SubmitRiderLocationSohozDjr() {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        Swal.fire({
            text: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, submit!',
            cancelButtonText: 'No, cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const saveUser = {
                    yourCode: data.yourCode,
                    location: data.location,
                };

                try {
                    const response = await fetch("http://localhost:5000/riderLocationSohozDjr", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(saveUser),
                    });

                    if (response.ok) {
                        reset();
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Submit Location successfully.',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    } else if (response.status === 409) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Customer already exists. Updating location...',
                        });
                        // Handle updating the location here.
                        const updateResponse = await fetch(`http://localhost:5000/riderLocationSohozDjr/${data.yourCode}`, {
                            method: "PATCH",
                            headers: {
                                "content-type": "application/json",
                            },
                            body: JSON.stringify({ location: data.location }),
                        });
                        if (updateResponse.ok) {
                            reset();
                            Swal.fire({
                                icon: 'success',
                                title: 'Success!',
                                text: 'Location updated successfully.',
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error!',
                                text: 'Failed to update location.',
                            });
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'An error occurred modified data.',
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
                    <Avatar sx={{ m: 1, bgcolor: '#1565C0' }}>
                        <AddLocationAltIcon />
                    </Avatar>
                    <Typography component="p" variant="h6">
                        Submit Location
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    {...register("location", { required: true })}
                                    fullWidth
                                    id="location"
                                    label="Add Location"
                                />
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
                            <Grid item xs={12} sm={6}>
                           
                                <Button> <a href="https://google.com">map</a> </Button>
                                {/* <Button> <a href="https://www.amazon.com/">map</a> </Button> */}
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                        >
                            Update or Submit
                        </Button>
                    </Box>

                </Box>
            </Container>
        </ThemeProvider>
    );
}
