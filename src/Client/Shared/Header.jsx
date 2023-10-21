import * as React from 'react';
// import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import KeyboardTabOutlinedIcon from '@mui/icons-material/KeyboardTabOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
// import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
// import KeyboardTabOutlinedIcon from '@material-ui/icons/KeyboardTabOutlined';
// import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import { AuthContext } from './../Providers/Providers';
import { useContext } from "react";
import { Link } from 'react-router-dom';
import  sohoz  from  "../../assets/sohoz.png"


export default function Header() {

  const { user, logout } = useContext(AuthContext)
 
  const handleLogout = () => {
    logout()
    .then ()
    
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      {/* item for Profile  */}
      <Link to="/profile">
      <MenuItem  sx={{ color: "#777" }}>
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="text.secondary"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      </Link>
      {/* end of profile menu item*/}


      {/* ittem for Dashboard */}
      <Link to="/dashboardHomeSohozDjr">
      <MenuItem sx={{ color: "#777" }}>
        <IconButton
          size="samll"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="text.secondary"
        >
          <DashboardOutlinedIcon></DashboardOutlinedIcon>
        </IconButton>
        <p>Dashborad</p>
      </MenuItem>
      </Link>
      {/* End Of Dashbord Item */}

      {/* item for Call now */}
      <Link>
      <MenuItem sx={{ color: "#777" }}>
        <IconButton size="small" aria-label="call now" color="text.secondary">
          <AddIcCallOutlinedIcon></AddIcCallOutlinedIcon>
        </IconButton>
        <p>Call Now</p>
      </MenuItem>
      </Link>
      {/* End Of callnow item */}
      {
        user ? <Link to="/">
        <MenuItem onClick={handleLogout} sx={{ color: "#777" }}>
          <IconButton size="small" aria-label="User Logout" color="text.secondary">
            <PowerSettingsNewOutlinedIcon></PowerSettingsNewOutlinedIcon>
          </IconButton>
          <p>LogOut</p>
        </MenuItem>
        </Link> : <Link to="/loginPage">
        
        <MenuItem sx={{ color: "#777" }}>

          {/* item for Login */}
          <IconButton size="small" aria-label="User Login " color="text.secondary">
            <KeyboardTabOutlinedIcon></KeyboardTabOutlinedIcon>
          </IconButton>
          <p>Login</p>
        </MenuItem>
        </Link>
      }
      {/* end of logout and login item */}

    </Menu>
  );

  return (
    <div className='pb-[57px]'>
      <Box sx={{ flexGrow: 1  }}>
        <AppBar position="fixed" sx={{ background: "white" , boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)'   }}>
          <Toolbar>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 1 , color: "#333333" }}
            >
              <Link to="/"> <img src={sohoz} alt="sohoz Logo" className='h-[45px]' /></Link>
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
                sx={{ mr: 1 , color: "#777" }}
              >
                <MenuOutlinedIcon></MenuOutlinedIcon>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </div>
  );
}