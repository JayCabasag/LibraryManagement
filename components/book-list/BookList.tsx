import { Box, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import Image from 'next/image'
import React, {useState} from 'react'
import DeleteBookDialog from '../books-delete-dialog'
import EditBookDialog from '../books-edit-dialog'

interface BookListProps {
    title: string,
    bookId: string,
    bookSummary: string,
    bookCoverImage: string
}

const BookList = ({title, bookId, bookSummary, bookCoverImage}: BookListProps) => {

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
        <EditBookDialog openEditBookDialog={openEditBookDialog} bookDetails={{name: 'dummy'}} handleOnEditImage={handleOnEditImage} handleCloseEditBookDialog={handleCloseEditBookDialog}/>
        <DeleteBookDialog openDeleteBookDialog={openDeleteBookDialog} bookDetails={{name: 'dummy'}} handleCloseDeleteBookDialog={handleCloseDeleteBookDialog}/>
      {/* Delete dialog ends here */}
    <CardContent sx={{flex: 1, display: 'flex', alignItems: 'center', gap: 1}}>
      <Box>
        <Image src={bookCoverImage} alt='Book cover' height={100} width={100} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {title} <Typography component={'span'} sx={{color: 'grayText', fontStyle: 'italic', cursor: 'pointer',paddingLeft: 1, paddingRight: 1}}>{bookId}</Typography>
        </Typography>
        <Typography variant='body1' sx={{fontSize: 15}}>{bookSummary}</Typography>
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