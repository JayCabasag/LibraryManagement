import { Box, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import EditAdminDialog from '../admin-edit-dialog'
import DeleteAdminDialog from '../admin-delete-dialog'
interface AdminListProps {
    fullname: string,
    adminId: string,
    adminType: string,
    adminProfileImage: string
}

enum ADMIN_TYPE {
  HEAD_ADMIN = 'Head Admin',
  ADMIN = 'Admin',
  STAFF = 'Staff',
  REQUESTIONG_FOR_ADMIN = 'Requesting'
}

const AdminList = ({fullname, adminId, adminType, adminProfileImage}: AdminListProps) => {
  const hasHeadAdminType = adminType === ADMIN_TYPE.HEAD_ADMIN

  const [showEditAdminDialog, setShowEditAdminDialog] = React.useState<boolean>(false)
  const [showDeleteAdminDialog, setShowDeleteAdminDialog] = React.useState<boolean>(false)
  
  const handleShowEditAdminDialog =  () => {
    setShowEditAdminDialog(true)
  }
  const handleCloseEditAdminDialog = () => {
    setShowEditAdminDialog(false)
  }
  const handleOpenDeleteAdminDialog = () => {
    setShowDeleteAdminDialog(true)
  }

  const handleCloseDeleteAdminDialog = () => {
    setShowDeleteAdminDialog(false)
  }

  return (
    <Card sx={{ minWidth: '100%', display: 'flex', flexDirection: 'row'}} elevation={2}>
     {/* // Show dialog to edit Admin */}
        <EditAdminDialog 
          fullname={fullname}
          adminId={adminId}
          adminType={adminType}
          adminProfileImage={adminProfileImage}
          showEditAdminDialog={showEditAdminDialog}
          handleCloseEditAdminDialog={handleCloseEditAdminDialog}
        />

      {/* Show dialog to delete admin */}
        <DeleteAdminDialog 
          fullname={fullname}
          adminId={adminId}
          adminType={adminType}
          adminProfileImage={adminProfileImage}
          showDeleteAdminDialog={showDeleteAdminDialog}
          handleCloseDeleteAdminDialog={handleCloseDeleteAdminDialog}
        />
        
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
    {
      !hasHeadAdminType && (
        <CardActions>
          <Button size="small" variant='outlined' onClick={handleShowEditAdminDialog}>Edit</Button>
        </CardActions>
      )
    }
    
  </Card>
  )
}

export default AdminList