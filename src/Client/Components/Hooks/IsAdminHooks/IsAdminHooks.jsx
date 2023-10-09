import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../Providers/Providers";

const DashboardHooks = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/users/role/${user?.email}`);
            const data = await response.json();
            console.log(data)
            return data;
        };

      return  fetchData().then(data => setIsAdmin(data.role));
    }, [user]);
    console.log(isAdmin)
}

    export default DashboardHooks ;