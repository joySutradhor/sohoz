/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../Providers/Providers";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location =  useLocation() ;
    if (loading) {
        return <div className='grid grid-cols-1 absolute gap-2 top-[50%] left-[40%]'>
            <progress className="progress progress-info w-56" value="40" max="100"></progress>
            <progress className="progress progress-info w-56" value="70" max="100"></progress>
            <progress className="progress progress-info w-56" value="100" max="100"></progress>
        </div>
    }

    if(user) {
            return children ;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>

};

export default PrivateRoute; 