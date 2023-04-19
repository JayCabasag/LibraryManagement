import React, {useState} from 'react'
import {Box, Container, Typography, Paper, Button, TextField, Link, Alert} from '@mui/material'
import classes from './style'
import { IMAGES } from '../../utils/app_constants'
import Image from 'next/image'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { storage } from '../../services/firebase-config'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from '../../context/AuthContext'
import { firebaseAuthMessageConverter } from '../../utils/helpers'

const Register = () => {
    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [profileImage, setProfileImage] = useState<string>(IMAGES.PROFILE_IMAGE_NOT_AVAILABLE)
    const [uploadProfileIMageProgress, setUploadProfileIMageProgress] = useState<Number>(0)
    const [userData, setUserData] = useState<any>({})
    const {signup, user, updateUserProfile, addAdminCredentialToDatabase} = useAuth()
    const [success, setSuccess] = useState<boolean>(false)
    const [successMessage, setSuccessMessage] = useState<string>('')
    const [inProgress, setInProgress] = useState<boolean>(false)
    const [inProgressMessage, setInProgressMessage] = useState('Please wait...')

    const handlePickImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {

       if(event.target.files){
        let imageFile = event.target.files[0] as File
        const metadata = {
            contentType: 'image/jpeg'
        };

        const storageRef = ref(storage, 'images/' + imageFile.name);
        const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);

        uploadTask.on('state_changed',
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProfileIMageProgress(progress as number)
                        switch (snapshot.state) {
                        case 'paused':
                            break;
                        case 'running':
                            break;
                        }
                    }, 
                    (error) => {
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                        }
                    }, 
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setProfileImage(downloadURL as string)
                        });
                    }
                );
       } 
    }
 
  const signUpUserWithGoogle = async () => {
    const displayName = userData?.displayName as string ?? ''
    const email = userData?.email as string ?? ''
    const password = userData?.retypePassword as string ?? ''
    const profileURL = profileImage

    await signup(email, password)
    .then((response: any) => {
        updateUserProfile(displayName, profileURL)
        .then((updateResponse: any) => {
            let userDetails = response.user
            addAdminCredentialToDatabase(userDetails.uid, userDetails.email, userDetails.displayName, userDetails.photoURL).then((response: any) => {
                setInProgress(false)
                setSuccessMessage('Account has been created successfully.')
                setSuccess(true)
            }).catch((error: any) => {
                console.log(error)
                const firebaseMessage = firebaseAuthMessageConverter(error.code)
                setInProgress(false)
                setErrorMessage(firebaseMessage)
                setError(true)
            })
        }).catch((error: any )=> {
            const firebaseMessage = firebaseAuthMessageConverter(error.code)
            setInProgress(false)
            setErrorMessage(firebaseMessage)
            setError(true)
        })
    })
    .catch((error: any) => {
        const firebaseMessage = firebaseAuthMessageConverter(error.code)
        setInProgress(false)
        setErrorMessage(firebaseMessage)
        setError(true)
        
    })
    
  } 

  const handleSignUpUser = async () => {
    
    setError(false)
    setSuccess(false)
    setInProgress(true)
    setInProgressMessage('Signing in...Please wait')

    if(profileImage === IMAGES.PROFILE_IMAGE_NOT_AVAILABLE){
        setErrorMessage('Please add profile photo')
        setError(true)
        setInProgress(false)
        return
    }
    if(userData.displayName === ''){
        setErrorMessage('Please add your name')
        setError(true)
        setInProgress(false)
        return
    }
    if(userData.email === ''){
        setErrorMessage('Please add your email address')
        setError(true)
        setInProgress(false)
        return
    }
    if(userData.password === ''){
        setErrorMessage('Please add your password')
        setError(true)
        setInProgress(false)
        return
    }
    if(userData?.password?.length <= 7){
        setErrorMessage('Make sure your password containes atleast 8 letters')
        setError(true)
        setInProgress(false)
        return
    }

    if(userData.retypePassword === ''){
        setErrorMessage('Please retype your password')
        setError(true)
        setInProgress(false)
        return
    }

    if(userData.retypePassword != userData.password){
        setErrorMessage('Retype password dont match')
        setError(true)
        setInProgress(false)
        return
    }

    signUpUserWithGoogle()
  }

  const handleUpdateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
        ...userData,
        displayName: event.currentTarget.value
    })
  }
  const handleUpdateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
        ...userData,
        email: event.currentTarget.value
    })
  }
  const handleUpdatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
        ...userData,
        password: event.currentTarget.value
    })
  }

  const handleUpdateRetypePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
        ...userData,
        retypePassword: event.currentTarget.value
    })
  }

  return (
    <Container sx={classes.signUpContainer}>
        <Box sx={classes.backgroundImageContainer}>
            <Paper sx={classes.backgroundImageContainerBackdrop}>
            </Paper>
        </Box>
        <Box sx={classes.fieldContainer}>
            <Typography variant="h5" color="initial" textAlign='center' sx={classes.headerText}>
                Techno Library
            </Typography>
            <Typography variant='h6'>
                Register Admin
            </Typography>
            <Alert severity="warning">Note: Registration for admin needs an approval.</Alert>
                 <Box sx={{display: 'flex', flexDirection: 'row', gap: 1, marginBottom: 2, width: '100%'}}>
                  <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 1, flex: 1}}>
                    <img src={profileImage} alt='Profile' width={150} height={150} style={{borderRadius: '50%'}}/>
                        <Button startIcon={<CloudUploadIcon />} component='label' variant='outlined'>
                            <Typography>
                            {
                            uploadProfileIMageProgress === 0 && (
                                'UPLOAD PROFILE'
                            )
                            }
                            {
                            uploadProfileIMageProgress === 100 && (
                                'UPLOAD PROFILE'
                            )
                            }
                            {
                                uploadProfileIMageProgress <= 99 && uploadProfileIMageProgress > 0 && (
                                    `UPLOADING ${uploadProfileIMageProgress.toFixed()}%`
                                )
                            }
                            </Typography>
                        <input hidden accept="image/*" type="file" onChange={handlePickImageFile}/>
                        </Button>
                  </Box>
                  
                  <Box sx={{display: 'flex', flexDirection: 'column', flex: 1, gap: 1}}>
                    <TextField 
                        id="name" 
                        label="Name" 
                        variant="outlined" 
                        type='text' 
                        sx={classes.inputTextField}
                        onChange={handleUpdateName}
                    />
                    <TextField 
                        id="email" 
                        label="Email" 
                        variant="outlined" 
                        type='text' 
                        sx={classes.inputTextField}
                        onChange={handleUpdateEmail}
                    />
                    <TextField 
                        id="password" 
                        label="Password" 
                        variant="outlined" 
                        type='password' 
                        sx={classes.inputTextField} 
                        onChange={handleUpdatePassword}
                    />
                    <TextField 
                        id="retype-password" 
                        label="Re-type Password" 
                        variant="outlined" 
                        type='password' 
                        sx={classes.inputTextField} 
                        onChange={handleUpdateRetypePassword}
                    />
                  </Box>
                </Box>
            {
                error && (
                <Alert severity="error">{errorMessage}</Alert>
                )
            }
            {
                success && (
                <Alert severity="success">{successMessage}</Alert>
                )
            }
            
            {
                inProgress && (
                <Alert severity="info">{inProgressMessage}</Alert>
                )
            }
            <Button variant='outlined' sx={classes.signUpButton} onClick={handleSignUpUser}>
                Sign Up
            </Button>
            <Typography textAlign='center'>Already have an account ?  <Link href='/login'>Sign in</Link> </Typography>
        </Box>
    </Container>
  )
}

export default Register