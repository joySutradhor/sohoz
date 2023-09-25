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
            showConfirmButton: true,
            timer: 1500
          })
    }

    return (
        <div className='flex  items-center h-screen justify-center bg-slate-100 '>
            <div className='bg-slate-50 shadow-md rounded-md  pb-8 px-16 pt-10 mx-8'>

                <div className='pb-8 text-center text-2xl font-bold text-gray-600'>
                    <Typewriter
                        options={{

                            strings: [' "SOHOZ"', 'Login Now'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
                <div className='flex flex-col space-y-5'>
                    <TextField id="standard-basic" label="User ID" variant="standard" />
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
                            <Link to="/submitData" className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-slate-100 shadow-md  rounded hover:bg-white group">
                                <span className="w-48 h-48 rounded rotate-[-35deg] bg-green-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Login Now</span>
                            </Link>
                        </Button>
                    </div>

                </div>

            </div>
        </div>
    );
}