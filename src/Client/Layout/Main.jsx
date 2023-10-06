import Footer from "../Shared/Footer";
import Header from "../Shared/Header";
// import { Outlet } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';

const Main = () => {
    const location = useLocation();
  
    // Define an array of pathnames where you want to hide the Header and Footer.
    const pathsToHideHeaderFooter = ['/login', '/registerPage', '/updateProfile' ];
  
    // Check if the current pathname is in the array of paths to hide Header and Footer.
    const shouldHideHeaderFooter = pathsToHideHeaderFooter.includes(location.pathname);
  
    return (
      <div>
        {!shouldHideHeaderFooter && <Header />}
        <Outlet />
        {!shouldHideHeaderFooter && <Footer />}
      </div>
    );
  };
  
  export default Main;
  