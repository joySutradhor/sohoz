import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Providers/Providers";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/users/role/${user?.email}`);
            const data = await response.json();
            return data;
        };

        fetchData().then(data => setIsAdmin(data.role));
    }, [user]);

    console.log(isAdmin);

    return (
        <div>
           
            {
                // console.log('enter')

                isAdmin === "user" && <p>this is user </p>

            }
            {
                isAdmin === "admin" && <p>this is admin dassss</p>
            },

            {
                isAdmin === "manager" && <p>this is manager dassss</p>

            }
        </div>
    );
};

export default Dashboard;