// import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Link } from 'react-router-dom';

const SearchButton = () => {
    const handleSearch = () => {
        console.log("Search Clicked")
    }
    return (
        <div className="md:flex">
                <div className="">

                    <div className="relative">
                        <Link to="/dashboardHomeSohozDjr"><KeyboardArrowLeftIcon className="absolute  text-gray-400 top-4 left-4"></KeyboardArrowLeftIcon></Link>
                        <input type="text" placeholder='Search Email' className=" h-14 w-full px-12  focus:outline-none hover:cursor-pointer" name="" />
                            <span onClick={handleSearch} className="absolute top-1 right-5 border-l pl-4">
                            <SearchIcon  className=" text-[#4D88A8] hover:cursor-pointer" ></SearchIcon> </span>
                    </div>
                </div>
            </div>
    );
};

export default SearchButton;