import Banner from "./Banner/Banner";
import CustomerFaq from "./Customer/CustomerFaq";
import GasSection from "./GasSection/GasSection";
import Instraction from "./Instraction/Instraction";
// import Test from "./Test";

const Home = () => {
    return (
        <div >
            <Banner></Banner>
            {/* <Marquee></Marquee> */}
            <Instraction></Instraction>
            <GasSection></GasSection>
            <CustomerFaq></CustomerFaq>
            {/* <Test></Test> */}
            
        </div>
    );
};

export default Home;