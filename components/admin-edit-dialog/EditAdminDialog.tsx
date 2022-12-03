import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Box, Typography, Button, TextField, Autocomplete, Alert} from '@mui/material'
import {IMAGES} from '../../utils/app_constants'
import Image from 'next/image'
import { useAuth } from '../../context/AuthContext'
import { firebaseAuthMessageConverter } from '../../utils/helpers'
interface EditAdminDialogProps {
    fullname: string
    adminId: string
    adminType: string
    adminProfileImage: string
    showEditAdminDialog: boolean
    handleCloseEditAdminDialog: () => void
    handleCloseAfterEditAdminDialog: () => void
}

const EditAdminDialog = ({ fullname, adminId, adminType,adminProfileImage,showEditAdminDialog, handleCloseEditAdminDialog, handleCloseAfterEditAdminDialog} : EditAdminDialogProps) => {
    
    const { reAuthenticateUser, user, updateAdminRank, getAdminStatus} = useAuth()
    const [currentAdminRank, setCurrentAdminRank] = React.useState<string>('')
  
    React.useEffect(() => {
      const currentAdminStatus = async (uid: string) => {
        await getAdminStatus(uid).then((response: any) => {
          setCurrentAdminRank(response)
        })
      }
      currentAdminStatus(user.uid)
    }, [user.uid])

    const adminTypeOptions = currentAdminRank === 'head admin' ? ['head admin', 'admin', 'staff', 'requesting'] : ['staff', 'requesting']

    const [selectedAdminType, setSelectedAdminType] = React.useState<string | null>(adminType);
    const [inputValue, setInputValue] = React.useState('');
    const [error, setError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<string>('')
    const [adminPassword, setAdminPassword] = React.useState<string>('')

    const handleSaveAdminDataChanges = async () => {
      setError(false)
      if(adminType === inputValue){
        setErrorMessage('Make sure to select a different admin rank')
        setError(true)
        return
      }
      if(adminPassword === ''){
        setError(true)
        setErrorMessage('Please input your password')
        return
      }

      reAuthenticateUser(user.email, adminPassword).then((response: any) => {
        updateAdminRank(adminId, inputValue).then(() => {
          handleCloseAfterEditAdminDialog()
          setError(false)
        })
      }).catch((error: any) => {
        const firebaseErrorMessage = firebaseAuthMessageConverter(error.code)
        setErrorMessage(firebaseErrorMessage)
        setError(true)
      })
    }

    const handleUpdateAdminPassword = (event: any) => {
      const passwordValue = event?.target?.value
      setAdminPassword(passwordValue)
    }

    return (
    <Dialog open={showEditAdminDialog}>
          <DialogTitle variant='h3'>Edit admin rank</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {
                !error && (<Alert severity='warning'>You can only change the rank of an admin</Alert>)
              }
              {
                error && (<Alert severity='error'>{errorMessage}</Alert>)
              }
            </DialogContentText>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <Box sx={{display: 'flex', flexDirection: 'column', padding: 1, gap: 1}}>
                <Image
                    src={adminProfileImage ?? IMAGES.NO_IMAGE_AVAILABLE}
                    alt='profile'
                    height={300}
                    width={300}
                />
              </Box>
              <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="id"
                    label="Admin code"
                    type="text"
                    disabled
                    variant="outlined"
                    defaultValue={adminId}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Admin name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    disabled
                    defaultValue={fullname}
                />
                <Autocomplete
                    value={selectedAdminType}
                    onChange={(event: any, newValue: string | null) => {
                    setSelectedAdminType(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    }}
                    id="controllable-admin-types"
                    options={adminTypeOptions}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Rank" />}
                />
                 <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Enter your password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    helperText='Enter password to save changes'
                    onChange={(event: any) => handleUpdateAdminPassword(event)}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditAdminDialog}>Cancel</Button>
            <Button onClick={handleSaveAdminDataChanges}>Save</Button>
          </DialogActions>
        </Dialog>
  )
}

export default EditAdminDialog