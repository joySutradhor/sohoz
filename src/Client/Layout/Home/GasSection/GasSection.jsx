
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
const GasSection = () => {
    const { data } = useQuery({
        queryKey: ['cylinders'],
        queryFn: async () => {
            const response = await fetch('http://localhost:5000/cylinders')
            return response.json()
        },
    })
    return (
        <div className="pb-4  space-y-1">
            <h1 className="py-2 pl-2 text-md text-gray-400 font-semibold">Hot Poducts</h1>
            <div className='grid grid-cols-2 gap-1'>
                {
                    data?.map((data) => <div
                        key={data._id}
                        className="py-2 px-2 bg-white rounded-md shadow-sm ">
                        <div className="flex justify-evenly items-center ">
                            <div>
                                <img className=" h-[50px] border p-2 mr-1 border-gray-200 shadow-md rounded-full " src={data?.img} alt="Woman's Face" />
                            </div>
                            <div className="space-y-2 ">
                                <div className="space-y-0.5">
                                    <p className="text-xs text-gray-400 font-semibold">
                                        {data?.name}
                                    </p>
                                    <p className="text-slate-400 text-xs ">
                                        {data?.price} Taka
                                    </p>
                                </div>
                                <Link to={`/userPlaceOrderSohozDjr/${data._id}`}><button className="text-xs text-red-400  ">Place Order<KeyboardArrowRightIcon></KeyboardArrowRightIcon></button></Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default GasSection;