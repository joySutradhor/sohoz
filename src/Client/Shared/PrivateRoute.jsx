/* eslint-disable  */

import { useContext } from "react";
import { AuthContext } from "../Providers/Providers";
import { Navigate, useLocation } from "react-router-dom";
import Loading from './../Components/Loading/Loading';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location =  useLocation() ;
    if (loading) {
        return <Loading></Loading>
    }

    if(user) {
            return children ;
    }
    return <Navigate to="/LoginPage" state={{from: location}} replace></Navigate>

};

export default PrivateRoute; 