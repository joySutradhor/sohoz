import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
import { Link, useNavigate } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import { useQuery } from '@tanstack/react-query';
// import Loading from '../../Client/Components/Loading/Loading';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';
// import { useHistory } from 'react-router-dom';
// import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
// import { useQuery } from '@tanstack/react-query';
import Loading from '../../Client/Components/Loading/Loading';
import UseLastSixUserIds from '../../Client/Components/Hooks/IsAdminHooks/UselastSixUsersIds';

const defaultTheme = createTheme();

export default function CustomerDataSohozDjr() {
    const { register, handleSubmit, control } = useForm();
    const [manualBrand, setManualBrand] = useState('');
    const [UserPhone, setUserPhone] = useState('');
    // const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    const handleChange = (newPhone) => {
        setUserPhone(newPhone);
    };

    const { userIds, isLoading, isError, refetch } = UseLastSixUserIds();

    const onSubmit = (formData) => {
        console.log(formData, "from this");
        const startDate = formData.startDate;
        const endDate = formData.endDate;
        const formattedStartDate = dayjs(startDate).format('DD-MM-YYYY');
        const formattedEndDate = dayjs(endDate).format('DD-MM-YYYY');
        console.log(formattedStartDate, formattedEndDate);
        const completeOrder = {
            userId: formData.userId,
            name: formData.name,
            phone: formData.phone,
            brandName: formData.brandName,
            monthlyNeed: formData.monthlyNeed,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            address: formData.address,
            addressCode: formData.addressCode
        };
        console.log(completeOrder, "total order");

        Swal.fire({
            text: "Do You want Add a Customer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, submit it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch("http://localhost:5000/customerDataSohozDjr", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(completeOrder)
                })
                    .then((response) => {
                        if (response.status === 409) {
                            // Customer already exists, show an error message
                            return response.json().then((data) => {
                                Swal.fire({
                                    text: data.error,
                                    icon: "error"
                                });
                            });
                        }
                        if (response.ok) {

                            // Successful submission, perform any desired actions
                            Swal.fire({
                                text: "Your Order is Completed",
                                icon: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Yes, Got it!'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    refetch()
                                    navigate("/dashboardHomeSohozDjr")
                                }
                            })

                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            }
        });
    };




    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Link to="/dashboardHomeSohozDjr">
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
                    <Avatar sx={{ m: 1, background: "#D9D9E3" }}>
                        <AddShoppingCartIcon sx={{ color: "#1976D2" }} />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ color: "gray" }}>
                        Add a Customer
                    </Typography>
                    <Typography component="h1" variant="p" sx={{ color: "gray" , mt: 1 }}>
                       Last ID : {userIds}
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2} justifyContent="flex-end">

                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="userId"
                                    label="User ID"
                                    {...register("userId", { required: true })}
                                    fullWidth

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
                                <TextField
                                    autoComplete="given-name"
                                    {...register("name", { required: true, maxLength: 30 })}
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Full Name"

                                />
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
                                    required
                                    fullWidth
                                    id="addressCode"
                                    label="Address Code"
                                    {...register("addressCode", { required: true })}

                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="monthlyNeed"
                                    label="Monthly Need "
                                    {...register("monthlyNeed", { required: true })}

                                />
                            </Grid>

                            <Grid item xs={12} sm={6} sx={{ marginTop: -1 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <Controller
                                            name="startDate" // Provide a name attribute
                                            rules={{ required: 'Start Date is required' }}
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    label="Start Date"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} sm={6} sx={{ marginTop: -1 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <Controller
                                            name="endDate" // Provide a name attribute
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    label="End Date"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                        >
                            Submit Data
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
