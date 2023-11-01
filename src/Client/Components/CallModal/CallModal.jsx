

import Gif from "../../../assets/call.gif";

export default function CallModal() {
  const phoneNumber = 'tel:01331262852';

  return (
    <div>
      <a href={phoneNumber}>
        <img
          
          src={Gif}
          alt="Call button"
          width="35"
          height="50"
        />
      </a>
    </div>
  );
}