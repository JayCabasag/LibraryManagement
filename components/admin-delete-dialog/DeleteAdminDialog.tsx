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
    showDeleteAdminDialog: boolean
    handleCloseDeleteAdminDialog: () => void
    handleCloseAfterDeleteAdminDialog: () => void
}

const DeleteAdminDialog = ({ fullname, adminId, adminType, adminProfileImage,showDeleteAdminDialog, handleCloseDeleteAdminDialog, handleCloseAfterDeleteAdminDialog} : EditAdminDialogProps) => {
    
    const adminTypeOptions = ['Head Admin', 'Admin', 'Staff']

    const [selectedAdminType, setSelectedAdminType] = React.useState<string | null>(adminType);
    const [inputValue, setInputValue] = React.useState('');
    const [adminPassword, setAdminPassword] = React.useState<string>('')
    const [error, setError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState('')
    const { reAuthenticateUser, user, updateAdminRank} = useAuth()

    const handleIfAdminPasswordIsCorrect = async () =>{

      setError(false)

      if(adminPassword === ''){
        setError(true)
        setErrorMessage('Please input your password')
        return
      }

      reAuthenticateUser(user.email, adminPassword).then((response: any) => {
        handleCloseAfterDeleteAdminDialog()
        setError(false)
      }).catch((error: any) => {
        const firebaseErrorMessage = firebaseAuthMessageConverter(error.code)
        setErrorMessage(firebaseErrorMessage)
        setError(true)
      })
    }

    const handleOnAdminPasswordChange = (event: any) => {
      const textValue = event?.target?.value as string ?? ''
      setAdminPassword(textValue)
    }

    return (
    <Dialog open={showDeleteAdminDialog}>
          <DialogTitle variant='h3'>Delete admin</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {
                !error && (<Alert severity='warning'>This action can&apos;t be undone</Alert>)
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
                    disabled
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
                    onChange={(event: any) => handleOnAdminPasswordChange(event)}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteAdminDialog} variant={'outlined'}>Cancel</Button>
            <Button onClick={handleIfAdminPasswordIsCorrect} variant={'outlined'}>Continue</Button>
          </DialogActions>
        </Dialog>
  )
}

export default DeleteAdminDialog