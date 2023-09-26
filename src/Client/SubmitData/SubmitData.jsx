/* eslint-disable react/jsx-no-duplicate-props */
import { useForm } from "react-hook-form"
import TextField from '@mui/material/TextField';
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


    return (
        // <div className="grid  items-center justify-center  h-screen bg-slate-50">
        // </div>
        <div className=" mx-4 bg-white ">
                <h1 className="font-bold text-2xl text-gray-600 text-center py-5  ">Submit Customer Data</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid grid-cols-2 gap-5" >
                        <TextField id="outlined-read-only-input" {...register("customerId")} defaultValue={2} label="Customer ID" InputProps={{
                            readOnly: true,
                        }} variant="standard" />
                        <TextField id="outlined-read-only-input" {...register("riderId")} defaultValue={2} label="Rider ID" InputProps={{
                            readOnly: true,
                        }} variant="standard" />
                        <TextField id="standard-basic" {...register("name")} label=" Name" variant="standard" />
                        
                        <TextField id="standard-basic" {...register("phone")} label="Phone" variant="standard" />
                        <TextField id="standard-basic" {...register("need")} label="Monthly Need" variant="standard" />
                        <TextField id="standard-basic" {...register("brand")} label="Brand Name" variant="standard" />

                        {/* <DatePicker {...register("date")} label="Basic date picker" /> */}
                        <div className="pt-1 mr-2">
                            <p className=" font-roboto text-[#00000099] ">Start Date</p>
                            <input type="date" name="StartDate" id="" className="outline-none bg-transparent  border-gray-400 border-b-[1px] text-gray-500" />
                        </div>
                        <div className="pt-1">
                            <p className="font-roboto text-[#00000099]">End Date</p>
                            <input type="date" name="EndDate" id="" className="outline-none bg-transparent border-gray-400 border-b-[1px] text-gray-500" />
                        </div>
                        <TextField id="standard-basic" {...register("diller")} label="Diller Price" variant="standard" />
                        <TextField id="standard-basic" {...register("seller")} label="Seller Price" variant="standard" />
                        <TextField id="standard-basic" {...register("address")} label="Address" variant="standard" />
                        <TextField id="standard-basic" {...register("addressCode")} label="Address Code" variant="standard" />
                        <TextField id="standard-basic" {...register("cost")} label="Cost" variant="standard" />
                        <TextField id="standard-basic" {...register("costDetails")} label="Cost Details" variant="standard" />
                        
                        
                    </div>



                    {errors.exampleRequired && <span>This field is required</span>}


                    <div className="flex justify-center  items-center pt-12 pb-6 ">
                        <input className=" text-white  px-10 py-3  font-medium  bg-green-600 shadow-md  rounded " type="submit" />
                    </div>
                </form>
            </div>
    )
}