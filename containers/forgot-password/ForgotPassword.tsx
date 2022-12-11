import React, {useState} from 'react'
import {Box, Container, Typography, Paper, Button, TextField, Dialog, Link, Card, Alert} from '@mui/material'
import classes from './style'
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {

  const {sendPasswordResetToEmail} = useAuth()
  const [showLoginSuccessDialog, setShowLoginSuccessDialog] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')

  const handleCloseLoginSuccessDialog = () => {
    setShowLoginSuccessDialog(showLoginSuccessDialog => !showLoginSuccessDialog)
  }

  const handleUpdateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const textValue = event?.target?.value
    setEmail(textValue)
  }

  const handleSendToEmail = async () => {
    setError(false)
    setSuccess(false)
    try {
      await sendPasswordResetToEmail(email).then(() => {
        setSuccess(true)
      }).catch((error: any) => {
        if(error.code === 'auth/missing-email'){
          setErrorMessage('Email does not exist.')
          setError(true)
        }
      })
    } catch (error: any) {
      setErrorMessage('Please check your internet connection.')
      setError(true)
    }
  }

  return (
    <Container sx={classes.loginContainer}>
        <Box sx={classes.backgroundImageContainer}>
            <Paper sx={classes.backgroundImageContainerBackdrop}>

            </Paper>
        </Box>
        <Dialog
            open={showLoginSuccessDialog}
            sx={classes.loginSuccessDialog}
        >
            Password incorrect
            <Button onClick={handleCloseLoginSuccessDialog}>Cancel</Button>
        </Dialog>
        <Card sx={classes.fieldContainer}>
            <Typography variant="h5" color="initial" textAlign='center' sx={classes.headerText}>
                Techno Library
            </Typography>
            <Typography variant='h6'>
                Forgot Password
            </Typography>
            {
              error && <Alert severity='error'>{errorMessage}</Alert>
            }
            {
              success && <Alert severity='success'>Reset password link has been sent to your email</Alert>
            }
            <TextField id="outlined-basic" label="Email" variant="outlined" type='text' sx={classes.inputTextField} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUpdateEmail(event)}/>
            <Button variant='contained' sx={classes.sendButton} onClick={handleSendToEmail}>
                Send via email
            </Button>
            <Link href='/login'>Sign in</Link>
        </Card>
    </Container>
  )
}

export default ForgotPassword