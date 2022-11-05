import { Box, Card, CardContent, CardActions, Button, Typography, Chip } from '@mui/material'
import { StringFormat } from 'firebase/storage'
import Image from 'next/image'
import React, {useState} from 'react'
import { IMAGES } from '../../utils/app_constants'
import { shortenSentence } from '../../utils/helpers'
import DeleteBookDialog from '../books-delete-dialog'
import EditBookDialog from '../books-edit-dialog'

interface BookListProps {
    title: string,
    bookId: string,
    bookSummary: string,
    bookCoverImage: string,
    bookPdfFile: string,
    tags: [],
    createdAt: string
}

const BookList = ({title, bookId, bookSummary, bookCoverImage,bookPdfFile, tags, createdAt}: BookListProps) => {
  const [openEditBookDialog, setOpenEditBookDialog] = useState<boolean>(false)
  const [openDeleteBookDialog, setOpenDeleteBookDialog] = useState<boolean>(false)
  const handleOpenDeleteButton = () => {
    setOpenDeleteBookDialog(true)
  }
  const handleCloseDeleteBookDialog = () => {
    setOpenDeleteBookDialog(false)
  }

  const handleCloseEditBookDialog = () =>{ 
    setOpenEditBookDialog(false)
  }

  const handleOpenEditBookDialog = () =>{ 
    setOpenEditBookDialog(true)
  }

  const handleOnEditImage = (files: Object) => {
   console.log(files)
  }

  return (
    <Card sx={{ minWidth: '100%', display: 'flex', flexDirection: 'row'}} elevation={2}>

      {/* Delete dialog starts here */}
        <EditBookDialog openEditBookDialog={openEditBookDialog} bookDetails={{title, bookId, bookSummary, bookCoverImage, bookPdfFile, tags, createdAt}} handleOnEditImage={handleOnEditImage} handleCloseEditBookDialog={handleCloseEditBookDialog}/>
        <DeleteBookDialog openDeleteBookDialog={openDeleteBookDialog} bookDetails={{title, bookId, bookSummary, bookCoverImage, bookPdfFile, tags, createdAt}} handleCloseDeleteBookDialog={handleCloseDeleteBookDialog}/>
      {/* Delete dialog ends here */}
    <CardContent sx={{flex: 1, display: 'flex', alignItems: 'center', gap: 1}}>
      <Box>
        <Image src={bookCoverImage} alt='Book cover' onError={({currentTarget}) => {currentTarget.src = IMAGES.NO_IMAGE_AVAILABLE}} height={150} width={150} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {shortenSentence(title, 60, '...')} <Typography component={'span'} sx={{color: 'grayText', fontStyle: 'italic', cursor: 'pointer',paddingLeft: 1, paddingRight: 1}}>{bookId}</Typography>
        </Typography>
        <Typography variant='body1' sx={{fontSize: 15}}>{shortenSentence(bookSummary, 60, '...')}</Typography>
        <Box sx={{display: 'flex', gap: 1}}>
          {
            tags?.map((tag: string, index: number) => {
              return <Chip label={tag} key={index}/>
            })
          }
        </Box>
      </Box>
    </CardContent>
    <CardActions>
      <Button size="small" variant='outlined' onClick={handleOpenEditBookDialog}>Edit</Button>
      <Button size="small" variant='contained' onClick={handleOpenDeleteButton}>Delete</Button>
    </CardActions>
  </Card>
  )
}

export default BookList