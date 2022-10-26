import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Box, Typography, Button, TextField} from '@mui/material'
import Image from 'next/image'
import {IMAGES} from '../../utils/app_constants'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface AddBookDialogProps  {
    openAddBookDialog: boolean,
    handleOnAddImage: (e: Object) => void,
    handleCloseAddBookDialog: () => void
}

const AddBookDialog = ({openAddBookDialog, handleOnAddImage, handleCloseAddBookDialog} : AddBookDialogProps) => {
  return (
    <Dialog open={openAddBookDialog} onClose={handleCloseAddBookDialog}>
          <DialogTitle variant='h3'>Add new book</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add new book, please provide details that are needed.
            </DialogContentText>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <Box sx={{display: 'flex', flexDirection: 'column', padding: 1, gap: 1}}>
                <Image src={IMAGES.NO_IMAGE_AVAILABLE} alt='book cover'  height={300} width={300}/>
                <Button startIcon={<CloudUploadIcon />} component='label' variant='outlined' onChange={(e) => handleOnAddImage(e)}>
                  UPLOAD COVER
                  <input hidden accept="image/*" type="file"/>
                </Button>
              </Box>
              <Box>
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
                helperText="Make sure to add '#' each tag e.g #story"
              />
              <Box sx={{display: 'flex', alignItems: 'center', gap: 1, marginTop: 1}}>
                <Button variant="contained" component="label" size='large'>
                  Upload pdf
                  <input hidden accept="application/pdf" multiple type="file" />
                </Button>
                <Typography>No file selected</Typography>
              </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddBookDialog}>Cancel</Button>
            <Button onClick={handleCloseAddBookDialog}>Save</Button>
          </DialogActions>
        </Dialog>
  )
}

export default AddBookDialog