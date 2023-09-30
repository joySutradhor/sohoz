import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typewriter from 'typewriter-effect';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
// import "./Login.css"



export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const { data, } = useQuery({
        queryKey: ['info'],
        queryFn: () =>
            fetch('http://localhost:5000/info').then(
                (res) => res.json(),
            ),
    })
    const [officeInfo, setOfficeInfo] = useState("");


    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmit = (formData) => {
        console.log(formData.id, formData.password)
        console.log(data)

        // using find method for admin  conditional dashboard
        if (data?.find((d) => d.id == formData.id && d.pass == formData.password && d.role == "admin")) {
            setOfficeInfo("admin")
            Swal.fire({
                title: 'Want  to Login?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Login!'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/admin';
                }
            })
        }

        // using find method for marketing  conditional dashboard
        else if (data?.find((d) => d.id == formData.id && d.pass == formData.password && d.role == "marketing")) {
            console.log("milse marketing")
            setOfficeInfo("marketing")
            Swal.fire({
                title: 'Want  to Login?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Login!'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/marketing';
                }
            })

        }

        // using find method for management  conditional dashboard
        else if (data?.find((d) => d.id == formData.id && d.pass == formData.password && d.role == "management")) {
            console.log("milse management")
            setOfficeInfo("management")
            Swal.fire({
                title: 'Want  to Login?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Login!'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/management';
                }
            })


        }
        // no match conditon 
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'User ID or Password Invalid!',

            })
        }
    }
    console.log(officeInfo)


    return (
        <div className='grid place-items-center h-screen bg-slate-100 '>
            <div className='bg-slate-50 shadow-md rounded-md  px-16  mx-5'>

                <div className='py-10 text-center text-2xl font-bold text-gray-600'>
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
                        <div className='pb-5'><TextField id="standard-basic" {...register("id")} label="User ID" variant="standard" /></div>
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
                        <div className='flex justify-center py-10'>
                            <input className=" text-white  px-10 py-3  font-medium  bg-green-600 shadow-md  rounded " type="submit" />
                        </div>
                    </form>

                </div>

            </div>
        </div>
    );
}