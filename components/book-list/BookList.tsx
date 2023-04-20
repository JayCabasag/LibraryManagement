import { Box, Card, CardContent, CardActions, Button, Typography, Chip } from '@mui/material'
import { StringFormat } from 'firebase/storage'
import Image from 'next/image'
import React, {useState} from 'react'
import { IMAGES } from '../../utils/app_constants'
import { shortenSentence } from '../../utils/helpers'
import DeleteBookDialog from '../books-delete-dialog'
import EditBookDialog from '../books-edit-dialog'

interface BookListProps {
  bookData: any,
  handleRefreshBookList: () => void
}

const BookList = ({bookData, handleRefreshBookList}: BookListProps) => {
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
        <EditBookDialog openEditBookDialog={openEditBookDialog} bookDetails={bookData} handleOnEditImage={handleOnEditImage} handleCloseEditBookDialog={handleCloseEditBookDialog}/>
        <DeleteBookDialog openDeleteBookDialog={openDeleteBookDialog} bookDetails={bookData} handleCloseDeleteBookDialog={handleCloseDeleteBookDialog} handleRefreshBookList={handleRefreshBookList}/>
      {/* Delete dialog ends here */}
    <CardContent sx={{flex: 1, display: 'flex', alignItems: 'center', gap: 1}}>
      <Box>
        <Image src={bookData?.book_cover as string ?? IMAGES.NO_IMAGE_AVAILABLE} alt='Book cover' onError={({currentTarget}) => {currentTarget.src = IMAGES.NO_IMAGE_AVAILABLE}} height={150} width={150} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {shortenSentence(bookData?.title as string ?? '', 60, '...')} <Typography component={'span'} sx={{color: 'grayText', fontStyle: 'italic', cursor: 'pointer',paddingLeft: 1, paddingRight: 1}}>{bookData?.docId as string ?? bookData?.objectID as string ?? 'Not set'}</Typography>
        </Typography>
        <Typography variant='body1' sx={{fontSize: 15}}>{shortenSentence(bookData?.bookSummary as string ?? '', 60, '...')}</Typography>
        <Box sx={{display: 'flex', gap: 1}}>
          {
            bookData?.tags?.map((tag: string, index: number) => {
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