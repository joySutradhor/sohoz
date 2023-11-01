import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useQuery } from '@tanstack/react-query';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import CheckIcon from '@mui/icons-material/Check';
import Loading from '../../Client/Components/Loading/Loading';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { InputBase } from '@mui/material';
import RidersAcceptedOrdersSohozDjr from './RidersAcceptedOrdersSohozDjr/RidersAcceptedOrdersSohozDjr';
import { AuthContext } from './../../Client/Providers/Providers';

export default function RidersOrderrdersSohozDjr() {
    const { user } = useContext(AuthContext)
    const { data, refetch } = useQuery(["temporaryNewCustomer"], async () => {
        const res = await fetch("https://sohozserver.onrender.com/temporaryNewCustomer/pending");
        console.log(data)
        return res.json();
    });


    const navigate = useNavigate(); // Initialize the navigate function
    const [OrderSearch, setOrderSearch] = useState('');
    // const [noOrdersMessageVisible, setNoOrdersMessageVisible] = useState(false);

    const handleMakeAccept = (_id, name, orderId) => {
        Swal.fire({
            text: 'Accept The Order',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK , Accepted',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://sohozserver.onrender.com/temporaryNewCustomer/progress/${_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: user.email }),
                })
                    .then((res) => res.json())
                    .then((userData) => {
                        
                        refetch();
                        if (userData.modifiedCount) {
                            Swal.fire({
                                title: 'Success',
                                text: 'Accept successfully Done',
                                icon: 'success',
                            }).then(() => {
                                // Navigate to the dynamic route
                                navigate(`/completedRiderOrderSohozDjr/${orderId}`);
                            });
                        }
                    });
            }
        });
    };




    const filteredUsers = Array.isArray(data)
        ? data.filter((user) =>
            user?.orderId?.toLowerCase().includes(OrderSearch.toLowerCase())
        )
        : [];

    const handleOrderSearch = (event) => {
        setOrderSearch(event.target.value);
    };


    return (
        <>
            <CssBaseline />
            <Paper square sx={{ backgroundColor: "#F5F5F5", height: "100vh", border: "none" }} >
                <ListSubheader sx={{ width: "full", padding: "0", paddingTop: "0" }}></ListSubheader>
                <div className="mb-2">
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "full" }}
                    >
                        <Link to="/dashboardHomeSohozDjr">
                            <IconButton sx={{ p: '10px' }} aria-label="menu">
                                <ArrowBackIosNewOutlinedIcon />
                            </IconButton>
                        </Link>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <InputBase
                            value={OrderSearch}
                            onChange={handleOrderSearch}
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Order ID"
                            inputProps={{ 'aria-label': 'Search Order' }}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>
                <h5 className='text-gray-400 font-roboto ml-2 pt-2'>Your Pending Orders</h5>
                <List sx={{ mb: 0, paddingTop: "0" }}>
                    {Array.isArray(filteredUsers) ? (
                        filteredUsers.map(({ orderId, brandName, _id, status }) => (
                            <div key={_id}>
                                <ListItem className='bg-white shadow-sm rounded-sm my-2'>
                                    <ListItemText primary={
                                        <span className='flex items-center space-x-4'>
                                            <span>{brandName}</span>
                                            <span className='text-red-400 text-sm '>{status}</span>
                                        </span>
                                    } secondary={
                                        <span className='text-gray-400 '>
                                            <span className='pt-1 flex flex-col'>Order Id: {orderId}</span>
                                        </span>
                                    } />
                                    <div className='flex flex-col space-y-2 '>
                                        {/* <Link to={`/completedRiderOrderSohozDjr/${orderId}`}>
                                            

                                        </Link> */}
                                        <button onClick={() => handleMakeAccept(_id, name, orderId)}>
                                            <CheckIcon sx={{ color: "#4D88A8" }}></CheckIcon>
                                        </button>
                                    </div>
                                </ListItem>
                            </div>
                        ))
                    ) : (
                        <div><Loading></Loading></div>
                    )}
                </List>
                <div>
                    <h5 className='text-gray-400 font-roboto ml-2'>Your incomplete Orders</h5>
                    <RidersAcceptedOrdersSohozDjr></RidersAcceptedOrdersSohozDjr>
                </div>
            </Paper>
        </>
    );
}
