import { Card, CardContent, CardActions, Button, Typography} from '@mui/material'
import React from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'

interface UserListProps {
    fullname: string,
    userId: string,
    userType: string,
    userProfileImage: string
}

const UserList = ({fullname, userId, userType, userProfileImage}: UserListProps) => {
  return (
    <Card sx={{ minWidth: '100%', display: 'flex', flexDirection: 'row'}} elevation={2}>
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
      <Button size="small" variant='outlined'>Edit</Button>
      <Button size="small" variant='contained'>Delete</Button>
    </CardActions>
  </Card>
  )
}

export default UserList