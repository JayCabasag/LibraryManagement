import React from 'react'
import { CircularProgress, Box, Typography } from '@mui/material';

interface AuthenticatingLoadingProps {
  message: string
}

const  AuthenticatingLoading = ({message = 'Please wait...'}: AuthenticatingLoadingProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '100vh', width: '100%', justifyContent: 'center'}}>
        <CircularProgress aria-label='loading'/>
        <Typography>{message}</Typography>
    </Box>
  )
}

export default AuthenticatingLoading