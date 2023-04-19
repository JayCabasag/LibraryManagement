import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Box, Typography, Button, TextField, Alert, InputAdornment, IconButton, Tooltip} from '@mui/material'
import Image from 'next/image'
import {IMAGES} from '../../utils/app_constants'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface EditUserDialogProps  {
    openEditUserDialog: boolean,
    userDetails: any,
    handleCloseEditUserDialog: () => void
}

const ReviewUserDialog = ({openEditUserDialog, userDetails, handleCloseEditUserDialog} : EditUserDialogProps) => {
  
  const [showPassword, setShowPassword] = React.useState<boolean>(false) 

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const encodedPassword = userDetails?.password as string ?? ''
  const decodedPassword = atob(encodedPassword);


  const [showCopiedTooltip, setShowCopiedTooltip] = React.useState(false)

  const handleCopyUid = () => {
    navigator.clipboard.writeText(userDetails?.docId as string ?? userDetails?.objectID ?? "Not set").then(()=> {
      setShowCopiedTooltip(true)
    })
  }
  
  const handleCloseTooltip = () => {
    setShowCopiedTooltip(false)
  }

  return (
    <Dialog open={openEditUserDialog} onClose={handleCloseEditUserDialog}>
          <DialogTitle variant='h3'>Review user information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Alert severity='warning'>Editing user details should be made by user.</Alert>
            </DialogContentText>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <Box sx={{display: 'flex', flexDirection: 'column', padding: 1, gap: 1}}>
                <img src={userDetails?.photoURL as string ?? IMAGES.NO_IMAGE_AVAILABLE} alt='book cover'  height={300} width={300}/>
              </Box>
              <Box>
                <Typography>User Information</Typography>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="uid"
                  defaultValue={userDetails?.docId as string ?? 'Not set'}
                  type="text"
                  fullWidth
                  variant="outlined"
                  disabled
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
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                defaultValue={userDetails?.fullname as string ?? 'Not set'}
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
                defaultValue={userDetails?.email as string ?? 'Not set'}
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
                defaultValue={decodedPassword}
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
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditUserDialog} variant={'outlined'}>Close</Button>
          </DialogActions>
        </Dialog>
  )
}

export default ReviewUserDialog