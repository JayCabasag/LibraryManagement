import { SearchOutlined } from '@mui/icons-material'
import { Box, Typography, TextField, InputAdornment, Button, Alert, CircularProgress} from '@mui/material'
import React from 'react'
import UserList from '../user-list'
import classes from './style'
import { useState } from 'react'
import {IMAGES, USER_LOAD_PER_REFRESH } from '../../utils/app_constants'
import useGetAllRegistrationRecords from '../../hooks/useGetAllRegistrationRecords'
import RecordList from './RecordList'


const Records = () => {

  const [maxUserResultsLimit, setMaxUserResultsLimit] = useState<number>(USER_LOAD_PER_REFRESH)
  const [filterBy, setFilterBy] = useState<string>('name')
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleCheckIfScrolledToBottom = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget
    if (target.scrollHeight - target.scrollTop === target.clientHeight){
      setMaxUserResultsLimit(prevState => prevState + USER_LOAD_PER_REFRESH)
    }
  }

  const { isLoading, overallTransactions} = useGetAllRegistrationRecords({maxUserResultsLimit, filterBy})
  const hasNoTransactions = overallTransactions?.length <= 0

  const handleRefreshData = () => {
    setMaxUserResultsLimit(prevState => prevState - 1)
  }

  const handleShowErrorMessage  = (errorMessageText: string) => {
    setError(true)
    setErrorMessage(errorMessageText)
  }

  const handleShowSuccessMessage  = (successMessageText: string) => {
    setSuccess(true)
    setSuccessMessage(successMessageText)
  }

  return (
    <Box sx={classes.studentMainContainer}>
       <Typography variant='h2'>
          User registration records
       </Typography>
       <Typography textAlign={'center'} component='h6'>Total registration records ({overallTransactions?.length.toString()})</Typography>
       <Box>
        {
          error && (<Alert severity="error">Error : {errorMessage}!</Alert>)
        }
        {
          success && (<Alert severity="success">Success: {successMessage}!</Alert>)
        }
       </Box>
       <Box sx={classes.studentBodyContainer} onScroll={handleCheckIfScrolledToBottom}>
          <Box sx={classes.studentListContainer}>
            {
              !isLoading && hasNoTransactions && (<Box>No Records</Box>)
            }
            {
              isLoading && (<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '20vh', width: '100%', gap: 2}}>
              <CircularProgress sx={{height: '50vh', width: '100%'}}/>
              <Typography>Please wait...</Typography>
             </Box>)
            }
            {
              !isLoading && !hasNoTransactions && overallTransactions.map((data: any, index: number) => {
                return <RecordList key={index} data={data} handleRefreshData={handleRefreshData} handleShowErrorMessage={handleShowErrorMessage} handleShowSuccessMessage={handleShowSuccessMessage}/>
              })
            }
          </Box>
       </Box>
    </Box>
  )
}

export default Records