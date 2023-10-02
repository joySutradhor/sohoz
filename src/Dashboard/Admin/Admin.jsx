import { Outlet } from "react-router-dom";
import AppBarx from "../../Client/Shared/Header";
import Admincopy from "../../Client/Shared/Footer";
// import Admincopy from "../Dashboard/Admin/Admincopy";
// import AppBarx from "../Dashboard/Admin/AppBarx";

const Admin = () => {
    return (
        <div>
            
            <Admincopy></Admincopy>
            <Outlet></Outlet>
            <AppBarx></AppBarx>
            
        </div>
    );
};

export default Admin;