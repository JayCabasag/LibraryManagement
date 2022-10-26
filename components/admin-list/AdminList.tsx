import { Box, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'

interface AdminListProps {
    fullname: string,
    adminId: string,
    adminType: string,
    adminProfileImage: string
}

const AdminList = ({fullname, adminId, adminType, adminProfileImage}: AdminListProps) => {
  return (
    <Card sx={{ minWidth: '100%', display: 'flex', flexDirection: 'row'}} elevation={2}>
    <CardContent sx={{flex: 1, display: 'flex', alignItems: 'center', gap: 1}}>
      <Box>
        <Image src={adminProfileImage} alt='Book cover' height={75} width={75} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {fullname}
        </Typography>
        <Typography variant='body1' sx={{fontSize: 15}}>Rank: {adminType}</Typography>
      </Box>
    </CardContent>
    <CardActions>
      <Button size="small" variant='outlined'>Edit</Button>
    </CardActions>
  </Card>
  )
}

export default AdminList