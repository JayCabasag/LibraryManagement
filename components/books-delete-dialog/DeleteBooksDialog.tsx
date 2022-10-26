import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Box, Typography, Button, TextField} from '@mui/material'
import {COLORS} from '../../utils/app_constants'
interface  DeleteBookDialog   {
    openDeleteBookDialog: boolean,
    bookDetails: Object,
    handleCloseDeleteBookDialog: () => void
}

const DeleteBookDialog = ({openDeleteBookDialog, bookDetails, handleCloseDeleteBookDialog} :  DeleteBookDialog ) => {
  return (
    <Dialog open={openDeleteBookDialog} onClose={handleCloseDeleteBookDialog}>
          <DialogTitle variant='h3'>Delete book</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Are you sure you want to delete this book?
                <Typography color={COLORS.RED} fontStyle='italic'>Note: This can't be undone.</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteBookDialog}>Cancel</Button>
            <Button onClick={handleCloseDeleteBookDialog}>Continue</Button>
          </DialogActions>
        </Dialog>
  )
}

export default DeleteBookDialog