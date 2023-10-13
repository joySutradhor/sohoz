import { useRef, useState, } from 'react';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import {
    Button,
    Container,
    CssBaseline,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    FormControl,
    Alert,
    Box,
    Avatar,
    
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MuiTelInput } from 'mui-tel-input';
import { ToastContainer } from 'react-toastify';
// import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import Swal from 'sweetalert2'
const defaultTheme = createTheme();

export default function UsersSohozDjr() {
    const { register, handleSubmit, setValue } = useForm();
    // const [serverMessage, setServerMessage] = useState(""); // Server message state
    // const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const orderIdRef = useRef(); // Create a ref for the orderId input field

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

    const [generatedOrderId, setGeneratedOrderId] = useState(''); // State for the generated Order ID
    const [isCopied, setIsCopied] = useState(false); // State to track if the Order ID is copied

    const generateRandomOrderId = () => {
        checkAndGenerateOrderId().then(() => {
            setIsCopied(false);
            // setServerMessage(""); // Clear any existing error message

            // Update the orderId input field using setValue
            if (orderIdRef.current) {
                setValue('orderId', generatedOrderId);
            }
        });
    };


    const checkAndGenerateOrderId = async () => {
        const getRandomOrderId = async () => {
            const randomOrderId = Math.floor(Math.random() * (10 - 5 + 1) + 10);
            const response = await fetch(`http://localhost:5000/temporaryNewCustomer/${randomOrderId}`);
            const responseData = await response.json();
            console.log(responseData.exists);

            if (!responseData.exists) {
                return randomOrderId.toString();
            } else {
                // If the order ID already exists, try again recursively
                return getRandomOrderId();
            }
        };

        const generatedOrderId = await getRandomOrderId();
        setGeneratedOrderId(generatedOrderId);
    };


    const onSubmit = async (data) => {
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
                data.brandName = brand;

                const saveUser = {
                    userId: data.userId,
                    orderId: data.orderId,
                    brandName: data.brandName,
                    name: data.name,
                    phone: data.phone,
                    address: data.address,
                    dillerPrice: data.dillerPrice,
                    sellerPrice: data.sellerPrice,
                    profit: data.profit,
                    role: "pending",
                };
                console.log(saveUser)
                const response = await fetch("http://localhost:5000/temporaryNewCustomer", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(saveUser),
                });

                const responseData = await response.json();

                if (responseData.message === "already have user") {
                    
                    // set message for already have order id 
                    Swal.fire({
                        text: `Already have user 
                                Generate new Id !`,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, Got it!'
                      }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                        else  {
                            window.location.reload()
                        }
                      })
                } else {
                    // setServerMessage("");
                    // setShowSuccessAlert(true); // Display the success alert
                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 1000);
                    Swal.fire({
                        text: `Order Submited`,
                        icon: 'success',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, Got it!'
                      }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                        else  {
                            window.location.reload()
                        }
                      })

                }
            }
        }
    };


    // copy generate order id
    const copyToClipboard = () => {
        // Create a new text area element
        const textField = document.createElement('textarea');
        textField.value = generatedOrderId;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        document.body.removeChild(textField);
        setIsCopied(true); // Reset the "Copied" message when generating a new Order ID
    };

    // handle handleRefreshPage
    // const handleRefreshPage = () => {
    //     window.location.reload();
    // }

    return (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 0,
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
                            <Grid item xs={6} sx={{ mt: 1, mb: 1 }}>
                                <Button variant="contained" onClick={generateRandomOrderId}>Generate</Button>
                            </Grid>
                            <Grid item xs={6} sx={{ mt: 1, mb: 1, }}>

                                {/* <Button variant="contained"> Refresh </Button> */}
                                {/* {serverMessage && (
                                    <Button variant="contained" onClick={handleRefreshPage}>
                                        <AutorenewOutlinedIcon /> Refresh
                                    </Button>
                                )} */}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="orderId"
                                    label="Order ID"
                                    ref={orderIdRef} // Attach the ref to the input field
                                    {...register("orderId", { required: true })}
                                    fullWidth
                                    value={generatedOrderId}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button onClick={copyToClipboard} disabled={isCopied}>
                                                    {isCopied ? <DoneAllOutlinedIcon></DoneAllOutlinedIcon> : <ContentCopyOutlinedIcon></ContentCopyOutlinedIcon>}
                                                </Button>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
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

                            {/* {serverMessage && (
                                <Grid item xs={12}>
                                    <Alert severity="error">{serverMessage}</Alert>
                                </Grid>
                            )} */}
                            {/* {showSuccessAlert && (
                                <Grid item xs={12}>
                                    <Alert severity="success">
                                        <AlertTitle>Success</AlertTitle>
                                        You successfully posted an order.
                                    </Alert>
                                </Grid>
                            )} */}
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
