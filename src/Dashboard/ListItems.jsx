import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import DirectionsBikeOutlinedIcon from '@mui/icons-material/DirectionsBikeOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
// import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
// import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
// import PropaneTankOutlinedIcon from '@mui/icons-material/PropaneTankOutlined';
// import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import { Link } from 'react-router-dom';
// import { Divider } from '@mui/material';

export const ListItems = (
  <React.Fragment>

    <Link to="/">
      <ListItemButton>
        <ListItemIcon>
          <AddHomeOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>

    <ListItemButton>
      <ListItemIcon>
        <Groups2OutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Users List" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <PeopleOutlineOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <PersonAddAltOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Collect Data" />
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
    {/* <ListItemButton>
      <ListItemIcon>
        <QuestionAnswerOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="User Feedback" />
    </ListItemButton> */}


  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Stay Up to Date 
    </ListSubheader> */}
    <ListItemButton>
      <ListItemIcon>
        <AddTaskOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Task" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <CampaignOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Update Rate" />
    </ListItemButton>

    {/* <ListItemButton>
      <ListItemIcon>
        <AddPhotoAlternateOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Add Success" />
    </ListItemButton> */}
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Collected List" />
    </ListItemButton>
    {/* <Divider/> */}
    {/* <ListItemButton>
      <ListItemIcon>
        <PropaneTankOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Add Cylinder" />
    </ListItemButton> */}

    {/* <ListItemButton>
      <ListItemIcon>
        <HourglassBottomOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Comming Soon .." />
    </ListItemButton> */}

  </React.Fragment>
);
