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
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Link } from 'react-router-dom';
import { Badge, Divider } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../Client/Providers/Providers';

export const ListItems = () => {

  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState("");
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://sohozserver.onrender.com/users/role/${user?.email}`);
      const data = await response.json();
      return data;
    };

    fetchData().then(data => setIsAdmin(data.role));
  }, [user]);

  useEffect(() => {
    // Fetch completed orders count from the server
    fetch('https://sohozserver.onrender.com/completedOrdersCount')
      .then((response) => response.json())
      .then((data) => {
        setCompletedOrdersCount(data?.completedOrdersCount);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
              <Badge badgeContent={completedOrdersCount} color="primary" >
              <ShoppingCartIcon />
            </Badge>
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


