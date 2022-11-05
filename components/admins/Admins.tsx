import { SearchOutlined } from '@mui/icons-material'
import { Box, Typography, Menu, MenuItem, IconButton, Divider} from '@mui/material'
import React from 'react'
import AdminStaffList from '../admin-staff-list'
import AdminList from '../admin-list'
import {classes, userMenuPaperProps} from './style'
import AdminApprovalRequestList from '../admin-approval-request-list'
import InfoIcon from '@mui/icons-material/Info';
import { IMAGES } from '../../utils/app_constants'
import useGetAdminData from '../../hooks/useGetAdminData'
import { useAuth } from '../../context/AuthContext'

const Admins = () => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [adminStatus, setAdminStatus] = React.useState<string>('admin')
  const open = Boolean(anchorEl);

  const { headAdminList, adminList, staffList, staffRequestList } = useGetAdminData()
  const {user, getAdminStatus} = useAuth()

  const hasStaffList = staffList.length > 0
  const hasStaffRequestList = staffRequestList.length > 0


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    getAdminStatus(user.uid).then((response: any) => {
      setAdminStatus(response)
    }).catch(() => {
      setAdminStatus('admin')
    })
  }, [])


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
              headAdminList.map((data: any, index: number) => {
                return <AdminList key={index} fullname={data.displayName} adminId={data.docId} adminType={data.status}  adminProfileImage={data.profileURL} adminStatus={adminStatus}/>
              })
            }
            {
              adminList.map((data: any, index: number) => {
                return <AdminList key={index} fullname={data.displayName} adminId={data.docId} adminType={data.status}  adminProfileImage={data.profileURL} adminStatus={adminStatus}/>
              })
            }
          </Box>

          <Box sx={classes.adminListContainer}>
            <Typography textAlign={'center'} variant='h6' fontWeight={'bold'}>Staff ({staffList.length})</Typography>
            {
              staffList.map((data: any, index: number) => {
                return <AdminStaffList key={index} fullname={data.displayName} adminId={data.docId} adminType={data.status} adminProfileImage={data.profileURL} adminStatus={adminStatus}/>
              })
            }
            {
              !hasStaffList && (
                <Typography>No staff...</Typography>
              )
            }
          </Box>

          <Box sx={classes.adminListContainer}>
            <Typography textAlign={'center'} variant='h6'  fontWeight={'bold'}>Staff Approval Request ({staffRequestList.length})</Typography>
            {
              staffRequestList.map((data: any, index: number)=> {
                return <AdminApprovalRequestList key={index} fullname={data.displayName} adminId={data.docId} adminType={data.status}  adminProfileImage={data.profileURL} adminStatus={adminStatus}/>
              })
            }
            {
              !hasStaffRequestList && (<Typography>No staff request...</Typography>)  
            }
          </Box>
       </Box>
    </Box>
  )
}

export default Admins