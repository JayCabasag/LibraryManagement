import { Card, CardContent, CardActions, Button, Typography} from '@mui/material'
import React from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'
import DeleteUserDialog from '../user-delete-dialog'
import ReviewUserDialog from '../user-review-dialog'
import {IMAGES} from '../../utils/app_constants'
import { db } from '../../services/firebase-config'
import { doc, deleteDoc } from "firebase/firestore";
interface UserListProps {
    userData: any,
    handleRefreshUserList: () => void,
    handleSuccessMessage: (successMessageString: string) => void,
    handleErrorSuccessMessage: (errorMessageString: string) => void
}

const UserList = ({userData, handleRefreshUserList, handleSuccessMessage, handleErrorSuccessMessage}: UserListProps) => {
  
  const [openDeleteUserDialog, setOpenDeleteUserDialog] = React.useState<boolean>(false)
  const [openEditUserDialog, setOpenEditUserDialog] = React.useState<boolean>(false)

  const handleCloseDeleteUserDialog = () => {
    setOpenDeleteUserDialog(false)
  } 
  const handleCloseAfterDelete = async () => {
    const docId = userData?.docId as string ?? ''
    try {
      await deleteDoc(doc(db, "users", docId)).then(()=>{
        handleRefreshUserList()
        handleSuccessMessage(`Deleted user ${docId}`)
       }
      ).catch(() => {
        handleErrorSuccessMessage(`Unable to delete user ${docId}`)
      })
     } catch (error) {
      handleErrorSuccessMessage(`Please check your internet connection`)
     }
  }
  const handleOpenDeleteUserDialog = () => {
    setOpenDeleteUserDialog(true)
  } 

  const handleOpenEditUserDialog = () => {
    setOpenEditUserDialog(true)
  }

  const handleCloseEditUserDialog = () => {
    setOpenEditUserDialog(false)
  }

  return (
    <Card sx={{ minWidth: '100%', display: 'flex', flexDirection: 'row'}} elevation={2}>
      {/* This is where dialog will show up */}
      <ReviewUserDialog openEditUserDialog={openEditUserDialog} userDetails={userData} handleCloseEditUserDialog={handleCloseEditUserDialog} />
      <DeleteUserDialog openDeleteUserDialog={openDeleteUserDialog} userDetails={userData} handleCloseDeleteUserDialog={handleCloseDeleteUserDialog}  handleCloseAfterDelete={handleCloseAfterDelete}/>
     <CardContent sx={{flex: 1, display: 'flex', alignItems: 'center', gap: 1}}>
      <Box>
        <img src={userData?.photoUrl as string ?? IMAGES.NO_IMAGE_AVAILABLE} alt='User profile' onError={({currentTarget})=> currentTarget.src = IMAGES.PROFILE_IMAGE_NOT_AVAILABLE} height={75} width={75} />
      </Box>
      <Box>
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
            {userData?.fullname as string ?? 'Not set'}
          </Typography>
          
          <Typography sx={{ fontSize: 16, lineHeight: .2 }} color="text.secondary" gutterBottom>
            {userData?.email as string ?? 'Not set'}
          </Typography>
        </Box>
      </Box>
    </CardContent>
    <CardActions>
        <Button size="small" variant='outlined' onClick={handleOpenEditUserDialog}>Review</Button>
    </CardActions>
  </Card>
  )
}

export default UserList