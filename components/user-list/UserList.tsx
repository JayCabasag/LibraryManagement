import { Card, CardContent, CardActions, Button, Typography} from '@mui/material'
import React from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'
import DeleteUserDialog from '../user-delete-dialog'
import EditUserDialog from '../user-edit-dialog'

interface UserListProps {
    fullname: string,
    userId: string,
    userType: string,
    userProfileImage: string
}

const UserList = ({fullname, userId, userType, userProfileImage}: UserListProps) => {

  const [openDeleteUserDialog, setOpenDeleteUserDialog] = React.useState<boolean>(false)
  const [openEditUserDialog, setOpenEditUserDialog] = React.useState<boolean>(false)

  const handleCloseDeleteUserDialog = () => {
    setOpenDeleteUserDialog(false)
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
      <EditUserDialog openEditUserDialog={openEditUserDialog} userDetails={{name: 'secret', id: 'secret', userType: 'secret'}} handleCloseEditUserDialog={handleCloseEditUserDialog} />
      <DeleteUserDialog openDeleteUserDialog={openDeleteUserDialog} userDetails={{name: 'Jay', fullname: 'Secret', id: 'idididi'}} handleCloseDeleteUserDialog={ handleCloseDeleteUserDialog} />
     <CardContent sx={{flex: 1, display: 'flex', alignItems: 'center', gap: 1}}>
      <Box>
        <Image src={userProfileImage} alt='Book cover' height={75} width={75} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {fullname}
        </Typography>
        <Typography variant='body1' sx={{fontSize: 15}}>Type: {userType}</Typography>
      </Box>
    </CardContent>
    <CardActions>
      <Button size="small" variant='outlined' onClick={handleOpenEditUserDialog}>Edit</Button>
      <Button size="small" variant='contained' onClick={handleOpenDeleteUserDialog}>Delete</Button>
    </CardActions>
  </Card>
  )
}

export default UserList