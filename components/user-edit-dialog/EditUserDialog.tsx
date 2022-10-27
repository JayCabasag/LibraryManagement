import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Box, Typography, Button, TextField, Divider, Chip, Avatar, InputAdornment, IconButton} from '@mui/material'
import Image from 'next/image'
import {IMAGES} from '../../utils/app_constants'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface EditUserDialogProps  {
    openEditUserDialog: boolean,
    userDetails: any,
    handleCloseEditUserDialog: () => void
}

const EditUserDialog = ({openEditUserDialog, userDetails, handleCloseEditUserDialog} : EditUserDialogProps) => {
  
  const [showPassword, setShowPassword] = React.useState<boolean>(false) 

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Dialog open={openEditUserDialog} onClose={handleCloseEditUserDialog}>
          <DialogTitle variant='h3'>Edit user information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To edit book, make sure to save your changes.
            </DialogContentText>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <Box sx={{display: 'flex', flexDirection: 'column', padding: 1, gap: 1}}>
                <Image src={IMAGES.NO_IMAGE_AVAILABLE} alt='book cover'  height={300} width={300}/>
              </Box>
              <Box>
                <Typography>User Information</Typography>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="User Id"
                        type="text"
                        fullWidth
                        variant="outlined"
                        disabled
                    />
                    <Chip
                        avatar={<Avatar alt="Natacha" src={IMAGES.NO_IMAGE_AVAILABLE} />}
                        label={userDetails.userType}
                        variant="outlined"
                    />
                </Box>
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email"
                type="text"
                fullWidth
                variant="outlined"
                multiline
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="User password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton onClick={handleToggleShowPassword} sx={{marginRight: '-10px'}}>
                            {
                              showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />
                            }
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
              />
              <Divider sx={{marginTop: 1}}/>
              <Typography>Admin</Typography>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
              />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditUserDialog}>Discard</Button>
            <Button onClick={handleCloseEditUserDialog}>Save Changes</Button>
          </DialogActions>
        </Dialog>
  )
}

export default EditUserDialog