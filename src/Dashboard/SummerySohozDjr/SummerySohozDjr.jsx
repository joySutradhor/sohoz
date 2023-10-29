import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const defaultTheme = createTheme();

export default function DashboardHomeSohozDjr() {
    const [data, setData] = useState(null);
    const [totalDillerPrice, setTotalDillerPrice] = useState(0);
    const [totalSellerPrice, setTotalSellerPrice] = useState(0);
    const [totalCompletedOrders, setTotalCompletedOrders] = useState(0);
    const [totalTotalProfit, setTotalTotalProfit] = useState(0);
    const [totalDillerPriceByDilerPoint, setTotalDillerPriceByDilerPoint] = useState({});
    const [totalCompletedOrdersByDilerPoint, setTotalCompletedOrdersByDilerPoint] = useState({});
    const [brandDataByDilerPoint, setBrandDataByDilerPoint] = useState({});
    const [cashPaymentTotal, setCashPaymentTotal] = useState(0);
    const [bkashPaymentTotal, setBkashPaymentTotal] = useState(0);
    const [nagadPaymentTotal, setNagadPaymentTotal] = useState(0);
    const [totalProfitBy_Id, setTotalProfitBy_Id] = useState(0);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5000/completerOrderData');

                if (!response.ok) {
                    // throw an Error(`HTTP error! Status: ${response.status}`);
                }

                const jsonData = await response.json();
                setData(jsonData?.summeryData);

                let dynamicTotalDillerPrice = 0;
                let dynamicTotalSellerPrice = 0;
                let dynamicTotalCompletedOrders = 0;
                let dynamicTotalTotalProfit = 0;
                const dynamicTotalDillerPriceByDilerPoint = {};
                const dynamicTotalCompletedOrdersByDilerPoint = {};
                const dynamicBrandDataByDilerPoint = {};

                // Object to keep track of payments by type
                const paymentByType = {
                    cash: 0,
                    bkash: 0,
                    nagad: 0,
                };

                if (jsonData?.summeryData) {
                    jsonData.summeryData.forEach((item) => {
                        if (item.payments && item.payments.length > 0) {
                            item.payments.forEach((payment) => {
                                dynamicTotalCompletedOrders += payment.completedOrders || 0;
                                dynamicTotalTotalProfit += payment.totalProfit || 0;

                                // Calculate total profit based on payments
                                paymentByType[payment.paymentType] += payment.totalProfit || 0;

                                if (payment.dilerPointData && payment.dilerPointData.length > 0) {
                                    payment.dilerPointData.forEach((dilerPoint) => {
                                        dynamicTotalDillerPrice += dilerPoint.totalDillerPrice || 0;
                                        dynamicTotalSellerPrice += dilerPoint.totalsellerPrice || 0;

                                        const dilerPointId = dilerPoint.dilerPoint;
                                        dynamicTotalDillerPriceByDilerPoint[dilerPointId] = (dynamicTotalDillerPriceByDilerPoint[dilerPointId] || 0) + (dilerPoint.totalDillerPrice || 0);
                                        dynamicTotalCompletedOrdersByDilerPoint[dilerPointId] = (dynamicTotalCompletedOrdersByDilerPoint[dilerPointId] || 0) + (dilerPoint.completedOrders || 0);

                                        // Initialize an array for each dilerPoint to store brand data
                                        if (!dynamicBrandDataByDilerPoint[dilerPointId]) {
                                            dynamicBrandDataByDilerPoint[dilerPointId] = {};
                                        }

                                        // Add brand data to the array
                                        dilerPoint.brandData.forEach((brand) => {
                                            const brandName = brand.brandName;
                                            const quantity = parseInt(brand.quantity) || 0; // Convert to a number

                                            // Initialize the quantity if it's not set yet
                                            if (!dynamicBrandDataByDilerPoint[dilerPointId][brandName]) {
                                                dynamicBrandDataByDilerPoint[dilerPointId][brandName] = 0;
                                            }

                                            // Add quantity to the existing quantity for the brand
                                            dynamicBrandDataByDilerPoint[dilerPointId][brandName] += quantity;
                                        });
                                    });
                                }
                            });
                        }
                    });
                }

                // Calculate the total profit by _id
                const totalProfitBy_Id = {};
                if (jsonData?.summeryData) {
                    jsonData.summeryData.forEach((item) => {
                        const _id = item._id;
                        totalProfitBy_Id[_id] = 0;
                        if (item.payments && item.payments.length > 0) {
                            item.payments.forEach((payment) => {

                                totalProfitBy_Id[_id] += payment.totalProfit || 0;
                            });
                        }
                    });
                }

                // Set the calculated totals
                setTotalDillerPrice(dynamicTotalDillerPrice);
                setTotalSellerPrice(dynamicTotalSellerPrice);
                setTotalCompletedOrders(dynamicTotalCompletedOrders);
                setTotalTotalProfit(dynamicTotalTotalProfit);
                setTotalDillerPriceByDilerPoint(dynamicTotalDillerPriceByDilerPoint);
                setTotalCompletedOrdersByDilerPoint(dynamicTotalCompletedOrdersByDilerPoint);
                setBrandDataByDilerPoint(dynamicBrandDataByDilerPoint);

                // Set the total profit by _id
                setTotalProfitBy_Id(totalProfitBy_Id);

                // Set the payment totals by type
                setCashPaymentTotal(paymentByType['cash']);
                setBkashPaymentTotal(paymentByType['bkash']);
                setNagadPaymentTotal(paymentByType['nagad']);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    console.log(totalProfitBy_Id)

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Container maxWidth="lg" sx={{ mt: 1, mb: 2 }}>
                        <div>
                            <p>back</p>
                            <h2 className='pb-4 pt-2 text-md font-poppins text-gray-300'>Dashboard Summary</h2>
                        </div>
                        <Grid container spacing={1}>
                           
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: "auto",
                                    }}
                                >
                                    <h1> Payment Totals </h1>
                                    <p>Cash: {cashPaymentTotal.toLocaleString()} taka</p>
                                    <p>Bkash: {bkashPaymentTotal.toLocaleString()} taka</p>
                                    <p>Nagad: {nagadPaymentTotal.toLocaleString()} taka</p>
                                    <p>{totalTotalProfit.toLocaleString()} taka</p>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: "auto",
                                    }}
                                >
                                    <div className='flex gap-2'>
                                        <Grid item xs={6} md={4} lg={3}>
                                            <Paper
                                                sx={{
                                                    p: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    height: "auto",
                                                }}
                                            >
                                                <h1>Total Sells</h1>
                                                <p>{totalSellerPrice.toLocaleString()}</p>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6} md={4} lg={3}>
                                            <Paper
                                                sx={{
                                                    p: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    height: "auto",
                                                }}
                                            >
                                                <h1>Total Diller </h1>
                                                <p>{totalDillerPrice.toLocaleString()}</p>
                                            </Paper>
                                        </Grid>
                                    </div>
                                </Paper>
                            </Grid>

                            {/* Display the sum of totalDillerPrice for each dilerPoint */}
                            {Object.entries(totalDillerPriceByDilerPoint).map(([dilerPointId, dillerPrice]) => (
                                <Grid item xs={12} md={4} lg={3} key={dilerPointId}>
                                    <Paper
                                        sx={{
                                            p: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: "auto",
                                        }}
                                    >
                                        <h1>Point {dilerPointId}</h1>
                                        <p>{dillerPrice.toLocaleString()} taka</p>
                                    </Paper>
                                </Grid>
                            ))}

                            {/* Display the sum of completedOrders for each dilerPoint */}
                            {Object.entries(totalCompletedOrdersByDilerPoint).map(([dilerPointId, completedOrders]) => (
                                <Grid item xs={12} md={4} lg={3} key={dilerPointId}>
                                    <Paper
                                        sx={{
                                            p: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: "auto",
                                        }}
                                    >
                                        <h1>Point {dilerPointId}</h1>
                                        <p>{completedOrders} Orders</p>
                                    </Paper>
                                </Grid>
                            ))}

                            {/* Display the sum of brand quantity for each dilerPoint */}
                            {Object.entries(brandDataByDilerPoint).map(([dilerPointId, brandData]) => (
                                <Grid item xs={12} md={4} lg={3} key={dilerPointId}>
                                    <Paper
                                        sx={{
                                            p: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: "auto",
                                        }}
                                    >
                                        <h1>Brand Quantity for Point {dilerPointId}</h1>
                                        {Object.entries(brandData).map(([brandName, quantity]) => (
                                            <p key={brandName}>{brandName}: {quantity} quantity</p>
                                        ))}
                                    </Paper>
                                </Grid>
                            ))}

                            {Object.entries(totalProfitBy_Id).map(([itemId, totalProfit]) => (

                                <Grid item xs={12} md={4} lg={3} key={itemId}>
                                    <Paper
                                        sx={{
                                            p: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: "auto",
                                        }}
                                    >
                                        <h1>Profit for {itemId} </h1>
                                        <p>{totalProfit.toLocaleString()} taka</p>

                                    </Paper>
                                </Grid>

                            ))}




                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: "auto",
                                    }}
                                >
                                    <h1> Completed </h1>
                                    <p>{totalCompletedOrders} Orders</p>
                                </Paper>
                            </Grid>



                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
