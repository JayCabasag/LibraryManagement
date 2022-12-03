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
    showApproveAdminRequestDialog: boolean
    handleCloseApproveAdminRequestDialog: () => void
    handleRefreshAdminList: () => void
}

const  ApproveAdminRequestDialog = ({ fullname, adminId, adminType,adminProfileImage,showApproveAdminRequestDialog, handleCloseApproveAdminRequestDialog, handleRefreshAdminList} : EditAdminDialogProps) => {
    
    const adminTypeOptions = ['admin', 'staff', 'requesting']

    const { reAuthenticateUser, user, updateAdminRank} = useAuth()

    const [selectedAdminType, setSelectedAdminType] = React.useState<string | null>(adminType);
    const [inputValue, setInputValue] = React.useState('');
    const [adminPassword, setAdminPassword] = React.useState<string>('')
    const [error, setError] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState<string>('')

    const handleApproveRequestStaff = async () => {
      
      setError(false)
      if(inputValue === 'requesting'){
        setErrorMessage('Please select a higher rank')
        setError(true)
        return
      }
      if(adminPassword === ''){
        setErrorMessage('Please add admin password.')
        setError(true)
        return
      }
      if(adminPassword.length < 7){
        setErrorMessage('Password should have atleast 8 letters')
        setError(true)
        return
      }

      reAuthenticateUser(user.email, adminPassword).then((response: any) => {
        updateAdminRank(adminId, inputValue).then((response: any) => {
          handleCloseApproveAdminRequestDialog()
          handleRefreshAdminList()
          setError(false)
        }).catch((error: any) => {
          const firebaseErrorMessage = firebaseAuthMessageConverter(error.code)
          setErrorMessage(firebaseErrorMessage)
          setError(true)
        })
      }).catch((error: any) => {
        const firebaseErrorMessage = firebaseAuthMessageConverter(error.code)
        setErrorMessage(firebaseErrorMessage)
        setError(true)
      })
    }

    const handleUpdateAdminPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
      const passwordValue = event.currentTarget.value
      setAdminPassword(passwordValue)
    }
    return (
    <Dialog open={showApproveAdminRequestDialog}>
          <DialogTitle variant='h3'>Approve staff request</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {error && (<Alert severity='error'>{errorMessage}</Alert>)}
            </DialogContentText>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <Box sx={{display: 'flex', flexDirection: 'column', padding: 1, gap: 1}}>
                <Image
                    src={adminProfileImage}
                    alt='profile'
                    height={300}
                    width={300}
                    onError={({currentTarget}) => {
                      currentTarget.src = IMAGES.PROFILE_IMAGE_NOT_AVAILABLE
                    }}
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
                    helperText='Enter your password to save changes'
                    onChange={handleUpdateAdminPassword}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseApproveAdminRequestDialog}>Cancel</Button>
            <Button onClick={handleApproveRequestStaff}>Approve</Button>
          </DialogActions>
        </Dialog>
  )
}

export default ApproveAdminRequestDialog