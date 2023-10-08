import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Client/Providers/Providers";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/users/role/${user?.email}`);
            const data = await response.json();
            console.log(data)
            return data;
        };

        fetchData().then(data => setIsAdmin(data.role));
    }, [user]);

    console.log(isAdmin);

    return (
        <div>
           
            {
                // console.log('enter')

                isAdmin === "user" && <p>this is user Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi ipsum, officiis earum similique quod ea perferendis? Deleniti quas eum commodi. Quos quas magni quam voluptatibus, tempore ea velit ratione distinctio illum dolore blanditiis, sint at facere expedita quisquam eum dicta nostrum eveniet voluptatem tempora error assumenda? Magni itaque tempora voluptatibus impedit! Accusamus eius quibusdam ipsam debitis dicta, illum quisquam velit similique ea laudantium placeat nesciunt dolores ut fugiat neque doloremque, accusantium dolore deleniti ipsa repellendus minus maxime nihil! Eveniet ducimus temporibus magni veniam ab explicabo harum, itaque excepturi nobis, dolorem perspiciatis architecto. Alias sequi maxime neque suscipit nobis voluptatibus exercitationem! </p>

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