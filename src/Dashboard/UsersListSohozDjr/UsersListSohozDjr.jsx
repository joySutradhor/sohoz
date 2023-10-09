
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SearchButton from '../../Client/Components/SearchButton/SearchButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
// import { Swal } from 'sweetalert2';
import Swal from 'sweetalert2';




export default function UsersListSohozDjr() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Set the default severity


    const { data, refetch } = useQuery(["users"], async () => {
        const res = await fetch("http://localhost:5000/users")
        return res.json()

    })
    console.log(data)
    const handleMakeAdmin = (_id, name) => {
        console.log(_id)
        fetch(`http://localhost:5000/users/admin/${_id}`, {
            method: "PATCH"
        })

            .then(res => res.json())
            .then(Userdata => {
                refetch()
                console.log(Userdata)
                if (Userdata.modifiedCount) {
                    setSnackbarMessage(`${name} is now an admin`);
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                }
            })
    }
    const handleMakeManager = (_id, name) => {
        console.log(_id)
        fetch(`http://localhost:5000/users/manager/${_id}`, {
            method: "PATCH"
        })

            .then(res => res.json())
            .then(Userdata => {
                refetch()
                console.log(Userdata)
                if (Userdata.modifiedCount) {
                    setSnackbarMessage(`${name} is now a manager`);
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                }
            })
    }

    const handleDelete = (_id, name) => {
        console.log(_id, name);
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users/${_id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                `User ${name} has been deleted.`,
                                'success'
                            );
                        }
                    });
            }
        });
    };




    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <CssBaseline />
            <Paper square sx={{ backgroundColor: "#F3F6FC", height: "100vh", border: "none" }} >

                <ListSubheader sx={{ width: "full", padding: "0", paddingTop: "0" }}>
                    <SearchButton></SearchButton>
                </ListSubheader>

                <List sx={{ mb: 0, paddingTop: "0", }}>
                    {data?.map(({ email, name, url, _id, role, phone }) => (
                        <div key={_id}>
                            <ListItem className='bg-white shadow-sm rounded-sm  my-2  '>
                                <ListItemAvatar>
                                    <Avatar alt="Profile Picture" src={url} />
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <span className='flex items-center space-x-4'>
                                        <span>{name}</span>
                                        <span className='text-gray-400 text-sm'>{role}</span>
                                    </span>
                                } secondary={

                                    <span className='text-gray-400 '>
                                        <span className='pt-1 flex flex-col'>{email}</span>
                                        <span>{phone}</span>
                                    </span>
                                } />
                                <div className='ml-[150px] space-y-2'>
                                    <button onClick={() => handleMakeAdmin(_id, name)}><AdminPanelSettingsOutlinedIcon sx={{ color: "#4D88A8" }}></AdminPanelSettingsOutlinedIcon></button>
                                    <button onClick={() => handleMakeManager(_id, name)}><ManageAccountsOutlinedIcon sx={{ color: "#4D88A8" }} ></ManageAccountsOutlinedIcon></button>
                                    <button onClick={() => handleDelete(_id, name)}><DeleteOutlineOutlinedIcon sx={{ color: "#F88379" }} ></DeleteOutlineOutlinedIcon></button>
                                </div>
                            </ListItem>
                        </div>
                    ))}
                </List>
            </Paper>
            {/* Snackbar component */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000} // Adjust the duration as needed
                onClose={handleCloseSnackbar}
            >
                <Alert severity={snackbarSeverity} onClose={handleCloseSnackbar}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}