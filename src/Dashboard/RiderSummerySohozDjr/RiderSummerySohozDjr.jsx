
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';



const defaultTheme = createTheme();

export default function RiderSummerySohozDjr() {


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
                        <Grid container spacing={1}>
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
                                            <h2 className='text-md text-gray-400 font-poppins pb-2' >Your Summery#</h2>
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
