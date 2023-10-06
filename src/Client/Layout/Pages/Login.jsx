import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/Providers';
import Swal from 'sweetalert2';
import Social from '../../Components/Social/Social';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typewriter from 'typewriter-effect';
import { useState } from 'react';


const Login = () => {
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
        // console.log(data)
        handleloginUser(data.email, data.password)
            .then(() => {
                // const data = result.user;
                // console.log(data)
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
    };

    return (
        <div className='h-screen'>
            <div className='flex justify-center items-center flex-col  px-10  mx-2'>

                <div className='pt-10 pb-5 text-center text-2xl font-bold text-gray-600'>
                    <Typewriter
                        options={{

                            strings: [' "SOHOZ"', 'Login Now'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
                <div className='grid grid-cols-1 '>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='pb-5'><TextField id="standard-basic" {...register("email")} label="User Email" variant="standard" /></div>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                {...register("password")}
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <div className='flex flex-col justify-center py-10'>
                            <input className=" text-white  px-10 py-3  font-medium  bg-green-600 shadow-md  rounded " type="submit" />
                            <p className=' text-sm py-4'>New this site ? <Link className='text-indigo-800 w-full' to="/registerPage">Register</Link></p>
                            <Social></Social>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Login;