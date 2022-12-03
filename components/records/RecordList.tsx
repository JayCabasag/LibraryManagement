import { Box, Button, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { db } from '../../services/firebase-config'
import classes from './style'
import { doc, deleteDoc } from "firebase/firestore";


interface RecordListProps {
  data: any
  handleRefreshData: () => void 
  handleShowErrorMessage: (errorMessageText: string) => void
  handleShowSuccessMessage: (successMessageText: string) => void
}

const RecordList = ({data,handleRefreshData, handleShowErrorMessage, handleShowSuccessMessage} : RecordListProps) => {
  
  const fullname = data?.fullname as string ?? 'Not set'
  const docId = data?.docId as string ?? 'Not set'
  const email = data?.email as string ?? 'Not set'
  const dateRegistered = data?.createdAt.toDate()
  const formattedDate = moment(dateRegistered).format('MMM DD, YYYY HH:mm a') as string
  
  const handleDeleteRecord = async () => {
   try {
    await deleteDoc(doc(db, "transactions", docId)).then(()=>{
      handleShowSuccessMessage(`Deleted ${docId}`)
      handleRefreshData()
     }
    ).catch(() => {
      handleShowErrorMessage(`Unable to delete ${docId}` )
    })
   } catch (error) {
      handleShowErrorMessage(`Please chech your internet connection` )
   }
  }

  
  return (
    <Box sx={classes.recordListContainer}>
      <Box>
        <Typography variant='body1'>
          {docId}
        </Typography>
        <Typography variant='h4'>
          {fullname}
        </Typography>
        <Typography>
        {email}
        </Typography>
      </Box>
      <Box>
      <Typography>
        Registered: {formattedDate}
      </Typography>
      <Button
        variant='contained'
        onClick={handleDeleteRecord}
      >
        DELETE
      </Button>
      </Box>
    </Box>
  )
}

export default RecordList