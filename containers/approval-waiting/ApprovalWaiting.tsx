import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import classes from './style'
import { useAuth } from '../../context/AuthContext'
import { auth } from '../../services/firebase-config'

const ApprovalWaiting = () => {
  
  const {logout} = useAuth()

  const handleLogoutUser = async () => {
    await logout(auth)
  }

  return (
    <Box sx={classes.mainContainer}>
        <Box sx={classes.bodyContainer}>
        <Typography>Please wait for the admin to Approve your request...</Typography>
        <Button variant='outlined' onClick={handleLogoutUser}>Logout</Button>
        </Box>
    </Box>
  )
}

export default ApprovalWaiting