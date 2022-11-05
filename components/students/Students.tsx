import { SearchOutlined } from '@mui/icons-material'
import { Box, Typography, TextField, InputAdornment, Button} from '@mui/material'
import React from 'react'
import UserList from '../user-list'
import classes from './style'
import { useState } from 'react'
import {IMAGES, USER_LOAD_PER_REFRESH } from '../../utils/app_constants'
import useGetStudentsUserData from '../../hooks/useGetStudentsUserData'


const Students = () => {

  const [maxUserResultsLimit, setMaxUserResultsLimit] = useState<number>(USER_LOAD_PER_REFRESH)
  const [filterBy, setFilterBy] = useState<string>('name')
  const handleCheckIfScrolledToBottom = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget

    if (target.scrollHeight - target.scrollTop === target.clientHeight){
      console.log('Bottom check if there is still others')
    }
  }
  const { isLoading, studentUserList } = useGetStudentsUserData({maxUserResultsLimit, filterBy})

  return (
    <Box sx={classes.studentMainContainer}>
       <Typography variant='h2'>
            Students
       </Typography>
       <Box sx={classes.studentBodyContainer} onScroll={handleCheckIfScrolledToBottom}>
          <Box sx={classes.searchContainer}>
            <TextField size='small' placeholder='Search by name' InputProps={{startAdornment: <InputAdornment position="start"><SearchOutlined/></InputAdornment>}} sx={classes.searchTextfield} />
            <Button variant='contained' sx={classes.searchButton}>Search</Button>
          </Box>
          <Box sx={classes.studentListContainer}>
            <Typography textAlign={'center'} component='h6'>List of Students ({studentUserList.length.toString()}) </Typography>
            {
             studentUserList.map((data: any, index: number) => {
                return <UserList key={index} fullname={data.name} userId={data.docId} userType={data.type} userProfileImage={data.photoURL} />
              })
            }
          </Box>
       </Box>
    </Box>
  )
}

export default Students