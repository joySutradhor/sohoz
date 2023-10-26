// import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import DirectionsBikeOutlinedIcon from '@mui/icons-material/DirectionsBikeOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../Client/Providers/Providers';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const ListItems = () => {

  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/users/role/${user?.email}`);
      const data = await response.json();
      console.log(data)
      return data;
    };

    fetchData().then(data => setIsAdmin(data.role));
  }, [user]);

  console.log(isAdmin);



  return (

    <>

      <Link to="/">
        <ListItemButton>
          <ListItemIcon>
            <AddHomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </Link>

      {
        isAdmin === "admin" && <Link to="/usersListSohozDjr">
          <ListItemButton>
            <ListItemIcon>
              <Groups2OutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Users List" />
          </ListItemButton>
        </Link>
      }

      {
        (isAdmin === "admin" || isAdmin === "manager") && <Link to="/customerDataSohozDjr">
          <ListItemButton>
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
        </Link>
      }

      {
        (isAdmin === "admin" || isAdmin === "manager") && <Link to="/usersSohozDjr">
          <ListItemButton>
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="Post Order" />
          </ListItemButton>
        </Link>
      }

      {
        (isAdmin === "admin" || isAdmin === "manager") && <Link to="/collectDataSohozDjr">
          <ListItemButton>
            <ListItemIcon>
              <PersonAddAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Collect Data" />
          </ListItemButton>
        </Link>
      }

      {
        isAdmin === "rider" && <Link to="/ridersOrderrdersSohozDjr">
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Your Orders" />
          </ListItemButton>
        </Link>
      }

      {
        (isAdmin === "admin" || isAdmin === "manager" || isAdmin === "rider") && <Link to="/CostDetailsSohozDjr">
          <ListItemButton>
            <ListItemIcon>
              <CurrencyExchangeIcon />
            </ListItemIcon>
            <ListItemText primary="Today Cost" />
          </ListItemButton>
        </Link>
      }

      {
        isAdmin === "rider" && <Link to="/ridersAcceptedOrdersSohozDjr">
          <ListItemButton>
            <ListItemIcon>
              <DirectionsBikeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Accepted Orders" />
          </ListItemButton>
        </Link>
      }

      {
        (isAdmin === "admin" || isAdmin === "manager") && <Link to="/SummerySohozDjr">
        <ListItemButton>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Summary" />
          </ListItemButton>
        </Link>

      }

      {
        (isAdmin === "user") && <Link to="/myprofileSohozDjr">
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItemButton>
        </Link>
      }

      {
        (isAdmin === "user") && <Link to="/ordersStatusSohozDjr">
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders Status" />
          </ListItemButton>
        </Link>
      }

      {
        (isAdmin === "user") && <Link to="/trackRiderSohozDjr">

          <ListItemButton>
            <ListItemIcon>
              <DirectionsBikeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Track Rider" />
          </ListItemButton>
        </Link>
      }






      <Divider></Divider>
      {
        (isAdmin == "admin" || isAdmin == "manager") &&
        <ListItemButton>
          <ListItemIcon>
            <AddTaskOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Task" />
        </ListItemButton>

      }
      {
        (isAdmin == "admin" || isAdmin == "manager") &&
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Collected List" />
        </ListItemButton>
      }
    </>
  )
}


