
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useQuery } from '@tanstack/react-query';
const Test = () => {
    const { data } = useQuery({
        queryKey: ['cylinders'],
        queryFn: async () => {
            const response = await fetch('http://localhost:5000/cylinders')
            return response.json()
        },
    })
    console.log(data)
    return (
        <div className="pb-4  space-y-1">
            <h1 className="py-2 pl-2 text-md text-gray-400 font-semibold">Hot Poducts</h1>
            {
                data?.map((data) => <div 
                key={data._id}
                className="py-4 px-4 bg-white rounded-md shadow-sm space-y-2">
                <div className="flex justify-evenly items-center">
                    <div>
                        <img className=" h-[110px] border p-2 border-green-200 rounded-full " src={data?.img} alt="Woman's Face" />
                    </div>
                    <div className="space-y-2 sm:text-left">
                        <div className="space-y-0.5">
                            <p className="text-md text-gray-400 font-semibold">
                                {data?.name}
                            </p>
                            <p className="text-slate-500 text-xs font-poppins">
                                {data?.price} Taka
                            </p>
                        </div>
                        <button className="text-sm text-green-600 font-semibold ">Order Now <KeyboardArrowRightIcon></KeyboardArrowRightIcon></button>
                    </div>
                </div>
            </div>)
            }
        </div>
    );
};

export default Test;