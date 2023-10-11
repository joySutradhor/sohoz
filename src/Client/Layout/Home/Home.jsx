import CustomerFaq from "./Customer/CustomerFaq";
import GasSection from "./GasSection/GasSection";
import Marquee from "./MarqueeSection/MarqueeSection";

const Home = () => {
    return (
        <div >
            <Marquee></Marquee>
            <GasSection></GasSection>
            <CustomerFaq></CustomerFaq>
            
        </div>
    );
};

export default Home;