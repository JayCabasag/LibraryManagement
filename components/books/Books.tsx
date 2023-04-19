import { Box, Typography, Button, TextField, Dialog, InputAdornment, CircularProgress, Autocomplete, Alert} from '@mui/material'
import {useState} from 'react'
import BookList from '../book-list'
import classes from './style'
import {IMAGES} from '../../utils/app_constants'
import * as React from "react";
import AddBookDialog from '../books-add-dialog'
import useGetBooksData from '../../hooks/useGetBooksData'
import { useDebouncedCallback } from 'use-debounce'
import Image from 'next/image'
import axios from 'axios'
import {AddCircleOutline} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton'

const BOOK_LOAD_PER_REFRESH = 50

interface BookResultType {
  title?: string,
  description?: string,
  file?: string,
  tags?: any[],
  createdAt?: string,
  book_cover?: string
}

const Books = () => {
  
  const [openAddBookDialog, setOpenAddBookDialog] = useState<boolean>(false)
  const [maxBookResultsLimit, setMaxBookResultsLimit] = useState<number>(BOOK_LOAD_PER_REFRESH)
  const {bookList, isLoading} = useGetBooksData({maxBookResultsLimit})
  const [searchBookKeyword, setSearchBookKeyword] = useState<string>('')
  const [searchedBookResults, setSearchedBookResults] = useState<any[]>([])
  const hasBookSearchResultsFound = searchedBookResults.length > 0

  const handleRefreshBookList = () => {
    setMaxBookResultsLimit(prevState => prevState - 1)
    setSearchedBookResults([])
  }
  // This will help us load more data if user scroll to bottom of the div
  const handleCheckIfScrolledToBottom = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget
    if (target.scrollHeight - target.scrollTop === target.clientHeight){
      setMaxBookResultsLimit((currentLimit) => {
        return currentLimit + BOOK_LOAD_PER_REFRESH
      })
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

  const handleDebounceSearch = (value: string) => {
    debounceKeyword(value)
  }

  const searchBooks = async (value: string) => {
    const config = {
      headers:{
        'X-Algolia-API-Key': 'abe33f04785a63c7286f8f2d92400ea4',
        'X-Algolia-Application-Id': 'JXGVNF2YFE'
      }
    };
    const url = `https://JXGVNF2YFE-dsn.algolia.net/1/indexes/books?query=${value}&hitsPerPage=${maxBookResultsLimit}&getRankingInfo=1`;

    await axios.get(url, config)
    .then((res: any)=>{
      setSearchedBookResults([...res.data.hits])
    })
    .catch((err: any)=> {
      console.log(err)
    })
  }

  const debounceKeyword = useDebouncedCallback((value) => {
    const isKeywordBlack = value.length <= 0
    if(isKeywordBlack) return
    searchBooks(value)
  },700)

  const handleOnPressedEnter = (value: string) => {
    setSearchBookKeyword(value)
  }

  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const handleAddBookSuccess = (isSuccess: boolean, successMessage: string) => {  
    setSuccessMessage(successMessage)
    setSuccess(isSuccess)
  }

  
  return (
    <Box sx={classes.dashboardMainContainer}>
        {/* book Dialog Starts hereeee */}
          <AddBookDialog openAddBookDialog={openAddBookDialog} handleOnAddImage={handleOnAddImage} handleCloseAddBookDialog={handleCloseAddBookDialog} handleAddBookSuccess={handleAddBookSuccess}/>
        {/*Ends hereeee */}
       <Typography variant='h2'>
            Books
       </Typography>
      <IconButton  onClick={handleOpenAddBookDialog} sx={{position: 'absolute', right: 15, bottom: 15, zIndex: 9999, color: '#fff', backgroundColor: 'red', '&:hover': {backgroundColor: '#c40808', color: 'white'}}}>
              <AddCircleOutline sx={{height: 50, width: 50}}/>
        </IconButton>
        {success && (<Alert severity="success">{successMessage}</Alert>)}
       <Box sx={classes.dashboardBodyContainer}  onScroll={handleCheckIfScrolledToBottom}>
          <Box sx={classes.searchAndAddBookContainer}>
          <Autocomplete
            id="free-solo-demo"
            getOptionLabel={searchedBookResult => {
              return searchedBookResult.title
            }}
            defaultValue={{ title: searchBookKeyword}}
            freeSolo
            renderInput={(params) => <TextField {...params} 
            placeholder='Search for book' 
            onChange={(event: any) => {
              handleDebounceSearch(event.currentTarget.value)
            }}  
            inputProps={{
                ...params.inputProps,
                onKeyDown: (e) => {
                      if (e.key === 'Enter') {
                        e.stopPropagation();
                        handleOnPressedEnter(e?.currentTarget.value)
                      }
                },
              }}/>
            }
            options={searchedBookResults}
            sx={classes.searchTextfield}
            disableClearable
            renderOption={(
              props: React.HTMLAttributes<HTMLLIElement>,
              option: any
            ) => {
              return (
                <li {...props} key={option.title}>
                  <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                    <img 
                      src={ option.book_cover || IMAGES.NO_IMAGE_AVAILABLE}
                      height={50}
                      width={50}
                      alt={option?.title}
                    />
                    {option.title}
                  </Box>
                </li>
              )
            }}
          />
          </Box>
          <Box sx={classes.bookListContainer}>
            { hasBookSearchResultsFound && (<Typography textAlign={'center'} component='h6'>Result books ({searchedBookResults.length})</Typography>)}
            {
              hasBookSearchResultsFound && (
                searchedBookResults.map((data: any, index: any) => {
                  return <BookList key={index} bookData={data} handleRefreshBookList={handleRefreshBookList}/>
                })
              )
            }
            <Typography textAlign={'center'} component='h6'>List of books ({bookList.length})</Typography>
            {bookList.map((data: any, index: any) => {
                return <BookList key={index} bookData={data} handleRefreshBookList={handleRefreshBookList}/>
              })}
            {isLoading && (
               <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '20vh', width: '100%', gap: 2}}>
                <CircularProgress sx={{height: '20vh', width: '100%'}}/>
                <Typography>Please wait...</Typography>
               </Box>
              )}
          </Box>
       </Box>
    </Box>
  )
}

export default Books