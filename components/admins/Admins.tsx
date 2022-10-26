import { SearchOutlined } from '@mui/icons-material'
import { Box, Typography, Menu, MenuItem, IconButton, Divider} from '@mui/material'
import React from 'react'
import AdminStaffList from '../admin-staff-list'
import AdminList from '../admin-list'
import {classes, userMenuPaperProps} from './style'
import AdminApprovalRequestList from '../admin-approval-request-list'
import InfoIcon from '@mui/icons-material/Info';
import { IMAGES } from '../../utils/app_constants'

const Admins = () => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={classes.adminMainContainer}>
       <Typography variant='h2' display={'flex'} alignItems='center' gap={1}>
            Admins
            <IconButton onClick={handleClick}>
              <InfoIcon />
            </IconButton>
       </Typography>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={userMenuPaperProps}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              > 
                <Box sx={{padding: 2}}>
                  <Typography variant='h6' fontWeight={'bold'}>Admin</Typography>
                  <Typography>Admin can edit their fellow admin rank, <br /> approve and decline staff request,  <br /> edit and delete existing staffs. <br /> Only added by developers,  <br /> All functionalities on dashboard</Typography>
                </Box>
                <Divider />
                <Box sx={{padding: 2}}>
                  <Typography variant='h6' fontWeight={'bold'}>Staff</Typography>
                  <Typography>Added by admin, <br />cannot approve or decline staff request,  <br />  Added by admins/developers,  <br /> Manage books.</Typography>
                </Box>
              </Menu>
       <Box sx={classes.adminBodyContainer}>
          
          <Box sx={classes.adminListContainer}>
            {
              [1, 2, 3].map((data, index) => {
                return <AdminList key={index} fullname='fullname' adminId='#43434' adminType='admin'  adminProfileImage={IMAGES.NO_IMAGE_AVAILABLE}/>
              })
            }
          </Box>

          <Box sx={classes.adminListContainer}>
            <Typography textAlign={'center'} variant='h6' fontWeight={'bold'}>Staff (3)</Typography>
            {
              [1, 2, 3].map((data, index) => {
                return <AdminStaffList key={index} fullname='fullname' adminId='#43434' adminType='staff' adminProfileImage={IMAGES.NO_IMAGE_AVAILABLE}/>
              })
            }
          </Box>

          <Box sx={classes.adminListContainer}>
            <Typography textAlign={'center'} variant='h6'  fontWeight={'bold'}>Staff Approval Request (3)</Typography>
            {
              [1, 2, 3].map((data, index)=> {
                return <AdminApprovalRequestList key={index} fullname='fullname' adminId='#43434' adminType='Requesting'  adminProfileImage={IMAGES.NO_IMAGE_AVAILABLE}/>
              })
            }
          </Box>
       </Box>
    </Box>
  )
}

export default Admins