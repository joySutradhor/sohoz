/* eslint-disable react/jsx-no-duplicate-props */
import { useForm } from "react-hook-form"
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import FormControl from '@mui/material/FormControl';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function SubmitData() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


    const onSubmit = (data) => console.log(data)


    console.log(watch("example")) // watch input value by passing the name of it
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className="grid  justify-center items-center h-screen bg-slate-50">


            <div className="shadow-md mx-2 bg-white rounded-md">
                <h1 className="font-bold text-2xl text-gray-600 text-center py-5 ">Submit Customer Data</h1>
                <form  onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid grid-cols-2 gap-5 px-5" >
                    <TextField id="outlined-read-only-input" {...register("Id")} defaultValue={2} label="ID" InputProps={{
                        readOnly: true,
                    }} variant="standard" />
                    <TextField id="standard-basic" {...register("name")} label=" Name" variant="standard" />
                    <TextField id="standard-basic" {...register("phone")} label="Phone" variant="standard" />
                    <TextField id="standard-basic" {...register("need")} label="Need" variant="standard" />
                    {/* <DatePicker {...register("date")} label="Basic date picker" /> */}
                    <TextField id="standard-basic" {...register("endDate")} label="End Date" variant="standard" />
                    <TextField id="standard-basic" {...register("diller")} label="Diller Price" variant="standard" />
                    <TextField id="standard-basic" {...register("seller")} label="Seller Price" variant="standard" />
                    <TextField id="standard-basic" {...register("profit")} label="Profit" variant="standard" />
                    <TextField id="standard-basic" {...register("address")} label="Address" variant="standard" />
                    <TextField id="standard-basic" {...register("addressCode")} label="Address Code" variant="standard" />
                    <TextField id="standard-basic" {...register("cost")} label="Cost" variant="standard" />
                    <TextField id="standard-basic" {...register("cost")} label="Cost" variant="standard" />
                    <TextField id="standard-basic" {...register("costDetails")} label="Cost Details" variant="standard" />
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={age}
                            onChange={handleChange}
                            label="Age"

                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    </div>



                    {errors.exampleRequired && <span>This field is required</span>}


                    <div className="flex justify-center items-center py-12">
                        <input className=" text-white  px-6 py-3  font-medium  bg-green-600 shadow-md  rounded " type="submit" />
                    </div>
                </form>
            </div>

        </div>
    )
}