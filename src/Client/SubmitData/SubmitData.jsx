/* eslint-disable react/jsx-no-duplicate-props */
import { useForm } from "react-hook-form"
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import FormControl from '@mui/material/FormControl';

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
        <div className="grid  justify-center items-center h-screen">
                       

            <h1 className="text-bold text-2xl text-gray-400 text-center">submit Customer Data</h1>
            <form className="grid grid-cols-2 gap-5 px-5" onSubmit={handleSubmit(onSubmit)}>
          
                <TextField id="outlined-read-only-input" {...register("Id")} defaultValue={2}  label="ID"  InputProps={{
            readOnly: true,
          }} variant="standard" />
                <TextField id="standard-basic" {...register("name")} label=" Name" variant="standard" />
                <TextField id="standard-basic" {...register("phone")} label="Phone" variant="standard" />
                <TextField id="standard-basic" {...register("need")} label="Need" variant="standard" />
                <TextField id="standard-basic" {...register("date")} label="Date" variant="standard" />
                <TextField id="standard-basic" {...register("endDate")} label="End Date" variant="standard" />
                <TextField id="standard-basic" {...register("diller")} label="Diller Price" variant="standard" />
                <TextField id="standard-basic" {...register("seller")} label="Seller Price" variant="standard" />
                <TextField id="standard-basic" {...register("profit")} label="Profit" variant="standard" />
                <TextField id="standard-basic" {...register("address")} label="Address" variant="standard" />
                <TextField id="standard-basic" {...register("addressCode")} label="Address Code" variant="standard" />
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



                {errors.exampleRequired && <span>This field is required</span>}


                <input type="submit" />
            </form>

        </div>
    )
}