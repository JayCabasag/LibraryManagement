import React, {ChangeEvent, useState} from 'react'
import {Box, Container, Typography, Paper, Button, TextField, Dialog, Link, Card, CardContent,Alert, Divider} from '@mui/material'
import classes from './style'
import { useRouter } from 'next/router';
import { COLORS } from '../../utils/app_constants';
import { useAuth } from '../../context/AuthContext';
import {firebaseAuthMessageConverter} from '../../utils/helpers'

interface UserDataType {
  email: string,
  password: string
}

const Login = () => {

  const { user, login, getAdminStatus,  checkIfAdminHasDatabaseRecord } = useAuth()

  const [showLoginSuccessDialog, setShowLoginSuccessDialog] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [userData, setUserData] = useState<UserDataType>({
    email: '',
    password: ''
  })
  const [inProgress, setInProgress] = useState<boolean>(false)
  const [inProgressMessage, setInProgressMessage] = useState<string>('Please wait...')

  const router = useRouter()  
  const goToRegister = () => {
    router.push('/register')
  }

  const handleLogin = async () => {
    const {email, password} = userData

    setError(false)
    setInProgress(true)
    setInProgressMessage('Loggin you in... Please wait')
    if(email === ''){
      setErrorMessage('Please input your email/username')
      setInProgress(false)
      return setError(true)
    }

    if(password === ''){
      setErrorMessage('Please input your password')
      setInProgress(false)
      return setError(true)
    }

    if(password?.length <= 7){
      setErrorMessage('Password needs to have atleast 8 letters')
      setInProgress(false)
      return setError(true)
    }
    setError(false)
    
    try {
      await login(userData.email, userData.password)
      .then((authUser: any) => {

        // Check if admin has database data
        let admin = authUser.user
        checkIfAdminHasDatabaseRecord(admin.uid, admin.email, admin.displayName, admin.photoURL).then(() => {
          setInProgress(false)
          setErrorMessage('')
          setError(false)
          setUserData(authUser)
          getAdminStatus(admin.uid)
          router.push('/homepage')
        }).catch((firebaseError: any) => {
          const firebaseMessageText = firebaseAuthMessageConverter(firebaseError.code as string)
          setInProgress(false)
          setErrorMessage(firebaseMessageText)
        })
      })
      .catch((firebaseError: any) => {
        const firebaseMessageText = firebaseAuthMessageConverter(firebaseError.code as string)
        setInProgress(false)
        setErrorMessage(firebaseMessageText)
        setError(true)
      })
    } catch (error) {
      setInProgress(false)
      setErrorMessage('Network connection error!')
      setError(true)
    }
    
  }

  const handleCloseLoginSuccessDialog = () => {
    setShowLoginSuccessDialog(showLoginSuccessDialog => !showLoginSuccessDialog)
  }

  const handleUpdateUsernameOrEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    
    const emailInputValue = e.currentTarget.value

    setUserData({
      ...userData,
      email: emailInputValue
    })
  }

  const handleUpdatePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    const passwordInputValue = e.currentTarget.value as string
    setUserData({
      ...userData,
      password: passwordInputValue
    })
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
                <Typography variant='h2' textAlign={'center'} mb={3} color={COLORS.RED}>Techno Library</Typography>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 2}}>
                  <TextField id="email" label="Email" variant="outlined" type='text' sx={classes.inputTextField} onChange={(e: ChangeEvent<HTMLInputElement>) => {handleUpdateUsernameOrEmailInput(e)}}/>
                  <TextField id="password" label="Password" variant="outlined" type='password' sx={classes.inputTextField}  onChange={(e: ChangeEvent<HTMLInputElement>) => {handleUpdatePasswordInput(e)}}/>
                  {
                    error && (
                      <Alert severity="error">{errorMessage}</Alert>
                    )
                  }
                   {
                   inProgress && (
                      <Alert severity="info">{inProgressMessage}</Alert>
                    )
                  }
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