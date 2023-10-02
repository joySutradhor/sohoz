import Footer from "../Shared/Footer";
import Header from "../Shared/Header";
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <Outlet />
            <Footer></Footer>
            
        </div>
    );
};

export default Main;