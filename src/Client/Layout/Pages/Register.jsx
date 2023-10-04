import {  useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link,  useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import { AuthContext } from '../../Providers/Providers';
import Social from '../../Components/Social/Social';
import Typewriter from 'typewriter-effect';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { AuthContext } from '../../Providers/Providers';
import "./Register.css"

// formState: { errors }
const Register = () => {
    const { register, handleSubmit, reset ,  } = useForm();
    const { handleRegisterUser , handleUpdateProfile } = useContext(AuthContext);
    const Navigate = useNavigate() ;
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordTwo, setShowPasswordTwo] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordTwo = () => setShowPasswordTwo((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = (data) => {
        console.log(data)
        // const x = data.password ;
        // const y = data.confirmPassword ;
        console.log(data.name , data.phone , data.email, data.password , data.confirmPassword)
     
        if (data.password == data.confirmPassword) {

            const email = data.email;
            const password = data.password;
            console.log(email , password)

            handleRegisterUser(email, password)
                .then(result => {
                    console.log(result)
                    const registeredUser = result.user;
                    console.log(registeredUser)
                    handleUpdateProfile(data.name)
                        .then(() => {
                            const saveUser = {name: data.name , phone : data.phone , email : data.email , role : "user"}
                            console.log(saveUser)
                            fetch("http://localhost:5000/users" , {
                                method : "POST" , 
                                headers : {
                                    "content-type" : "application/json"
                                }, 
                                body : JSON.stringify(saveUser)
                            })
                            .then(res => res.json())
                            .then(user => {
                                console.log(user , "user create")
                                if(user.insertedId){
                                    reset()
                                    Swal.fire({
                                        position: 'top-center',
                                        icon: 'success',
                                        title: 'Registation Completed',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    Navigate("/")
                                }
                            } )


                         })
                   
                })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password Not Match!',
            })
        }
        console.log(data.password, data.confirmPassword)
    };



    return (

        <div className='h-screen flex justify-center items-center' >
            <div className='flex justify-center items-center flex-col px-10  mx-2'>

                <div className='pt-10 pb-5 text-center text-xl font-bold text-gray-600'>
                    <Typewriter
                        options={{

                            strings: [' "SOHOZ"', 'Register Now'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
                <div className=' '>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='pb-2'><TextField id="standard-basic" {...register("name")}  label=" Name" variant="standard" /></div>
                        <div className='pb-2'><TextField id="standard-basicTwo" {...register("email")} label=" Email" variant="standard" /></div>
                        <div className='pb-2'><TextField id="standard-basicThree" {...register("phone")} label=" Phone" variant="standard" /></div>
                        <FormControl variant="standard"  >
                            <div className='pb-2'>
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
                            </div>
                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                            <Input
                                {...register("confirmPassword")}
                                id="standard-adornment-passwordTwo"
                                type={ showPasswordTwo? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordTwo}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPasswordTwo ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <div className='flex flex-col justify-center py-10'>
                            <input className=" text-white  px-10 py-3  font-medium  bg-green-600 shadow-md  rounded " type="submit" />
                    <p className=' text-sm py-4'>New this site ? <Link className='text-indigo-800 w-full' to="/register">Register</Link></p>
                            <Social></Social>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Register;