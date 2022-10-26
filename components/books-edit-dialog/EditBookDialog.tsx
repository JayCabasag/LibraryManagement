import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Box, Typography, Button, TextField} from '@mui/material'
import Image from 'next/image'
import {IMAGES} from '../../utils/app_constants'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface AddBookDialogProps  {
    openEditBookDialog: boolean,
    bookDetails: Object,
    handleOnEditImage: (e: Object) => void,
    handleCloseEditBookDialog: () => void
}

const EditBookDialog = ({openEditBookDialog, bookDetails,handleOnEditImage, handleCloseEditBookDialog} : AddBookDialogProps) => {
  return (
    <Dialog open={openEditBookDialog} onClose={handleCloseEditBookDialog}>
          <DialogTitle variant='h3'>Edit book</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To edit book, make sure to save your changes.
            </DialogContentText>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <Box sx={{display: 'flex', flexDirection: 'column', padding: 1, gap: 1}}>
                <Image src={IMAGES.NO_IMAGE_AVAILABLE} alt='book cover'  height={300} width={300}/>
                <Button startIcon={<CloudUploadIcon />} component='label' variant='outlined' onChange={(e) => handleOnEditImage(e)}>
                  CHANGE COVER
                  <input hidden accept="image/*" type="file"/>
                </Button>
              </Box>
              <Box>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Book ID"
                    type="text"
                    fullWidth
                    variant="outlined"
                    disabled
                />
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Book title"
                type="text"
                fullWidth
                variant="outlined"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Book description"
                type="text"
                fullWidth
                variant="outlined"
                multiline
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Topic/Category/tags"
                type="text"
                fullWidth
                variant="outlined"
              />
              <Box sx={{display: 'flex', alignItems: 'center', gap: 1, marginTop: 1}}>
                <Button variant="contained" component="label" size='large'>
                  CHANGE PDF
                  <input hidden accept="application/pdf" multiple type="file" />
                </Button>
                <Typography>No file selected</Typography>
              </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditBookDialog}>Discard</Button>
            <Button onClick={handleCloseEditBookDialog}>Save Changes</Button>
          </DialogActions>
        </Dialog>
  )
}

export default EditBookDialog