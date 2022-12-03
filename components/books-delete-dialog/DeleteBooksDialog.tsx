import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Box, Typography, Button, TextField} from '@mui/material'
import {COLORS} from '../../utils/app_constants'
import { db } from '../../services/firebase-config';
import { doc, deleteDoc, collection } from "firebase/firestore";

interface  DeleteBookDialog   {
    openDeleteBookDialog: boolean,
    bookDetails: any,
    handleCloseDeleteBookDialog: () => void,
    handleRefreshBookList: () => void
}
const DeleteBookDialog = ({openDeleteBookDialog, bookDetails, handleCloseDeleteBookDialog, handleRefreshBookList} :  DeleteBookDialog ) => {
  
  const handleDeleteBookPermanently = async () => {
    const docId = bookDetails?.docId as string ?? ''
    try {
      await deleteDoc(doc(db,'books', docId )).then((response: any) => {
        setTimeout(() => {
          handleRefreshBookList()
          handleCloseDeleteBookDialog()
        }, 1000)
      }).catch((error: any) => {
        console.log('Error deleting your file.')
      })
    } catch (error: any) {
      console.log('Please check internet connection.', error)
    }

  }
  
  return (
    <Dialog open={openDeleteBookDialog} onClose={handleCloseDeleteBookDialog}>
          <DialogTitle variant='h3'>Delete book</DialogTitle>
          <DialogContent>
                Are you sure you want to delete this book?
                <Typography component={'pre'}>Book ID :  {`${bookDetails?.docId as string}`}</Typography>
                <Typography color={COLORS.RED} fontStyle='italic' component={'span'}>Note: This can't be undone.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteBookDialog}>Cancel</Button>
            <Button onClick={handleDeleteBookPermanently}>Continue</Button>
          </DialogActions>
        </Dialog>
  )
}

export default DeleteBookDialog