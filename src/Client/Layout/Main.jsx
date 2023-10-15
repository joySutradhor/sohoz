import Footer from "../Shared/Footer";
import Header from "../Shared/Header";
import { Outlet, useLocation } from 'react-router-dom';

const Main = () => {
  const location = useLocation();

  // Define an array of pathnames where you want to hide the Header and Footer.
  const pathsToHideHeaderFooter = ['/loginPage', '/usersListSohozDjr', "/collectDataSohozDjr", "/completedRiderOrderSohozDjr", "/usersSohozDjr", '/registerPage', '/updateProfile', "/dashboardHomeSohozDjr", "/ridersOrderrdersSohozDjr"];

  // Check if the current pathname is in the array of paths to hide Header and Footer.
  const shouldHideHeaderFooter = pathsToHideHeaderFooter.includes(location.pathname) || location.pathname.includes("/completedRiderOrderSohozDjr");

  return (
    <div className="bg-[#F5F5F5]">
      {!shouldHideHeaderFooter && <Header />}
      <Outlet />
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
};

export default Main;


  