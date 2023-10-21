import sohoz from "../../../../assets/sohoz.png"
import Marquee from "react-fast-marquee";

const Instraction = () => {
    return (

        <Marquee pauseOnHover="true" delay="2">
            <div className="grid grid-cols-5 justify-evenly items-center  py-2 ">
                <div className=" font-poppins text-[8px] flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        <img className="h-[40px]  w-[40px] rounded-full object-cover" src="https://i.ibb.co/tZ0hf5y/carry.jpg" alt="carry gas a man" />
                        <p className="font-poppins pt-1 text-gray-400">Save Work</p>
                    </div>
                </div>
                <div className="  font-poppins text-[8px] flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        <img className="h-[40px]  w-[40px] rounded-full object-cover" src="https://i.ibb.co/qxJLw51/time-min.jpg" alt="time picture" />
                        <p className="font-poppins pt-1  text-gray-400">Save Time</p>
                    </div>
                </div>
                <div className="  font-poppins text-[8px] flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        <img className="h-[40px]  w-[40px] rounded-full object-cover" src="https://i.ibb.co/b7VBLpW/images-min.jpg" alt="money picture" />
                        <p className="font-poppins pt-1  text-gray-400">Save Money</p>
                    </div>
                </div>
                <div className="  font-poppins text-[8px] flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        <img className="h-[40px]  w-[40px] rounded-full object-cover" src="https://i.ibb.co/hfsWBdt/equal.jpg" alt="equal to picture" />
                        <p className="font-poppins pt-1  text-gray-400">Equal To</p>
                    </div>
                </div>
                <div className="  font-poppins text-[10px] flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center ">
                        <img className="h-[33px]    object-cover" src={sohoz} alt="webiste logo" />
                        <p className="font-poppins pt-1 font-bold text-red-500">Sohoz</p>
                    </div>
                </div>
            </div>
        </Marquee>
    );
};

export default Instraction;