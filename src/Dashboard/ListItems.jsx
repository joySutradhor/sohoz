// import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
// import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import DirectionsBikeOutlinedIcon from '@mui/icons-material/DirectionsBikeOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
// import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
// import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
// import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
// import PropaneTankOutlinedIcon from '@mui/icons-material/PropaneTankOutlined';
// import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
// import { Divider } from '@mui/material';
import { AuthContext } from './../Client/Providers/Providers';

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

      <Link to="/usersSohozDjr">
        <ListItemButton>
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      </Link>

      <Link to="/collectDataSohozDjr">
        <ListItemButton>
          <ListItemIcon>
            <PersonAddAltOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Collect Data" />
        </ListItemButton>
      </Link>
      <Link to="/ridersOrderrdersSohozDjr">
        <ListItemButton>
          <ListItemIcon>
            <PersonAddAltOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
      </Link>

      <ListItemButton>
        <ListItemIcon>
          <CurrencyExchangeIcon />
        </ListItemIcon>
        <ListItemText primary="Today Cost" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <DirectionsBikeOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Track Rider" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Summary" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders List" />
      </ListItemButton>

      <Divider></Divider>
      <ListItemButton>
        <ListItemIcon>
          <AddTaskOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Task" />
      </ListItemButton>

      {/* <ListItemButton>
          <ListItemIcon>
            <CampaignOutlinedIcon />
          </ListItemIcon>
        <ListItemText primary="Update Rate" />
        </ListItemButton> */}
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Collected List" />
      </ListItemButton>
    </>
  )
}


