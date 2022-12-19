import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Box, Typography, Button, TextField} from '@mui/material'
import {COLORS} from '../../utils/app_constants'
interface  DeleteUserDialog   {
    openDeleteUserDialog: boolean,
    userDetails: Object,
    handleCloseDeleteUserDialog: () => void,
    handleCloseAfterDelete: () => void
}

const DeleteUserDialog = ({openDeleteUserDialog, userDetails, handleCloseDeleteUserDialog, handleCloseAfterDelete} :  DeleteUserDialog ) => {
  return (
    <Dialog open={openDeleteUserDialog} onClose={handleCloseDeleteUserDialog}>
          <DialogTitle variant='h3'>Delete User</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Are you sure you want to delete this User?
                <Typography color={COLORS.RED} fontStyle='italic'>Note: This can&apos;t be undone.</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteUserDialog}>Cancel</Button>
            <Button onClick={ handleCloseAfterDelete}>Continue</Button>
          </DialogActions>
        </Dialog>
  )
}

export default DeleteUserDialog