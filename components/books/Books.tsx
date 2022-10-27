import { SearchOutlined } from '@mui/icons-material'
import { Box, Typography, Button, TextField, Dialog, InputAdornment} from '@mui/material'
import {useState} from 'react'
import BookList from '../book-list'
import classes from './style'
import {IMAGES} from '../../utils/app_constants'
import * as React from "react";
import AddBookDialog from '../books-add-dialog'


const Books = () => {
  
  const [openAddBookDialog, setOpenAddBookDialog] = useState<boolean>(false)
  
  const handleCheckIfScrolledToBottom = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget

    if (target.scrollHeight - target.scrollTop === target.clientHeight){
      console.log('Bottom check if there is still others')
    }
  }

  const handleCloseAddBookDialog = () =>{ 
    setOpenAddBookDialog(false)
  }

  const handleOpenAddBookDialog = () =>{ 
    setOpenAddBookDialog(true)
  }

  const handleOnAddImage = (files: Object) => {
   console.log(files)
  }
  
  return (
    <Box sx={classes.dashboardMainContainer}>
        {/* book Dialog Starts hereeee */}
          <AddBookDialog openAddBookDialog={openAddBookDialog} handleOnAddImage={handleOnAddImage} handleCloseAddBookDialog={handleCloseAddBookDialog}/>
        {/*Ends hereeee */}
       <Typography variant='h2'>
            Books
       </Typography>
       <Box sx={classes.dashboardBodyContainer}  onScroll={handleCheckIfScrolledToBottom}>
          <Box sx={classes.searchAndAddBookContainer}>
            <TextField size='small' 
              placeholder='Search by Book ID' 
              InputProps={{startAdornment: 
              <InputAdornment position="start">
                <SearchOutlined/>
              </InputAdornment>}} 
              sx={classes.searchTextfield} 
              inputProps={{style: {height: 30}}} 
            />
            <Button variant='contained' sx={classes.addBookButton} onClick={handleOpenAddBookDialog}>Add Book</Button>
          </Box>
          <Box sx={classes.bookListContainer}>
            <Typography textAlign={'center'} component='h6'>List of books </Typography>
            {
              [1, 2].map((data, index) => {
                return <BookList key={index} title='Book title' bookId='#bookidmoto' bookSummary='This is a book summary' bookCoverImage={IMAGES.NO_IMAGE_AVAILABLE}/>
              })
            }
          </Box>
       </Box>
    </Box>
  )
}

export default Books