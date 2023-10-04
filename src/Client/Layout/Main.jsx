import Footer from "../Shared/Footer";
import Header from "../Shared/Header";
import { Outlet } from 'react-router-dom';

const Main = () => {
    // const noHeaderFooter = location.pathname.includes('login')||location.pathname.includes('register')||location.pathname.includes('updateProfile') 
    return (
        <div>
            
            <Header></Header>
            <Outlet />
            <Footer></Footer>
            
        </div>
    );
};

export default Main;