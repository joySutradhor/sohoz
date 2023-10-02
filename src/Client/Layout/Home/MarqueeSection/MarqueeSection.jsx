import Marquee from "react-fast-marquee";

const MarqueeSection = () => {
    return (
        <Marquee pauseOnHover = "true" delay = "2">
            {/* to do balance need to dynamic  */}
            <p className="text-[#1976D2] font-roboto font-medium"> 
             ৩ অক্টোবর  ২০২৩ তারিখ অনুযায়ী  ওমেরা,  বেক্সিমকো  এবং  পেট্রোম্যাক্স এর দাম <span className="text-pink-500 font-roboto font-semibold">১৪৮০ টাকা </span>এবং ডেলিভারি চার্জ  <span className="text-pink-500 font-roboto font-semibold">৩৯ টাকা </span>।   
            </p>
        </Marquee>
    );
};

export default MarqueeSection;