import { SearchOutlined } from '@mui/icons-material'
import { Box, Typography, Menu, MenuItem, IconButton, Divider, setRef, CircularProgress} from '@mui/material'
import React from 'react'
import AdminStaffList from '../admin-staff-list'
import AdminList from '../admin-list'
import {classes, userMenuPaperProps} from './style'
import AdminApprovalRequestList from '../admin-approval-request-list'
import InfoIcon from '@mui/icons-material/Info';
import { IMAGES } from '../../utils/app_constants'
import useGetAdminData from '../../hooks/useGetAdminData'
import { useAuth } from '../../context/AuthContext'
import { usePreviousMonthDisabled } from '@mui/x-date-pickers/internals/hooks/date-helpers-hooks'

const Admins = () => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [adminStatus, setAdminStatus] = React.useState<string>('admin')
  const [refresh, setRefresh] = React.useState<boolean>(false)
  const open = Boolean(anchorEl);

  const {isLoading, headAdminList, adminList, staffList, staffRequestList } = useGetAdminData({refresh})
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
  }, [user.uid, getAdminStatus])

  const handleRefreshAdminList = async () => {
    setRefresh(prevState => !prevState)
  }

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
            {
              isLoading && (<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '20vh', width: '100%', gap: 2}}>
              <CircularProgress sx={{height: '40vh', width: '100%'}}/>
              <Typography>Please wait...</Typography>
             </Box>)
            }

            {
              !isLoading && (<>
                <Box sx={classes.adminListContainer}>
                {
                  headAdminList.map((data: any, index: number) => {
                    return <AdminList key={index} fullname={data.displayName} adminId={data.docId} adminType={data.status}  adminProfileImage={data.profileURL} adminStatus={adminStatus} handleRefreshAdminList={handleRefreshAdminList}/>
                  })
                }
                {
                  adminList.map((data: any, index: number) => {
                    return <AdminList key={index} fullname={data.displayName} adminId={data.docId} adminType={data.status}  adminProfileImage={data.profileURL} adminStatus={adminStatus} handleRefreshAdminList={handleRefreshAdminList}/>
                  })
                }
              </Box>

              <Box sx={classes.adminListContainer}>
                <Typography textAlign={'center'} variant='h6' fontWeight={'bold'}>Staff ({staffList.length})</Typography>
                {
                  staffList.map((data: any, index: number) => {
                    return <AdminStaffList key={index} fullname={data.displayName} adminId={data.docId} adminType={data.status} adminProfileImage={data.profileURL} adminStatus={adminStatus} handleRefreshAdminList={handleRefreshAdminList}/>
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
                    return <AdminApprovalRequestList key={index} fullname={data.displayName} adminId={data.docId} adminType={data.status}  adminProfileImage={data.profileURL} adminStatus={adminStatus} handleRefreshAdminList={handleRefreshAdminList}/>
                  })
                }
                {
                  !hasStaffRequestList && (<Typography>No staff request...</Typography>)  
                }
              </Box>``
              </>)
            }
       </Box>
    </Box>
  )
}

export default Admins