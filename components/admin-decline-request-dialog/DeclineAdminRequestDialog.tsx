import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Box, Typography, Button, TextField, Autocomplete} from '@mui/material'
import {IMAGES} from '../../utils/app_constants'
interface EditAdminDialogProps {
    fullname: string
    adminId: string
    adminType: string
    adminProfileImage: string
    showDeclineAdminRequestDialog: boolean
    handleCloseDeclineAdminRequestDialog: () => void
}

const DeclineAdminRequest = ({ fullname, adminId, adminType,adminProfileImage,showDeclineAdminRequestDialog, handleCloseDeclineAdminRequestDialog} : EditAdminDialogProps) => {
    
    const adminTypeOptions = ['Head Admin', 'Admin', 'Staff']

    const [selectedAdminType, setSelectedAdminType] = React.useState<string | null>(adminType);
    const [inputValue, setInputValue] = React.useState('');
  
    return (
    <Dialog open={showDeclineAdminRequestDialog}>
          <DialogTitle variant='h3'>Decline staff request approval</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Note : This can't be undone
            </DialogContentText>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <Box sx={{display: 'flex', flexDirection: 'column', padding: 1, gap: 1}}>
                <img 
                    src={IMAGES.NO_IMAGE_AVAILABLE}
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
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeclineAdminRequestDialog}>Cancel</Button>
            <Button onClick={handleCloseDeclineAdminRequestDialog}>Continue</Button>
          </DialogActions>
        </Dialog>
  )
}

export default DeclineAdminRequest