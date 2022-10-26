import React, {useState} from 'react'
import {Box, Container, Typography, Paper, Button, TextField, Link} from '@mui/material'
import classes from './style'
import { IMAGES } from '../../utils/app_constants'
import Image from 'next/image'

const Register = () => {
  const [profileImage, setProfileImage] = useState<string>(IMAGES.PROFILE_IMAGE_NOT_AVAILABLE)
  return (
    <Container sx={classes.signUpContainer}>
        <Box sx={classes.backgroundImageContainer}>
            <Paper sx={classes.backgroundImageContainerBackdrop}>
            </Paper>
        </Box>
        <Box sx={classes.fieldContainer}>
            <Typography variant="h5" color="initial" textAlign='center' sx={classes.headerText}>
                TCU Mobile Library
            </Typography>
            <Typography variant='h6'>
                Register Admin
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', gap: 1}}>
                <Box sx={{display:'flex', flexDirection: 'column',  width: '100%', gap: 1}}>
                    <Box sx={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Image alt='profile' src={profileImage} width={300} height={300} style={{borderRadius: '50%'}}/>
                       <Button sx={{position: 'absolute', color: 'gray', height: 300, width: 300, borderRadius: '50%'}}>Change profile</Button>
                    </Box>
                    <TextField id="outlined-basic" label="Username / Employee No." variant="outlined" type='text' sx={classes.inputTextField} />
                </Box>

                <Box sx={{display:'flex', flexDirection: 'column',  width: '100%',  gap: 1}}>
                    <TextField id="outlined-basic" label="Firstname" variant="outlined" type='text' sx={classes.inputTextField}/>
                    <TextField id="outlined-basic" label="Middlename" variant="outlined" type='text' sx={classes.inputTextField} />
                    <TextField id="outlined-basic" label="Lastname" variant="outlined" type='text' sx={classes.inputTextField} />
                    <TextField id="outlined-basic" label="Email" variant="outlined" type='email' sx={classes.inputTextField} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" type='password' sx={classes.inputTextField}/>
                    <TextField id="outlined-basic" label="Re-type password" variant="outlined" type='password' sx={classes.inputTextField}/>
                </Box>
            </Box>

            <Button variant='outlined' sx={classes.signUpButton}>
                Sign Up
            </Button>
            <Typography textAlign='center'>Already have an account ?  <Link href='/login'>Sign in</Link> </Typography>
        </Box>
    </Container>
  )
}

export default Register