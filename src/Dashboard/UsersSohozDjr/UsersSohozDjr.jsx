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
} from '@mui/material';
import { Avatar, Box, FormControl, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MuiTelInput } from 'mui-tel-input';
import { ToastContainer } from 'react-toastify';

const defaultTheme = createTheme();

export default function UsersSohozDjr() {
    const { register, handleSubmit } = useForm();

    const [brand, setBrand] = useState(''); // State to capture the selected brand name
    const [phone, setPhone] = useState('');
    const handleChange = (newPhone) => {
        setPhone(newPhone);
    };

    const [profit, setProfit] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleDealerPriceChange = (event) => {
        const dealerPrice = parseFloat(event.target.value);
        const sellerPrice = parseFloat(document.getElementById('sellerPrice').value);

        if (!isNaN(dealerPrice) && !isNaN(sellerPrice)) {
            if (sellerPrice < dealerPrice) {
                setShowAlert(true);
            } else {
                setShowAlert(false);
                const calculatedProfit = dealerPrice - sellerPrice;
                setProfit(calculatedProfit.toFixed(2));
            }
        }
    };

    const handleSellerPriceChange = (event) => {
        const sellerPrice = parseFloat(event.target.value);
        const dealerPrice = parseFloat(document.getElementById('dillerPrice').value);

        if (!isNaN(dealerPrice) && !isNaN(sellerPrice)) {
            if (sellerPrice < dealerPrice) {
                setShowAlert(true);
            } else {
                setShowAlert(false);
                const calculatedProfit = sellerPrice - dealerPrice;
                setProfit(calculatedProfit.toFixed(2));
            }
        }
    };

    const onSubmit = (data) => {
        const dealerPrice = parseFloat(data.dillerPrice);
        const sellerPrice = parseFloat(data.sellerPrice);

        if (!isNaN(dealerPrice) && !isNaN(sellerPrice)) {
            if (sellerPrice < dealerPrice) {
                setShowAlert(true);
            } else {
                setShowAlert(false);
                const calculatedProfit = sellerPrice - dealerPrice;
                setProfit(calculatedProfit.toFixed(2));
                data.profit = calculatedProfit.toFixed(2);
                data.brandName = brand; // Include the selected brand name

                const saveUser = { userId: data.userId, brandName: data.brandName, name: data.name, phone: data.phone, address: data.address, dillerPrice: data.dillerPrice, sellerPrice: data.sellerPrice, profit: data.profit, role: "pending" }
                console.log(saveUser)
                fetch("http://localhost:5000/temporaryNewCustomer", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(saveUser)
                })
                console.log(data);
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer />
            <Container component="main" maxWidth="xs">
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        New Customer
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="userId"
                                    label="User ID"
                                    {...register("userId", { required: true })}
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Brand Name</InputLabel>
                                    <Select
                                        {...register("brandName", { required: true })}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={brand}
                                        label="Brand Name"
                                        onChange={(event) => setBrand(event.target.value)} // Set the selected brand name
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
                                    value={phone}
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
                                    id="dillerPrice"
                                    label="Dealer Price"
                                    {...register("dillerPrice", { required: true })}
                                    onChange={handleDealerPriceChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="sellerPrice"
                                    label="Seller Price"
                                    {...register("sellerPrice", { required: true })}
                                    onChange={handleSellerPriceChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="profit"
                                    label="Profit"
                                    value={profit}
                                    {...register("profit")}
                                    style={{ display: 'none' }}
                                />
                            </Grid>
                            {showAlert && (
                                <Grid item xs={12}>
                                    <Alert severity="error">Dealer Price cannot be more than seller price!</Alert>
                                </Grid>
                            )}
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
