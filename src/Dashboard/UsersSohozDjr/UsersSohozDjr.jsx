import { useRef, useState } from 'react';
// import { useForm } from 'react-hook-form';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MuiTelInput } from 'mui-tel-input';
import { ToastContainer } from 'react-toastify';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import UseLastSixUserIds from '../../Client/Components/Hooks/IsAdminHooks/UselastSixUsersIds';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const defaultTheme = createTheme();

export default function UsersSohozDjr() {
    // const { register, handleSubmit, setValue } = useForm();
    const orderIdRef = useRef();

    const [brand, setBrand] = useState('');
    // const [manualBrand, setManualBrand] = useState(null);
    const [phone, setPhone] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    // const [searchResults, setSearchResults] = useState({});
    const [userId, setUserId] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [addressCode, setAddressCode] = useState("");
    const [quantity, setQuantity] = useState("");
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

    const [generatedOrderId, setGeneratedOrderId] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const generateRandomOrderId = () => {
        checkAndGenerateOrderId().then(() => {
            setIsCopied(false);


        });
    };

    const checkAndGenerateOrderId = async () => {
        const getRandomOrderId = async () => {
            const randomOrderId = Math.floor(Math.random() * (100000000000000000 - 1000 + 1) + 1000);
            const response = await fetch(`https://sohozserver.onrender.com/temporaryNewCustomer/${randomOrderId}`);
            const responseData = await response.json();

            if (!responseData.exists) {
                return randomOrderId.toString();
            } else {
                return getRandomOrderId();
            }
        };

        const generatedOrderId = await getRandomOrderId();
        setGeneratedOrderId(generatedOrderId);
    };

    const { userIds } = UseLastSixUserIds();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dealerPrice = parseFloat(document.getElementById('dillerPrice').value);
        const sellerPrice = parseFloat(document.getElementById('sellerPrice').value);

        if (!userId || !brand || !fullName || !phone || !address || !addressCode || !quantity || isNaN(dealerPrice) || isNaN(sellerPrice) || !generatedOrderId) {
            // Show an error message or handle the empty fields as needed
            Swal.fire({
                text: `Please Fill Empty Field`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Got it!'
            })
            return;
        }

        if (!isNaN(dealerPrice) && !isNaN(sellerPrice)) {
            if (sellerPrice < dealerPrice) {
                setShowAlert(true);
            } else {
                setShowAlert(false);
                const calculatedProfit = sellerPrice - dealerPrice;
                setProfit(calculatedProfit.toFixed(2));


                const saveUser = {
                    userId: userId,
                    orderId: generatedOrderId,
                    brandName: brand,
                    name: fullName,
                    phone: phone,
                    address: address,
                    addressCode: addressCode,
                    dillerPrice: parseFloat(document.getElementById('dillerPrice').value),
                    sellerPrice: parseFloat(document.getElementById('sellerPrice').value),
                    profit: profit,
                    quantity: quantity,
                    status: "pending",
                };

                const response = await fetch("https://sohozserver.onrender.com/temporaryNewCustomer", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(saveUser),
                });

                const responseData = await response.json();

                if (responseData.message === "already have user") {
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
                        } else {
                            window.location.reload()
                        }
                    })
                } else {
                    Swal.fire({
                        text: `Order Submitted`,
                        icon: 'success',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, Got it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        } else {
                            window.location.reload()
                        }
                    })
                }
            }
        }
    };

    const copyToClipboard = () => {
        const textField = document.createElement('textarea');
        textField.value = generatedOrderId;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        document.body.removeChild(textField);
        setIsCopied(true);
    };

    const handleOrderSearch = async () => {
        try {
            const response = await fetch(`https://sohozserver.onrender.com/customerDataSohozDjr/${searchQuery}`);
            if (response.ok) {
                const userData = await response.json();
                // setSearchResults(userData);
                setPhone(userData?.phone);
                setUserId(userData?.userId);
                setFullName(userData?.name);
                setAddress(userData?.address);
                setAddressCode(userData?.addressCode);
                setBrand(userData?.brandName);
                setQuantity(userData?.monthlyNeed);
                // setUserId(userData?.userId);

            }
        } catch (error) {
            console.error(error);
        }
    };





    return (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Link to="/dashboardHomeSohozDjr">
                    <WestIcon sx={{ mt: 3, ml: 1, position: 'absolute', color: "#1976E5" }}></WestIcon>
                </Link>
                <Box
                    sx={{
                        paddingTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, background: "#1976E5" }}>
                        <AddShoppingCartIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create New Order
                    </Typography>
                    <Typography component="h1" variant="p" sx={{ color: "gray", mt: 0, fontSize: "14px" }}>
                        Last ID: {userIds}
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div className="">
                                    <div className="relative flex w-full flex-wrap items-stretch">
                                        <input
                                            type="search"
                                            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                                            placeholder="Search"
                                            aria-label="Search"
                                            aria-describedby="button-addon1"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <button onClick={handleOrderSearch}
                                            className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-sm border transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-sm focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                                            type="button"
                                            id="button-addon1"
                                            data-te-ripple-init
                                            data-te-ripple-color="light">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="#1976E5"
                                                className="h-5 w-5">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                                    clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={6} sx={{ mt: 0, mb: 0 }}>
                                <Button variant="contained" onClick={generateRandomOrderId}>Generate</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="orderId"
                                    label="Order ID"
                                    ref={orderIdRef}
                                    // {...register("orderId", { required: true })}
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
                                    value={userId || ""}
                                    onChange={(e) => setUserId(e.target.value)}
                                    // {...register("userId", { required: true })}
                                    fullWidth

                                // Set the default value based on search results

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Brand Name</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={brand || ''}
                                        // {...register("brandName")}
                                        label="Brand Name"
                                        onChange={(event) => {
                                            setBrand(event.target.value);
                                        }}
                                    >
                                        <MenuItem value="">Select an option</MenuItem> {/* You can add an empty option as a default */}
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
                                    // {...register("name", { required: true, maxLength: 30 })}
                                    value={fullName || ''}
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Full Name"
                                    onChange={(event) => {
                                        setFullName(event.target.value);
                                    }}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <MuiTelInput
                                    id="outlined-helperText"
                                    label="Phone"
                                    required
                                    // {...register("phone", { required: true, maxLength: 20 })}
                                    value={phone || ''}
                                    fullWidth
                                    defaultCountry="BD"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="User Address"
                                    // {...register("address", { required: true })}
                                    value={address || ''}
                                    onChange={(event) => {
                                        setAddress(event.target.value);
                                    }}

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="addressCode"
                                    label="Address Code"
                                    // {...register("address", { required: true })}
                                    value={addressCode || ''}
                                    onChange={(event) => {
                                        setAddressCode(event.target.value);
                                    }}

                                />
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="quantity"
                                    label="Quantity"
                                    value={quantity || ""}
                                    onChange={(event) => {
                                        setQuantity(event.target.value);
                                    }}

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="dillerPrice"
                                    label="Dealer Price"
                                    // {...register("dillerPrice", { required: true })}
                                    onChange={handleDealerPriceChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="sellerPrice"
                                    label="Seller Price"
                                    // {...register("sellerPrice", { required: true })}
                                    onChange={handleSellerPriceChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="profit"
                                    label="Profit"
                                    value={profit}
                                    // {...register("profit")}
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
                            sx={{ mt: 2, mb: 1 }}
                        >
                            Submit Data
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
