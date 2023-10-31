// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import CallUs from '../CallUs/CallUs';
// import Gif from "../../../assets/call.gif"

// export default function CallModal() {
//   // const [open, setOpen] = React.useState(false);


//   const handleClickOpen = () => {
//     // setOpen(true);
//   };

//   // const handleClose = () => {
//   //   setOpen(false);
//   // };

//   return (
//     <div>
//       <img className='bg-transparent' onClick={handleClickOpen} src={Gif}  alt="This call button" width="35" height="50" />

//       {/* <Dialog

//         open={open}
//         onClose={handleClose}
//         aria-labelledby="responsive-dialog-title"
//       >
//         <DialogTitle id="responsive-dialog-title">
//           {"Please Call For Order"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             <CallUs></CallUs>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose}>
//             OK
//           </Button>
//           <Button onClick={handleClose} autoFocus>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog> */}
//     </div>
//   );
// }

import Gif from "../../../assets/call.gif";

export default function CallModal() {
  const phoneNumber = 'tel:01331262852';

  return (
    <div>
      <a href={phoneNumber}>
        <img
          
          src={Gif}
          alt="Call button"
          width="35"
          height="50"
        />
      </a>
    </div>
  );
}