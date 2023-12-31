import { useRef, useState } from 'react';
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
import { Link, useNavigate, useParams } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ReplayIcon from '@mui/icons-material/Replay';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Client/Components/Loading/Loading';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers';
// import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

const defaultTheme = createTheme();

export default function CompletedRiderOrderSohozDjr() {
    const { register, handleSubmit, control } = useForm();
    const orderIdRef = useRef();
    const [manualBrand, setManualBrand] = useState('');
    const [UserPhone, setUserPhone] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [payment , setPayment ] = useState("cash")
    const navigate = useNavigate();

    const handleChange = (newPhone) => {
        setUserPhone(newPhone);
    };

    const { orderId } = useParams();

    // todo neeed to get single data form server 

    const { data, isLoading, isError, refetch } = useQuery(["temporaryNewCustomer"], async () => {
        const res = await fetch(`https://sohozserver.onrender.com/temporaryNewCustomer`);
        const rawData = await res.json();

        const filteredData = rawData.find(item => item.orderId === orderId);
        if (filteredData) {
            setUserPhone(filteredData.phone);
        }

        return filteredData;
    });
    console.log(data);

    const onSubmit = (formData) => {
        // console.log(formData, "from this");
        const startDate = formData.startDate;
        const endDate = formData.endDate;
        const formattedStartDate = dayjs(startDate).format('DD-MM-YYYY');
        const formattedEndDate = dayjs(endDate).format('DD-MM-YYYY');
        console.log(formattedStartDate, formattedEndDate)
        const completeOrder = {
            userId: formData.userId,
            orderId: formData.orderId,
            name: formData.name,
            phone: formData.phone,
            brandName: formData.brandName,
            quantity: formData.quantity,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            dillerPrice: formData.dillerPrice,
            sellerPrice: formData.sellerPrice,
            profit: formData.profit,
            dilerPoint: formData.dilerPoint,
            doneBy: formData.doneBy,
            address: formData.address,
            addressCode: formData.addressCode,
            payment : formData.payment
        }
        console.log(completeOrder, "total order")


        Swal.fire({
            text: "Do You want submit Order",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, submit it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch("https://sohozserver.onrender.com/completerOrderData", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(completeOrder),
                });
                fetch(`https://sohozserver.onrender.com/temporaryNewCustomer/completed/${data._id}`, {
                    method: 'PATCH',
                })
                    .then((res) => res.json())
                    .then((userData) => {
                        refetch();
                        if (userData.modifiedCount) {
                            Swal.fire({
                                title: 'Success',
                                text: 'Order successfully Done',
                                icon: 'success',
                            }).then(() => {
                                // Navigate to the dynamic route
                                navigate(`/ridersOrderrdersSohozDjr`);
                            });
                        }
                    });

            }
        })


    };

    const handleReplayClick = () => {
        window.location.reload();
    }

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
                        Complete The Order
                    </Typography>
                    <Typography variant="p" sx={{ mt: 0, textAlign: 'left', color: "gray", padding: 1 }}>
                        Order ID: {orderId}
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2} justifyContent="flex-end">
                            <Button onClick={handleReplayClick} sx={{ marginRight: 2 }}>
                                <ReplayIcon />
                            </Button>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="User Address"
                                    {...register("address", { required: true })}
                                    defaultValue={data ? data.address : ""}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="addressCode"
                                    label="Address Code"
                                    {...register("addressCode", { required: true })}
                                    defaultValue={data ? data.addressCode : ""}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="quantity"
                                    label="Quantity"
                                    {...register("quantity", { required: true })}
                                    defaultValue={data ? data.quantity : ""}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} sx={{ marginTop: -1 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <Controller
                                            name="startDate"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    label="Start Date"
                                                    value={startDate} // Use the controlled value here
                                                    onChange={(date) => {
                                                        setStartDate(date); // Update the controlled value when the date changes
                                                        field.onChange(date); // Update the field controller
                                                    }}
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
                                            name="endDate"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    label="End Date"
                                                    value={endDate} // Use the controlled value here
                                                    onChange={(date) => {
                                                        setEndDate(date); // Update the controlled value when the date changes
                                                        field.onChange(date); // Update the field controller
                                                    }}
                                                />
                                            )}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="dilerPoint"
                                    label="Diler Point ID"
                                    {...register("dilerPoint", { required: true })}
                                    fullWidth
                                    placeholder='Diler Point ID '
                                />
                            </Grid>
                            {/* todo some feild need to hide  */}

                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="doneBy"
                                    label="Done By"
                                    {...register("doneBy", { required: true })}
                                    fullWidth
                                    placeholder='Your Code '
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Payment</InputLabel>
                                    <Select
                                        required
                                        {...register("payment", { required: true })}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={payment}
                                        label="Payment"
                                        onChange={(event) => {
                                            setPayment(event.target.value);
                                        }}
                                    >
                                        <MenuItem value="cash">Cash</MenuItem>
                                        <MenuItem value="bkash">Bkash</MenuItem>
                                        <MenuItem value="nagad">Nagad</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="userId"
                                    label="User ID"
                                    {...register("userId", { required: true })}
                                    fullWidth
                                    defaultValue={data ? data.userId : ""}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Brand Name</InputLabel>
                                    <Select
                                        {...register("brandName", { required: true })}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={manualBrand || (data ? data.brandName : '')}
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
                                    defaultValue={data ? data.name : ""}
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
                                    id="orderId"
                                    label="Order ID"
                                    ref={orderIdRef}
                                    {...register("orderId", { required: true })}
                                    fullWidth
                                    defaultValue={data ? data.orderId : ""}
                                    style={{ display: 'none', visibility: 'hidden' }}

                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="dillerPrice"
                                    label="Dealer Price"
                                    {...register("dillerPrice", { required: true })}
                                    defaultValue={data ? data.dillerPrice : ""}
                                    style={{ display: 'none', visibility: 'hidden' }}

                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="sellerPrice"
                                    label="Seller Price"
                                    {...register("sellerPrice", { required: true })}
                                    defaultValue={data ? data.sellerPrice : ""}
                                    style={{ display: 'none', visibility: 'hidden' }}

                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="profit"
                                    label="Profit"
                                    {...register("profit")}
                                    defaultValue={data ? data.profit : ""}
                                    style={{ display: 'none', visibility: 'hidden' }}

                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: -1, mb: 1 }}
                        >
                            Submit Data
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
