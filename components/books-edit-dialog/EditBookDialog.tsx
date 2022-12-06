import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Box, Typography, Button, TextField, Alert, IconButton} from '@mui/material'
import Image from 'next/image'
import {IMAGES} from '../../utils/app_constants'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { shortenSentence } from '../../utils/helpers';
import { storage } from '../../services/firebase-config'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { increment, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebase-config';
import { setDoc, doc } from "firebase/firestore";
import { Close } from '@mui/icons-material';

interface EditBookDialogProps  {
    openEditBookDialog: boolean,
    bookDetails: any,
    handleOnEditImage: (e: Object) => void,
    handleCloseEditBookDialog: () => void,
}

const EditBookDialog = ({openEditBookDialog, bookDetails, handleOnEditImage, handleCloseEditBookDialog} : EditBookDialogProps) => {

  const [error, setError] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [success, setSuccess] = React.useState<boolean>(false)
  const [successMessage, setSuccessMessage] = React.useState<string>('')
  const [inProgress, setInProgress] = React.useState<boolean>(false)

  const [bookData, setBookData] = React.useState<any>(bookDetails || {})
  let bookTags: string = bookData?.tags?.reduce((accumulator: string, currentValue: string) => {
    return accumulator + ' ' + currentValue
  }, '')
  const [bookCoverPhotoUrl, setBookCoverPhotoUrl] = React.useState<string>(bookData.book_cover as string || IMAGES.NO_IMAGE_AVAILABLE)
  const [uploadBookCoverProgress, setUploadBookCoverProgress] = React.useState<number>(0)
  const [bookPdfFileUrl, setBookPdfFileUrl] = React.useState<string>(bookData?.file || '')
  const [selectedFileName, setSelectedFileName] = React.useState<string>(bookData.title + ' file' || 'No file selected')
  const hasBookPdf = bookPdfFileUrl != ''
  const [uploadBookPdfProgress, setUploadBookPdfProgress] = React.useState<number>(0)

  const handleUpdateBookTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const titleValue = event.currentTarget.value
    setBookData({
      ...bookData,
      title: titleValue
    })
  }

  const handleUpdateBookDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    const descriptionValue = event.currentTarget.value
    setBookData({
      ...bookData,
      bookSummary: descriptionValue
    })
  }

  const handleUpdateBookAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const authorValue = event.currentTarget.value
    setBookData({
      ...bookData,
      author: authorValue
    })
  }

  const handleUpdateBookTags = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tagsValue = event.currentTarget.value
    let tagsList = tagsValue.split(' ')
    let uniqueTags = Array.from(new Set(tagsList))
    setBookData({
      ...bookData,
      tags: [...uniqueTags]
    })
  }

  const pickBookCoverPhotoFile = (event: React.ChangeEvent<HTMLInputElement>) => {

    if(event.target.files){
     let imageFile = event.target.files[0] as File
     const metadata = {
         contentType: 'image/jpeg'
     };

     const storageRef = ref(storage, 'files/' + imageFile.name);
     const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);

     uploadTask.on('state_changed',
                 (snapshot) => {
                     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                     setUploadBookCoverProgress(progress as number)
                     switch (snapshot.state) {
                     case 'paused':
                         break;
                     case 'running':
                         break;
                     }
                 }, 
                 (error) => {
                     // A full list of error codes is available at
                     // https://firebase.google.com/docs/storage/web/handle-errors
                     switch (error.code) {
                     case 'storage/unauthorized':
                         // User doesn't have permission to access the object
                         break;
                     case 'storage/canceled':
                         // User canceled the upload
                         break;

                     // ...

                     case 'storage/unknown':
                         // Unknown error occurred, inspect error.serverResponse
                         break;
                     }
                 }, 
                 () => {
                     // Upload completed successfully, now we can get the download URL
                     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                       setBookCoverPhotoUrl(downloadURL as string)
                     });
                 }
             );
    } 
 }

 const pickBookPdfFile = (event: React.ChangeEvent<HTMLInputElement>) => {

  if(event.target.files){
   let imageFile = event.target.files[0] as File
   const metadata = {
       contentType: 'application/pdf'
   };

   const storageRef = ref(storage, 'files/' + imageFile.name);
   const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);

   uploadTask.on('state_changed',
               (snapshot) => {
                   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                   setUploadBookPdfProgress(progress as number)
                   switch (snapshot.state) {
                   case 'paused':
                       break;
                   case 'running':
                       break;
                   }
               }, 
               (error) => {
                console.log(error)
                   // A full list of error codes is available at
                   // https://firebase.google.com/docs/storage/web/handle-errors
                   switch (error.code) {
                   case 'storage/unauthorized':
                       // User doesn't have permission to access the object
                       break;
                   case 'storage/canceled':
                       // User canceled the upload
                       break;

                   // ...

                   case 'storage/unknown':
                       // Unknown error occurred, inspect error.serverResponse
                       break;
                   }
               }, 
               () => {
                   // Upload completed successfully, now we can get the download URL
                   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setBookPdfFileUrl(downloadURL as string)
                    setSelectedFileName(imageFile?.name)
                   });
               }
           );
  } 
}

 const handleSaveChanges = async () => {
  setError(false)
  setSuccess(false)
  setInProgress(true)
  if(bookData.title === '' || bookData.title === undefined){
    setInProgress(false)
    setErrorMessage('Please add a book title')
    setError(true)
    return
  }
  if(bookData.bookSummary === '' || bookData.bookSummary  === undefined){
    setInProgress(false)
    setErrorMessage('Please add a book description')
    setError(true)
    return
  }
  
  if(bookData.author === '' || bookData.author  === undefined){
    setInProgress(false)
    setErrorMessage('Please add a book author')
    setError(true)
    return
  }

  if(bookData?.tags === '' || bookData?.tags === undefined){
    setInProgress(false)
    setErrorMessage('Please add a tags')
    setError(true)
    return
  }

  if((bookCoverPhotoUrl === IMAGES.NO_IMAGE_AVAILABLE || bookCoverPhotoUrl === '')){
    setInProgress(false)
    setErrorMessage('Please add a book cover')
    setError(true)
    return
  }

  if(bookPdfFileUrl === ''){
    setInProgress(false)
    setErrorMessage('Please add a PDF File')
    setError(true)
    return
  }

  const payload = {
    title: bookData.title,
    tags: bookData.tags,
    description: bookData.bookSummary,
    book_cover: bookCoverPhotoUrl,
    file: bookPdfFileUrl,
    author: bookData?.author,
    createdAt: serverTimestamp()
  }

  try {
    const bookId = bookDetails?.docId as string ?? ''

    await setDoc(doc(db, "books", bookId), payload).then((response: any) => {
      setError(false)
      setInProgress(false)
      setSuccessMessage('Updated book data successfully.')
      setSuccess(true)
    }).catch((error: any) => {
      setInProgress(false)
      setSuccess(false)
      setErrorMessage('Something went wrong while updating book data')
      setError(true)
      console.log(error)
    })
    
  } catch (error: any) {
    setSuccess(false)
    setInProgress(false)
    console.log(error)
    setErrorMessage('Please check your internet connection.')
    setError(true)
  }

 }

  return (
    <Dialog open={openEditBookDialog} onClose={handleCloseEditBookDialog} fullWidth maxWidth="md">
          <DialogActions>
            <IconButton onClick={handleCloseEditBookDialog} sx={{position: 'absolute', top: 20}}>
              <Close />
            </IconButton>
          </DialogActions>
          <DialogTitle variant='h3'>Edit book</DialogTitle>
          <DialogContent>
             {
              error && (<Alert severity='error'>{errorMessage}</Alert>)
             }
             {
              uploadBookCoverProgress > 0 && uploadBookCoverProgress < 100 && (<Alert severity='info'>Uploading book cover photo ...{uploadBookCoverProgress.toFixed()}%</Alert>)
             }
             {
              uploadBookPdfProgress > 0 && uploadBookPdfProgress < 100 && (<Alert severity='info'>Uploading pdf file ...{uploadBookPdfProgress.toFixed()}%</Alert>)
             }
             {
              success && (<Alert severity='success'>{successMessage}</Alert>)
             }
             {
              inProgress && (<Alert severity='info'>{'Please wait...'}</Alert>)
             }
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <Box sx={{display: 'flex', flexDirection: 'column', padding: 1, gap: 1}}>
                <Image src={bookCoverPhotoUrl} alt='book cover' height={500} width={450}/>
                <Button startIcon={<CloudUploadIcon />} component='label' variant='outlined' onChange={(e) => handleOnEditImage(e)}>
                  CHANGE COVER
                  <input hidden accept="image/*" type="file" onChange={pickBookCoverPhotoFile}/>
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
                    defaultValue={bookData?.docId as string ?? "Not set"}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Publication date"
                    type="text"
                    fullWidth
                    variant="outlined"
                    disabled
                    defaultValue={bookData.publishedDate ?? 'Not set'}
                />
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Book title"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={bookData?.title as string ?? ''}
                onChange={handleUpdateBookTitle}
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
                defaultValue={bookData?.bookSummary || 'No Summary'}
                onChange={handleUpdateBookDescription}
              />
               <TextField
                autoFocus
                margin="dense"
                id="author"
                label="Author"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                defaultValue={bookData?.author || 'Uknown'}
                onChange={handleUpdateBookAuthor}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Topic/Category/tags"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={bookTags?.substring(1) ?? ''}
                onChange={handleUpdateBookTags}
              />
              <Box sx={{display: 'flex', alignItems: 'center', gap: 1, marginTop: 1}}>
                <Button variant="contained" component="label" size='large'>
                  CHANGE PDF
                  <input hidden accept="application/pdf" multiple type="file" onChange={pickBookPdfFile} />
                </Button>
                <Typography>{shortenSentence(selectedFileName, 25, '...')}</Typography>
              </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditBookDialog}>Discard</Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </DialogActions>
        </Dialog>
  )
}

export default EditBookDialog