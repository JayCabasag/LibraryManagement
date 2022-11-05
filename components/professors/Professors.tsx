import { SearchOutlined } from '@mui/icons-material'
import { Box, Typography, TextField, InputAdornment, Button, CircularProgress} from '@mui/material'
import React from 'react'
import UserList from '../user-list'
import classes from './style'
import { useState } from 'react'
import {IMAGES, USER_LOAD_PER_REFRESH} from '../../utils/app_constants'
import useGetProfessorsUserData from '../../hooks/useGetProfessorsData'

const Professors = () => {

  const [maxUserResultsLimit, setMaxUserResultsLimit] = useState<number>(USER_LOAD_PER_REFRESH)
  const [filterBy, setFilterBy] = useState<string>('name')
  const {isLoading, professorUsersList} = useGetProfessorsUserData({maxUserResultsLimit, filterBy})

  const hasNoProfessors = professorUsersList.length <= 0

  const handleCheckIfScrolledToBottom = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget
    if (target.scrollHeight - target.scrollTop === target.clientHeight){
      setMaxUserResultsLimit((current) => current + USER_LOAD_PER_REFRESH)
    }
  }

  return (
    <Box sx={classes.professorMainContainer}>
       <Typography variant='h2'>
            Professors
       </Typography>
       <Box sx={classes.professorBodyContainer} onScroll={handleCheckIfScrolledToBottom}>
          <Box sx={classes.searchContainer}>
            <TextField size='small' placeholder='Search by name' InputProps={{startAdornment: <InputAdornment position="start"><SearchOutlined/></InputAdornment>}} sx={classes.searchTextfield} />
            <Button variant='contained' sx={classes.searchButton}>Search</Button>
          </Box>
          <Box sx={classes.professorListContainer} onScroll={handleCheckIfScrolledToBottom}>
            <Typography textAlign={'center'} component='h6'>List of Professors ({professorUsersList.length.toString()}) </Typography>
            {
               hasNoProfessors && !isLoading && (<Typography>No professor user found...</Typography>)
            }
            {
               professorUsersList.map((data: any, index: number) => {
                return <UserList key={index} fullname={data.name} userId={data.docId} userType={data.type} userProfileImage={data.photoURL} />
              })
            }
             {isLoading && (<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '20vh', width: '100%', gap: 2}}>
              <CircularProgress sx={{height: '20vh', width: '100%'}}/>
              <Typography>Please wait...</Typography>
             </Box>
             )}
          </Box>
       </Box>
    </Box>
  )
}

export default React.memo(Professors)