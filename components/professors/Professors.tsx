import { SearchOutlined } from '@mui/icons-material'
import { Box, Typography, TextField, InputAdornment, Button} from '@mui/material'
import React from 'react'
import UserList from '../user-list'
import classes from './style'
import { useState } from 'react'
import {IMAGES} from '../../utils/app_constants'

const Professors = () => {

  const [totalStudents, setTotalStudents] = useState<Number>(100)

  const handleCheckIfScrolledToBottom = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget

    if (target.scrollHeight - target.scrollTop === target.clientHeight){
      console.log('Bottom check if there is still others')
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
            <Typography textAlign={'center'} component='h6'>List of Professors ({totalStudents.toString()}) </Typography>
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data, index) => {
                return <UserList key={index} fullname='Fullname' userId='#T533HH' userType='Professor' userProfileImage={IMAGES.NO_IMAGE_AVAILABLE} />
              })
            }
          </Box>
       </Box>
    </Box>
  )
}

export default Professors