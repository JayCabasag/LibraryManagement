import { Box, Typography, Card, CardActionArea, CardActions, Tooltip, CardContent, Button, TextField, InputAdornment, IconButton, Stack, Alert} from '@mui/material'
import Image from 'next/image'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { IMAGES } from '../../utils/app_constants'
import classes from './style'
import EditIcon from '@mui/icons-material/Edit';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { db, storage } from '../../services/firebase-config'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { doc, updateDoc } from 'firebase/firestore';



const Profile = () => {

  const {user, getAdminStatus, updateUserProfile, updateUserEmail, updateUserPassword} = useAuth()
  const [showCopiedTooltip, setShowCopiedTooltip] = React.useState<boolean>(false)
  const [adminType, setAdminType] = React.useState<string>('Admin')
  const [isOnEditMode, setIsOnEditMode] = React.useState<boolean>(false)

  React.useEffect(() => {
    getAdminStatus(user.uid).then((response: any) => {
      setAdminType(response as string)
    }).catch(() => {
      setAdminType('Admin')
    })
  }, [user, getAdminStatus])

  const handleCopyUid = () => {
    navigator.clipboard.writeText(user.uid).then(()=> {
      setShowCopiedTooltip(true)
    })
  }

  const handleCloseTooltip = () => {
    setShowCopiedTooltip(false)
  }

  const handleToggleEditMode = () => {
    setIsOnEditMode(prevState => !prevState)
  }

  const [uploadProfileImageProgress, setUploadProfileImageProgress] = React.useState<number>(0)
  const [profileImage, setProfileImage] = React.useState<string>(user?.profileURL ?? IMAGES.PROFILE_IMAGE_NOT_AVAILABLE)
  const [fullname, setFullname] = React.useState<string>(user?.displayName as string || '')
  const [email, setEmail] = React.useState<string>(user.email || '')
  const [newPassword, setNewPassword] = React.useState<string>('')
  const [error, setError] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [success, setSuccess] = React.useState<boolean>(false)
  const [successMessage, setSuccessMessage] = React.useState<string>('')

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
                     setUploadProfileImageProgress(progress as number)
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

 const [openChangePasswordDialog, setOpenChangePasswordDialog] = React.useState<boolean>(false)

 const handleCloseChangePasswordDialog = () => {
    setOpenChangePasswordDialog(false)
 }

 const handleOpenChangePasswordDialog = () => {
   setOpenChangePasswordDialog(true)
 }

 const handleSaveUpdateUserProfile = async () => {
  setError(false)
  setSuccess(false)
  if(user.email !== email){
    try {
      await updateUserEmail(email).then(() => {
        setSuccess(true)
        setSuccessMessage('Updated user information successfully!.')
        setIsOnEditMode(false)
      }).catch(() => {
        setSuccess(false)
        setError(true)
        console.log(error)
        setErrorMessage('Unable to update your information')
      }) 
    } catch (error) {
        setSuccess(false)
        setError(true)
        setErrorMessage('Please check your internet connection')
        console.log(error)
    }
  }

  if(user.displayName !== fullname){
    try {
      await updateUserProfile(fullname, profileImage).then( async () => {
        const washingtonRef = doc(db, "admins", user?.uid ?? '');
        await updateDoc(washingtonRef, {
          profileURL: profileImage
        });

        setSuccess(true)
        setSuccessMessage('Updated user information successfully!.')
        setIsOnEditMode(false)
      }).catch(() => {
        setSuccess(false)
        setError(true)
        setErrorMessage('Unable to update your information')
      }) 
    } catch (error) {
        setSuccess(false)
        setError(true)
        setErrorMessage('Please check your internet connection')
    }
  }
  
 }

 const handleChangeFullname = (event: React.ChangeEvent<HTMLInputElement>) => {
  const textValue = event?.target?.value as string ?? ''
  setFullname(textValue)
 }

 const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
  const textValue = event?.target?.value  as string ?? ''
  setEmail(textValue)
 }

 const handleUpdateUserPassword = async () => {
    setError(false)
    setSuccess(false)
    if(newPassword?.length <= 6){
      setErrorMessage('Password should contain atleast 7 characters')
      setError(true)
      handleCloseChangePasswordDialog()
      return
    }
    try {
      await updateUserPassword(newPassword).then(() => {
        setSuccess(true)
        setSuccessMessage('Updated password successfully!.')
        handleCloseChangePasswordDialog()
        setIsOnEditMode(false)
      }).catch((error: any) => {
        setSuccess(false)
        setError(true)
        setErrorMessage('Unable to update your information')
        console.log(error)
        handleCloseChangePasswordDialog()
      }) 
    } catch (error) {
        setSuccess(false)
        setError(true)
        setErrorMessage('Please check your internet connection')
        handleCloseChangePasswordDialog()
    }
 }

 const handleChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
  const textValue = event?.target?.value  as string ?? ''
  setNewPassword(textValue)
 }

 return (
    <Box sx={classes.profileMainContainer}>
        <Dialog
          open={openChangePasswordDialog}
          onClose={handleCloseChangePasswordDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">
            {"Change password"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Change password
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseChangePasswordDialog}>Disagree</Button>
            <Button onClick={handleCloseChangePasswordDialog} autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openChangePasswordDialog} onClose={handleCloseChangePasswordDialog}>
        <DialogTitle>Change password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your new password and old password
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="newpassword"
            label="New password"
            type="password"
            fullWidth
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeNewPassword(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChangePasswordDialog} variant="outlined" >Cancel</Button>
          <Button onClick={handleUpdateUserPassword} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

       <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant='h2'>
              Profile
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant={isOnEditMode ? "contained" : "outlined" }  startIcon={<EditIcon />} onClick={handleToggleEditMode}>
            Edit Profile
          </Button>
        </Stack>
       </Box>
       <Box sx={classes.profileBodyContainer}>
       <Card sx={{ width: '100%', padding: 3, overflowY: 'auto', overflowX: 'hidden'}}>
          {
            error && <Alert severity='error'>{errorMessage}</Alert>
          }
          {
            success && <Alert severity='success'>{successMessage}</Alert>
          }
          <CardActionArea sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 1}}>
            <Image 
              src={profileImage} 
              alt='profile' 
              height={200}
              width={200} 
              onError={({currentTarget}) => {
                currentTarget.src = IMAGES.PROFILE_IMAGE_NOT_AVAILABLE
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h2" component="div" sx={{textTransform: 'capitalize'}}>
                {user.displayName}
              </Typography>
              <Typography sx={{textTransform: 'capitalize'}}>{adminType}</Typography>
            </CardContent>
          </CardActionArea>
            {
               isOnEditMode && 
               (<Stack direction="row" alignItems="center" spacing={2} sx={{marginTop: 1, width: 200, display: 'grid', placeItems: 'center'}}>
               <Button variant="contained" component="label" sx={{width: 200}} startIcon={<FileUploadIcon />}>
                            <Typography>
                            {
                            uploadProfileImageProgress === 0 && (
                                'UPLOAD PROFILE'
                            )
                            }
                            {
                            uploadProfileImageProgress === 100 && (
                                'UPLOAD PROFILE'
                            )
                            }
                            {
                                uploadProfileImageProgress <= 99 && uploadProfileImageProgress > 0 && (
                                    `UPLOADING ${uploadProfileImageProgress.toFixed()}%`
                                )
                            }
                            </Typography>
                 <input hidden accept="image/*" type="file" onChange={handlePickImageFile}/>
               </Button>
             </Stack>)
            }
          <CardContent sx={classes.profileCardContent}>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, flex: 1}}>
              <Typography variant='h4'>Personal Information</Typography>
                    <TextField id="outlined-basic" label="UId" variant="outlined" type='text' sx={classes.inputTextField} defaultValue={user.uid} disabled 
                      InputProps={{
                        endAdornment: (
                          <Tooltip title="Copied" placement="bottom" arrow open={showCopiedTooltip} onClose={handleCloseTooltip}>
                             <InputAdornment position='end'>
                                <IconButton onClick={handleCopyUid}>
                                  <ContentCopyIcon />
                                </IconButton>
                              </InputAdornment>
                          </Tooltip>
                        )
                      }}
                    />
                   
                    <TextField id="outlined-basic" label="Name" variant="outlined" type='text' sx={classes.inputTextField} defaultValue={user.displayName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFullname(event)} disabled={!isOnEditMode}/>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column',gap: 1, flex: 1}}>
              <Typography variant='h4'>Login Information</Typography>
              <TextField id="outlined-basic" label="Email" variant="outlined" type='email' sx={classes.inputTextField} defaultValue={email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeEmail(event)} disabled={!isOnEditMode}/>
            </Box>
          </CardContent>

          {isOnEditMode 
            && (<CardActions sx={{display: 'flex', width: '100%'}}>
            <Button size="large" variant='outlined' color="primary" onClick={handleOpenChangePasswordDialog}>
             Change password
            </Button>
            <Button size="large" variant='contained' color="primary" onClick={handleSaveUpdateUserProfile}>
              Save
            </Button>
          </CardActions>)}
        </Card>
       </Box>
    </Box>
  )
}

export default Profile