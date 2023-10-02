import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import DirectionsBikeOutlinedIcon from '@material-ui/icons/DirectionsBikeOutlined';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';




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
      <Paper square sx={{ pb: '50px' }}>

      </Paper>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        {/* Render all menu icon  */} 
        {/* Gap 4 means space vertical in menu icon  */}
        <Toolbar className='pt-1 gap-x-4'>
          <IconButton color="inherit" aria-label="open drawer">
            <Link to="/"> <HomeOutlinedIcon></HomeOutlinedIcon> </Link>
          </IconButton>
          <IconButton color="inherit" aria-label="open drawer">
            <Link to="/"> <PhotoLibraryOutlinedIcon></PhotoLibraryOutlinedIcon> </Link>
          </IconButton>
          <StyledFab color="secondary" aria-label="add">
            <CallOutlinedIcon></CallOutlinedIcon>
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <Link to=""><DirectionsBikeOutlinedIcon /></Link>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={1} color="error">
              <Link to=""><ShoppingCartOutlinedIcon /></Link>
            </Badge>
          </IconButton>

        </Toolbar>

      </AppBar>
    </React.Fragment>
  );
}