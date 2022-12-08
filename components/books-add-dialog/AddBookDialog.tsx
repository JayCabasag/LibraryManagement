import React from 'react'
import { Dialog, DialogContent, DialogTitle, IconButton, DialogActions, Box, Typography, Button, TextField, Alert, InputAdornment} from '@mui/material'
import Image from 'next/image'
import {GOOGLE_DOCS_PLAYER, IMAGES} from '../../utils/app_constants'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { storage } from '../../services/firebase-config'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from '../../context/AuthContext'
import { firebaseAuthMessageConverter, shortenSentence } from '../../utils/helpers'
import { db } from '../../services/firebase-config';
import { increment, serverTimestamp } from 'firebase/firestore';
import { collection, query, where, getDocs, addDoc, setDoc, doc} from "firebase/firestore";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import moment from 'moment'
import { Close } from '@mui/icons-material';

interface AddBookDialogProps  {
    openAddBookDialog: boolean,
    handleOnAddImage: (e: Object) => void,
    handleCloseAddBookDialog: () => void
}

const AddBookDialog = ({openAddBookDialog, handleOnAddImage, handleCloseAddBookDialog} : AddBookDialogProps) => {
  
  const [error, setError] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [success, setSuccess] = React.useState<boolean>(false)
  const [successMessage, setSuccessMessage] = React.useState<string>('')
  const [inProgress, setInProgress] = React.useState<boolean>(false)
  const [bookData, setBookData] = React.useState<any>({})
  const [bookCoverPhotoUrl, setBookCoverPhotoUrl] = React.useState<string>(IMAGES.NO_IMAGE_AVAILABLE)
  const [uploadBookCoverProgress, setUploadBookCoverProgress] = React.useState<number>(0)
  const [bookPdfFileUrl, setBookPdfFileUrl] = React.useState('')
  const [selectedFileName, setSelectedFileName] = React.useState<string>('')
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
      description: descriptionValue
    })
  }

  const handleUpdateBookAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const authorValue = event.currentTarget.value
    setBookData({
      ...bookData,
      author: authorValue
    })
  }

  const handleUpdateBookPublishedDate = (value: string, keyboardInputValue: string) => {
    const convertedToDateValue = moment(new Date(value)).format('YYYY-MM-DD')
    setBookData({
      ...bookData,
      publishedDate: convertedToDateValue
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

  const handleGoogleDocsLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    const descriptionValue = event.currentTarget.value
    setBookData({
      ...bookData,
      googleDocsLink: `${GOOGLE_DOCS_PLAYER}${descriptionValue}`
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

  const handleSaveBook = async () => {
    setError(false)
    setSuccess(false)
    setInProgress(true)
    if(bookData.title === '' || bookData.title === undefined){
      setInProgress(false)
      setErrorMessage('Please add a book title')
      setError(true)
      return
    }
    if(bookData.description === '' || bookData.description === undefined){
      setInProgress(false)
      setErrorMessage('Please add a book description')
      setError(true)
      return
    }
    if(bookData.author === '' || bookData.author === undefined){
      setInProgress(false)
      setErrorMessage('Please add an author')
      setError(true)
      return
    }

    if(bookData.publishedDate === '' || bookData.publishedDate === undefined){
      setInProgress(false)
      setErrorMessage('Please add date published')
      setError(true)
      return
    }

    const bookPublishedDate = bookData.publishedDate as string ?? ''
    const isValidDate = moment(bookPublishedDate).isValid()
    
    const currentDate = moment().format('YYYY,MM')
    const providedDate = moment(new Date(bookPublishedDate)).format('YYYY,MM')

    var a = moment([currentDate]);
    var b = moment([providedDate]);

    const dateDifference = a.diff(b, 'years') as number ?? 0
    const isWithInFiveYears = dateDifference <= 5
    
    if(!isValidDate){
      setInProgress(false)
      setErrorMessage('Please add a valid date')
      setError(true)
      return
    }

    if(!isWithInFiveYears){
      setInProgress(false)
      setErrorMessage('Cannot add book published more than five years')
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
      ...bookData,
      book_cover: bookCoverPhotoUrl,
      file: bookPdfFileUrl,
      createdAt: serverTimestamp()
    }

    // Check if book title already exist
    const booksRef = collection(db, "books");
    const queryForSameBookTitle = query(booksRef, where("title", "==", bookData?.title as string));

    const querySnapshot = await getDocs(queryForSameBookTitle);
    let responseBook: any = []
    querySnapshot.forEach((doc) => {
      responseBook.push({docId: doc.id, ...doc.data()});
    });

    if(responseBook?.length > 0){
      setInProgress(false)
      setErrorMessage('Same book title is registered on the Library, please add version if they are related.')
      setError(true)
      return
    }
  
    try {
      await addDoc(collection(db, "books"), payload).then((response: any) => {
        const bookId = response?.id as string || 'Not set'
        setSuccessMessage(`Book is now added on the library with Book Id: ${ bookId}`)
        setInProgress(false)
        setError(false)
        setSuccess(true)
      }).catch((error: any) => {
        setInProgress(false)
        setErrorMessage('Something went wrong while adding book, check your connection or contact admin')
        setError(true)
      })
    } catch (error: any) {
      setInProgress(false)
      setErrorMessage('Please check your internet connection.')
      setError(true)
    }
  }

  return (
    <Dialog open={openAddBookDialog} onClose={handleCloseAddBookDialog}>
          <DialogActions>
            <IconButton onClick={handleCloseAddBookDialog} sx={{position: 'absolute', top: 20}}>
              <Close />
            </IconButton>
          </DialogActions>
          <DialogTitle variant='h3'>Add new book</DialogTitle>
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
                <Image src={bookCoverPhotoUrl} alt='book cover' onError={({currentTarget}) => {currentTarget.src = IMAGES.NO_IMAGE_AVAILABLE}}  height={300} width={300}/>
                <Button startIcon={<CloudUploadIcon />} component='label' variant='outlined' onChange={(e) => handleOnAddImage(e)}>
                  UPLOAD COVER
                  <input hidden accept="image/*" type="file" onChange={pickBookCoverPhotoFile}/>
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
                onChange={handleUpdateBookTitle}
                value={bookData?.title || ''}
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
                onChange={handleUpdateBookDescription}
                value={bookData?.description || ''}
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
                onChange={handleUpdateBookAuthor}
                value={bookData?.author || ''}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="Publication date"
                    inputFormat="MM/DD/YYYY"
                    value={bookData?.publishedDate || ''}
                    onChange={(value: any, keyboardInputValue: any) => handleUpdateBookPublishedDate(value, keyboardInputValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Topic/Category/tags"
                type="text"
                fullWidth
                variant="outlined"
                helperText="Make sure to add space on each tag"
                onChange={handleUpdateBookTags}
              />
               <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Google docs link for this pdf"
                type="text"
                fullWidth
                variant="outlined"
                helperText="Make sure to open first on Google docs"
                onChange={handleGoogleDocsLink}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Button variant='contained' onClick={() => window.open(bookData?.googleDocsLink ?? GOOGLE_DOCS_PLAYER, '_blank')}>
                          Check link
                        </Button>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{display: 'flex', alignItems: 'center', gap: 1, marginTop: 1}}>
                <Button variant="contained" component="label" size='large'>
                  Upload pdf
                  <input hidden accept="application/pdf" type="file" onChange={pickBookPdfFile}/>
                </Button>
                <Typography>
                  {hasBookPdf && (shortenSentence(selectedFileName, 20, '...'))}
                  {!hasBookPdf && ('No file selected')}
                </Typography>
              </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddBookDialog}>Cancel</Button>
            <Button onClick={handleSaveBook}>Save</Button>
          </DialogActions>
        </Dialog>
  )
}

export default AddBookDialog