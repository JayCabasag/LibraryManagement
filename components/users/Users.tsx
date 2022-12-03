import { SearchOutlined } from '@mui/icons-material'
import { Box, Typography, TextField, InputAdornment, Button, Alert} from '@mui/material'
import React from 'react'
import UserList from '../user-list'
import classes from './style'
import { useState } from 'react'
import {IMAGES, USER_LOAD_PER_REFRESH } from '../../utils/app_constants'
import useGetStudentsUserData from '../../hooks/useGetStudentsUserData'
import useGetAllUsersData from '../../hooks/useGetAllUsersData'
import { collection, query, where, getDocs} from "firebase/firestore";
import { db } from '../../services/firebase-config'


const Users = () => {

  const [maxUserResultsLimit, setMaxUserResultsLimit] = useState<number>(USER_LOAD_PER_REFRESH)
  const [filterBy, setFilterBy] = useState<string>('name')

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const [searchResultList, setSearchResultList] = useState<any []>([])

  const handleCheckIfScrolledToBottom = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget

    if (target.scrollHeight - target.scrollTop === target.clientHeight){
      console.log('Bottom check if there is still others')
    }
  }

  const {isLoading, overallUsersList } = useGetAllUsersData({maxUserResultsLimit, filterBy})
  const hasNoUsers = overallUsersList?.length <= 0

  const handleRefreshUserList = () => {
    setMaxUserResultsLimit(prevState => prevState - 1)
  }

  const handleSuccessMessage = (successMessageText: string) => {
    setSuccessMessage(successMessageText)
    setSuccess(true)
  }

  const handleErrorSuccessMessage = (errorMessageText: string) => {
    setErrorMessage(errorMessageText)
    setError(true)
  }

  React.useEffect(() => {
    if(!error || !success) return

     setInterval(() => {
      setError(false)
      setSuccess(false)
      setErrorMessage('')
      setSuccessMessage('')
    }, 3)

  }, [error, success])


  const [searchKeyword, setSearchKeyword] = React.useState<string>('')
  
  const handleChangeSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const textValue = event?.target?.value as string ?? ''
    setSearchKeyword(textValue)
  }

  const handleSearchUser = async () => {
    const usersRef = collection(db, "users");
    const queriedUsers = query(usersRef, where("fullname", "==", searchKeyword));

    const querySnapshot = await getDocs(queriedUsers);

    let searchResults: any[] = []

    querySnapshot.forEach((doc) => {
        searchResults.push({docId: doc.id, ...doc.data()})
    });
    setSearchResultList(searchResults)
  }

  const handleOnPressedEnter = (event: any) => {
    if(event?.code !== 'Enter') return
    handleSearchUser()
  }

  return (
    <Box sx={classes.studentMainContainer}>
       <Typography variant='h2'>
            All users
       </Typography>
       <Box>
        {
          error && (<Alert severity="error">Error : {errorMessage}!</Alert>)
        }
        {
          success && (<Alert severity="success">Success: {successMessage}!</Alert>)
        }
       </Box>
       <Box sx={classes.studentBodyContainer} onScroll={handleCheckIfScrolledToBottom}>
          <Box sx={classes.searchContainer}>
            <TextField size='small' placeholder='Search by name' onKeyDown={handleOnPressedEnter}  onChange={handleChangeSearchKeyword} InputProps={{startAdornment: <InputAdornment position="start"><SearchOutlined/></InputAdornment>}} sx={classes.searchTextfield} />
            <Button variant='contained' sx={classes.searchButton} onClick={handleSearchUser}>Search</Button>
          </Box>
          <Box sx={classes.studentListContainer}>
            {
               searchResultList?.length !== 0 && (<Typography textAlign={'center'} component='h6'>Search results ({searchResultList?.length.toString()})</Typography>)
            }
            {
              searchResultList?.length !== 0 && searchResultList.map((data: any, index: number) => {
                return <UserList key={index} userData={data} handleRefreshUserList={handleRefreshUserList} handleSuccessMessage={handleSuccessMessage} handleErrorSuccessMessage={handleErrorSuccessMessage}/>
              })
            }
            <Typography textAlign={'center'} component='h6'>List of Users ({overallUsersList.length.toString()}) </Typography>
            {
              hasNoUsers && (<Box>No users...</Box>)
            }
            {
             !isLoading && overallUsersList.map((data: any, index: number) => {
                return <UserList key={index} userData={data} handleRefreshUserList={handleRefreshUserList} handleSuccessMessage={handleSuccessMessage} handleErrorSuccessMessage={handleErrorSuccessMessage}/>
              })
            }
          </Box>
       </Box>
    </Box>
  )
}

export default Users