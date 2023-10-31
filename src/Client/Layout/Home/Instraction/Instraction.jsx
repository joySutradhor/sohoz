

const Instraction = () => {
    return (


        <div>
            <h3 className="font-poppins text-[13px] font-medium pb-[2px] pt-4 pl-4 text-gray-500">Categories</h3>
            <div className="grid grid-cols-4 justify-evenly items-center px-2">
                <div>
                    <div className=" font-poppins text-[8px] h-[49px] w-[65px] rounded-[10px]  bg-white flex justify-center items-center">
                        <img className="h-[37px]  w-[33px]  object-cover" src="https://i.ibb.co/vxDNmNY/Grocery-1-removebg-preview.webp" alt="grocery img" />

                    </div>
                    <p className="font-poppins pt-3 text-gray-400 text-center text-[10px]">Grocery</p>
                </div>
                <div>
                    <div className=" font-poppins text-[8px] h-[49px] w-[65px] rounded-[10px]  bg-white flex justify-center items-center">
                        <img className="h-[37px]  w-[33px]  object-cover" src="https://i.ibb.co/Trz6Lnt/Electronics-1-removebg-preview.webp" alt="Electronics img" />

                    </div>
                    <p className="font-poppins pt-3 text-gray-400 text-center text-[10px]">Electronics</p>
                </div>
                <div>
                    <div className=" font-poppins text-[8px] h-[49px] w-[65px] rounded-[10px]  bg-white flex justify-center items-center">
                        <img className="h-[37px]  w-[33px]  object-cover" src="https://i.ibb.co/8Pk7YrC/Hardware-Tools-1-removebg-preview.webp" alt="tools img" />

                    </div>
                    <p className="font-poppins pt-3 text-gray-400 text-center text-[10px]">Tools</p>
                </div>
                <div>
                    <div className=" font-poppins text-[8px] h-[49px] w-[65px] rounded-[10px]  bg-white flex justify-center items-center">
                        <img className="h-[37px]  w-[33px]  object-cover" src="https://i.ibb.co/rfk7QLJ/Kids-1-removebg-preview.webp" alt="kids img" />

                    </div>
                    <p className="font-poppins pt-3 text-gray-400 text-center text-[10px]">Baby Kids</p>
                </div>
            </div>
        </div>

    );
};

export default Instraction;