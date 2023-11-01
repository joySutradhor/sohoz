import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Badge } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from 'react-router-dom';

const defaultTheme = createTheme();

export default function DashboardHomeSohozDjr() {
    const [totalCostsum, setTotalCostSum] = useState(null);
    const [, setData] = useState(null);
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
                const response = await fetch('https://sohozserver.onrender.com/completerOrderData');


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
    useEffect(() => {
        async function fetchCostDetails() {
            try {
                const costDetailsRes = await fetch('https://sohozserver.onrender.com/costDetailsSohozDjr');
                const costDetailsData = await costDetailsRes.json();
                setTotalCostSum(costDetailsData.totalCostSum);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchCostDetails();
    }, []);

    // show rider profit 
    const totalProfitData = Object.entries(totalProfitBy_Id).map(([itemId, totalProfit]) => ({
        itemId,
        totalProfit,
    }));

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
                        <div className='flex  gap-x-3'>
                            <Link className='mt-[10px] text-gray-600' to="/dashboardHomeSohozDjr" ><KeyboardBackspaceIcon></KeyboardBackspaceIcon></Link>
                            <h2 className='pb-4 pt-2 text-xl font-poppins text-gray-300'> Dashboard Summary</h2>
                        </div>
                        <Grid container spacing={1}>

                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 'auto',
                                        position: 'relative', // Add relative positioning
                                    }}
                                >
                                    <Badge
                                        badgeContent={` ${totalCompletedOrders} Orders`}
                                        color="primary"
                                        sx={{
                                            position: 'absolute',
                                            top: 28,
                                            right: 50,
                                            padding: 20
                                        }}
                                    />
                                    <h1 className='text-md text-gray-400 font-poppins'>Payment Totals #</h1>
                                    <p className='text-gray-400 '>Cash: {cashPaymentTotal.toLocaleString()} taka</p>
                                    <p className='text-gray-400'>Bkash: {bkashPaymentTotal.toLocaleString()} taka</p>
                                    <p className='text-gray-400 pb-1'>Nagad: {nagadPaymentTotal.toLocaleString()} taka</p>
                                    <span className='border-t-2 border-dashed border-green-200  inline'></span>
                                    <p className='pt-1 text-gray-400'>Profit : {totalTotalProfit.toLocaleString()} taka</p>
                                    <p className='py-1 text-gray-400'>Cost : {totalCostsum?.toLocaleString()} taka</p>
                                    <span className='border-t-2 py-0 border-dashed border-green-200 inline'></span>
                                    <p className={`pt-1 text-sm font-poppins ${totalTotalProfit - totalCostsum >= 0 ? 'text-green-500' : 'text-red-500'
                                        }`}>
                                        {totalTotalProfit - totalCostsum >= 0 ? (
                                            `Net Profit : ${Number((totalTotalProfit - totalCostsum).toFixed(2)).toLocaleString()} taka`
                                        ) : (
                                            `Loss : ${Number((totalCostsum - totalTotalProfit).toFixed(2)).toLocaleString()} taka`
                                        )}
                                    </p>


                                </Paper>
                            </Grid>


                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: "auto",
                                    }}
                                >
                                    <div className='flex gap-2'>
                                        <div>
                                            <h2 className='text-md text-gray-400 font-poppins pb-2' >Business Summery#</h2>
                                            <p className='text-gray-400' >Total Sells : {totalSellerPrice.toLocaleString()} Taka</p>
                                            <p className='text-gray-400' >Total Transation : {totalDillerPrice.toLocaleString()} Taka</p>
                                            <p className='text-gray-400' >Total Cost : {totalCostsum?.toLocaleString()} Taka</p>
                                            <p className='text-gray-400'>  Profit : {totalTotalProfit.toLocaleString()} taka</p>
                                        </div>

                                    </div>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: "auto",
                                    }}
                                >
                                    <div className='flex gap-2'>
                                        <div>
                                            <h2 className='text-md text-gray-400 font-poppins pb-2' >Riders Summery#</h2>
                                            {totalProfitData.map(({ itemId, totalProfit }) => (
                                                <p key={itemId} className='text-gray-400'>
                                                    Rider #{itemId} : {totalProfit.toLocaleString()} taka
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </Paper>
                            </Grid>

                            {/* Display the sum of totalDillerPrice for each dilerPoint */}
                            {Object.entries(totalDillerPriceByDilerPoint).map(([dilerPointId, dillerPrice]) => (
                                <Grid item xs={12} md={4} lg={3} key={dilerPointId}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 'auto',
                                            position: 'relative',
                                        }}
                                    >
                                        <Badge
                                            badgeContent={` ${totalCompletedOrdersByDilerPoint[dilerPointId]} Orders`}
                                            color="primary"
                                            sx={{
                                                position: 'absolute',
                                                top: 28,
                                                right: 50,
                                                p: 20
                                            }}
                                        />
                                        <h1 className='text-md font-poppins text-gray-400 pb-2'>Point Code : #{dilerPointId}</h1>
                                        <p className='text-gray-400' >Transaction : {dillerPrice.toLocaleString()} Taka</p>

                                        <p className='text-gray-400 '>Details#</p>
                                        {/* Add Brand Quantity for Point here if it exists */}
                                        {brandDataByDilerPoint[dilerPointId] && (
                                            <ul style={{ listStyleType: 'square', marginLeft: '10px', padding: '0' }}>
                                                {Object.entries(brandDataByDilerPoint[dilerPointId]).map(([brandName, quantity]) => (
                                                    <li className='text-gray-400' key={brandName} style={{ margin: '0px 25px' }}>
                                                        {brandName}: {quantity} Pcs
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
