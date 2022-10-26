import React, {useState} from 'react'
import {Box, Container, Typography, Paper, Button, TextField, Dialog, Link, Card} from '@mui/material'
import classes from './style'
import { useRouter } from 'next/router';

const ForgotPassword = () => {

  const [showLoginSuccessDialog, setShowLoginSuccessDialog] = useState<boolean>(false)

  const router = useRouter()  
  const goToRegister = () => {
    router.push('/register')
  }

  const handleLogin = () => {
    router.push('/homepage')
  }

  const handleCloseLoginSuccessDialog = () => {
    setShowLoginSuccessDialog(showLoginSuccessDialog => !showLoginSuccessDialog)
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
                TCU Mobile Library
            </Typography>
            <Typography variant='h6'>
                Forgot Password
            </Typography>
            <TextField id="outlined-basic" label="Email" variant="outlined" type='text' sx={classes.inputTextField} />
            <Button variant='contained' sx={classes.sendButton} onClick={handleLogin}>
                Send via email
            </Button>
            <Link href='/login'>Sign in</Link>
        </Card>
    </Container>
  )
}

export default ForgotPassword