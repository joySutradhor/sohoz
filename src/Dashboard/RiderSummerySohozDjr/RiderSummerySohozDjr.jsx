
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Badge } from '@mui/material';
// import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
// import { Link } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SummerySohozDjr() {


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
                        // overflow: 'auto',

                    }}
                >
                    <Container maxWidth="lg" sx={{ mt: 0, mb: 2, pr: 0 }}>
                        {/* <div className='flex  gap-x-3'>
                            <Link className='mt-[10px] text-gray-600' to="/dashboardHomeSohozDjr" ><KeyboardBackspaceIcon></KeyboardBackspaceIcon></Link>
                            <h2 className='pb-4 pt-2 text-xl font-poppins text-gray-300'> Dashboard Summary</h2>
                        </div> */}
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
                                        badgeContent={` 5 Orders`}
                                        color="primary"
                                        sx={{
                                            position: 'absolute',
                                            top: 28,
                                            right: 50,
                                            padding: 20
                                        }}
                                    />
                                    <h2 className='text-md text-gray-400 font-poppins pb-2' >Your Summery List#</h2>
                                    <p className='text-gray-400' >Completed Orders : 00 pcs</p>
                                    <p className='text-gray-400' >Pending Orders : 00 pcs</p>
                                    <p className='text-gray-400' >Progress Orders : 00 pcs</p>
                                    <p className='text-gray-400'>Overall Health : 00 pcs</p>


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
                                            <h2 className='text-md text-gray-400 font-poppins pb-2' >Your Summery List#</h2>
                                            <p className='text-gray-400' >Completed Orders : 00 pcs</p>
                                            <p className='text-gray-400' >Pending Orders : 00 pcs</p>
                                            <p className='text-gray-400' >Progress Orders : 00 pcs</p>
                                            <p className='text-gray-400'>Overall Health : 00 pcs</p>
                                        </div>

                                    </div>
                                </Paper>
                            </Grid>

                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
