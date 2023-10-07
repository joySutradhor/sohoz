import  { useRef , useState } from 'react';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

function CallUs() {
    const primaryPhoneNumber = '01627505755';
    const secondaryPhoneNumber = '01627554545';

    const primaryPhoneRef = useRef(null);
    const secondaryPhoneRef = useRef(null);

    const [isCopy , setIsCopy] = useState(false)
    const [isSecondaryCopy , setIsSecondaryCopy] = useState(false)


    const handleCopyClick = (phoneNumberRef) => {
        if (phoneNumberRef.current) {
            phoneNumberRef.current.select();
            document.execCommand('copy');
            setIsCopy(true)
            // You can provide user feedback here (e.g., show a message)
        }
    };
    const handleCopyClickSecondary = (phoneNumberRef) => {
        if (phoneNumberRef.current) {
            phoneNumberRef.current.select();
            document.execCommand('copy');
            setIsSecondaryCopy(true)
            // You can provide user feedback here (e.g., show a message)
        }
    };
    setTimeout(() => {
        setIsCopy(false)
    } , 10000)
    setTimeout(() => {
        setIsSecondaryCopy(false)
    } , 10000)

    return (
        <div>
            <div>
                <div className="mb-2 space-x-2">
                    <CallOutlinedIcon className=''></CallOutlinedIcon>
                    <a href={`tel:${primaryPhoneNumber}`} className="phone-link">
                        <span>{primaryPhoneNumber}</span>
                    </a>
                    <button onClick={() => handleCopyClick(primaryPhoneRef)}>{isCopy?"copied" : <ContentCopyOutlinedIcon></ContentCopyOutlinedIcon> }</button>
                </div>
                <div className = "space-x-2">
                    <CallOutlinedIcon></CallOutlinedIcon>
                    <a  href={`tel:${secondaryPhoneNumber}`} className="phone-link">
                        {secondaryPhoneNumber} 
                    </a>
                    <button onClick={() => handleCopyClickSecondary(secondaryPhoneRef)}>{isSecondaryCopy?"copied" : <ContentCopyOutlinedIcon></ContentCopyOutlinedIcon> }</button>
                </div>
            </div>

            {/* Hidden input elements for copying to clipboard */}
            <input
                ref={primaryPhoneRef}
                type="text"
                style={{ position: 'absolute', left: '-9999px' }}
                defaultValue={primaryPhoneNumber}
            />
            <input
                ref={secondaryPhoneRef}
                type="text"
                style={{ position: 'absolute', left: '-9999px' }}
                defaultValue={secondaryPhoneNumber}
            />
        </div>
    );
}

export default CallUs;
