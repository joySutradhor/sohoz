
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
const Upcoming = () => {
    const { data } = useQuery({
        queryKey: ['upcomingSohozDjr'],
        queryFn: async () => {
            const response = await fetch('http://localhost:5000/upcomingSohozDjr')
            return response.json()
        },
    })
    return (
        <div className="pb-24">
            <h1 className="font-poppins text-[13px] font-medium pb-[2px] pt-4 text-gray-500 pl-4">Upcoming ....</h1>
            <div className='grid grid-cols-2 gap-2 px-2'>
                {
                    data?.map((data) => <div
                        key={data._id}
                        className="py-2 px-[2px] bg-white rounded-md shadow-sm ">
                        <div className="flex justify-evenly items-center ">
                            <div >
                                <img className=" h-[35px] border p-2 mr-1 border-gray-200 shadow-md rounded-full " src={data?.image} alt="Woman's Face" />
                            </div>
                            <div className="space-y-2 ">
                                <div className="space-y-0.5">
                                    <p className="text-xs text-gray-400 font-semibold">
                                        {data?.name}
                                    </p>
                                    <p className="text-gray-400 text-xs line-through ">
                                        {data?.price} Taka
                                    </p>
                                </div>
                                <Link to={`/userPlaceOrderSohozDjr/${data._id}`}><button className="text-xs text-gray-400  ">Place Order<KeyboardArrowRightIcon></KeyboardArrowRightIcon></button></Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Upcoming;