import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import CallModal from '../Components/CallModal/CallModal';




const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function Footer() {


  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0  , background: "white" }}>
        {/* Render all menu icon  */} 
        {/* Gap 4 means space vertical in menu icon  */}
        <Toolbar className='pt-1 gap-x-4'>
          <IconButton color="inherit" sx={{ mr: 1 , color: "#777" }} aria-label="open drawer">
            <Link to="/"> <AddHomeOutlinedIcon></AddHomeOutlinedIcon> </Link>
          </IconButton>
          <IconButton color="inherit" sx={{ mr: 1 , color: "#777" }} aria-label="open drawer">
            <Link to="/"> <DashboardOutlinedIcon></DashboardOutlinedIcon> </Link>
          </IconButton>
          <StyledFab  aria-label="add" sx={{ background: "white" }}>
            <CallModal></CallModal>
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          
          <IconButton sx={{ mr: 1 , color: "#777" }} color="inherit">
            <Badge badgeContent={0} color="error">
              <Link to=""><AddShoppingCartOutlinedIcon /></Link>
            </Badge>
          </IconButton>
          <IconButton sx={{ mr: 1 , color: "#777" }} color="inherit">
            <Link to=""><Person3OutlinedIcon /></Link>
          </IconButton>

        </Toolbar>

      </AppBar>
    </React.Fragment>
  );
}