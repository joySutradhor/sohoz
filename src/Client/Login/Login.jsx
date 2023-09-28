// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import Swal from 'sweetalert2';



export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Swal fire part
    const fire = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login Successfully',
            showConfirmButton: false ,
            timer: 1500
          })
    }

    return (
        <div className='flex   h-screen justify-center items-center bg-slate-100 '>
            <div className='bg-slate-50 shadow-md rounded-md  px-16  mx-8'>

                <div className='py-10 text-center text-2xl font-bold text-gray-600'>
                    <Typewriter
                        options={{

                            strings: [' "SOHOZ"', 'Login Now'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
                <div className='flex flex-col '>
                    <div className='pb-5'><TextField id="standard-basic" label="User ID" variant="standard" /></div>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
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
                    <div className='flex justify-center py-8'>
                        <Button onClick={()=> fire()}>
                            <Link to="/submitData" className=" text-white  px-6 py-3  font-medium  bg-green-600 shadow-md  rounded ">
                           Login Now
                            </Link>
                        </Button>
                    </div>

                </div>

            </div>
        </div>
    );
}