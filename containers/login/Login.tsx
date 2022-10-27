import React, {useState} from 'react'
import {Box, Container, Typography, Paper, Button, TextField, Dialog, Link, Card, CardContent, CardActions, CardHeader, Divider} from '@mui/material'
import classes from './style'
import { useRouter } from 'next/router';
import { COLORS } from '../../utils/app_constants';

const Login = () => {

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

        <Card sx={classes.loginCardContainer}>
              <CardContent>
                <Typography variant='h2' textAlign={'center'} mb={3} color={COLORS.RED}>TCU Mobile Library</Typography>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 2}}>
                  <TextField id="outlined-basic" label="Username / Employee No." variant="outlined" type='text' sx={classes.inputTextField} />
                  <TextField id="outlined-basic" label="Password" variant="outlined" type='password' sx={classes.inputTextField}/>
                </Box>
                <Box  sx={classes.actionButtonContainer}>
                  <Button size="large" variant='contained' fullWidth sx={classes.loginButton} onClick={handleLogin}>Login</Button>
                  <Divider />
                  <Button size="large" variant='outlined' fullWidth  sx={{padding: '10px 0'}} onClick={goToRegister}>Register</Button>
                </Box>
                <Link href='/forgot-password'>Forgot password</Link>
              </CardContent>
            </Card>
    </Container>
  )
}

export default Login