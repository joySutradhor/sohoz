import { List, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import Loading from '../../../Client/Components/Loading/Loading';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useNavigate } from 'react-router-dom';

const RidersAcceptedOrdersSohozDjr = () => {
    const [acceptedData, setAcceptedData] = useState([]);
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        // Fetch the progress data
        fetch("http://localhost:5000/temporaryNewCustomer/progress")
            .then((res) => res.json())
            .then((data) => {
                // Filter the data based on the email being "progress"
                const progressData = data.filter((item) => item.email === "joysutradhorcmt@gmail.com");
                setAcceptedData(progressData);
            });
    }, []);

    const handleMakeComplete = (orderId) => {
        navigate(`/completedRiderOrderSohozDjr/${orderId}`);
    }

    return (
        <List sx={{ mb: 0, paddingTop: "0" }}>
            {Array.isArray(acceptedData) ? (
                acceptedData.map(({ orderId, brandName, _id, status }) => (
                    <div key={_id}>
                        <ListItem className='bg-white shadow-sm rounded-sm my-2'>
                            <ListItemText primary={
                                <span className='flex items-center space-x-4'>
                                    <span>{brandName}</span>
                                    <span className='text-red-300 text-sm'>{status}</span>
                                </span>
                            } secondary={
                                <span className='text-gray-400 '>
                                    <span className='pt-1 flex flex-col'>Order Id: {orderId}</span>
                                </span>
                            } />
                            <div className='flex flex-col space-y-2 '>
                                <button onClick={() => handleMakeComplete(orderId)}>
                                    <DoubleArrowIcon sx={{ color: "#4D88A8" }}></DoubleArrowIcon>
                                </button>
                            </div>
                        </ListItem>
                    </div>
                ))
            ) : (
                <div><Loading></Loading></div>
            )}
        </List>
    );
};

export default RidersAcceptedOrdersSohozDjr;
