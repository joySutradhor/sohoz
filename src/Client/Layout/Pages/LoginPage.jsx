import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Providers/Providers';
import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
// import Social from '../../Components/Social/Social';
import SocialLogin from '../../Components/Social/SocialLogin';
// import { WestIcon } from '@mui/icons-material/West';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Developed By © '}
//             <Link className = "text-[#2976d2] underline font-semibold text-[12px]" to="https://www.facebook.com/joysutradhoor">
//                 Joy Sutradhor
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginPage() {

    const { register, handleSubmit, reset } = useForm();
    const { handleloginUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const onSubmit = data => {
        console.log(data)
        handleloginUser(data.loginEmail, data.loginPassword)
            .then((result) => {
                const data = result.user;
                console.log(data , "from login page")
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Login Completed',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true })
                reset()
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                toast.error('Password or Email is invalid', {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000, // Close the notification after 3 seconds (adjust as needed)
                });
            });
    };



    return (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Link to="/">
                    <ArrowBackIcon sx={{ mt: 6, ml: 1, position: 'absolute' }} ></ArrowBackIcon>
                </Link>
                
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: "100vh"
                    }}
                >

                    <Avatar sx={{ mt: 6, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            {...register("loginEmail", { required: true })}
                        />
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput

                                autoComplete="new-password"
                                {...register("loginPassword", { required: true, minLength: 6 })}
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                        <Grid container className='text-[14px] underline font-roboto text-[#1976d2]'>
                            <Grid item xs>
                                <Link to="" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/registerPage" variant="body2">
                                    {"Go to Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <p className='text-center mb-1 text-gray-400'>or</p>
                        <SocialLogin></SocialLogin>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 4, mb: 2 }} /> */}
            </Container>
        </ThemeProvider>
    );
}