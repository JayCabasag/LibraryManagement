import { Box, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import EditAdminDialog from '../admin-edit-dialog'
import DeleteAdminDialog from '../admin-delete-dialog'
import { useAuth } from '../../context/AuthContext'
interface AdminListProps {
    fullname: string,
    adminId: string,
    adminType: string,
    adminProfileImage: string,
    adminStatus: string,
    handleRefreshAdminList: () => void
}

enum ADMIN_TYPE {
  HEAD_ADMIN = 'head admin',
  ADMIN = 'admin',
  STAFF = 'staff',
  REQUESTIONG_FOR_ADMIN = 'requesting'
}

const AdminList = ({fullname, adminId, adminType, adminProfileImage, adminStatus, handleRefreshAdminList}: AdminListProps) => {
  const hasHeadAdminType = adminStatus === ADMIN_TYPE.HEAD_ADMIN

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

  const handleCloseAfterDeleteAdminDialog = () => {
    setShowDeleteAdminDialog(false)
    alert('Deleted' + adminId + ' ')
  }

  const handleCloseAfterEditAdminDialog = () => {
    setShowEditAdminDialog(false)
    handleRefreshAdminList()
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
          handleCloseAfterEditAdminDialog={handleCloseAfterEditAdminDialog}
        />

      {/* Show dialog to delete admin */}
        <DeleteAdminDialog 
          fullname={fullname}
          adminId={adminId}
          adminType={adminType}
          adminProfileImage={adminProfileImage}
          showDeleteAdminDialog={showDeleteAdminDialog}
          handleCloseDeleteAdminDialog={handleCloseDeleteAdminDialog}
          handleCloseAfterDeleteAdminDialog={handleCloseAfterDeleteAdminDialog}
        />
        
    <CardContent sx={{flex: 1, display: 'flex', alignItems: 'center', gap: 1}}>
      <Box>
        <Image src={adminProfileImage} alt='Profile' height={75} width={75} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {fullname}
        </Typography>
        <Typography variant='body1' sx={{fontSize: 15, textTransform: 'capitalize'}}>Rank: {adminType}</Typography>
      </Box>
    </CardContent>
    {
      hasHeadAdminType && (
        <CardActions>
          <Button size="small" variant='outlined' onClick={handleShowEditAdminDialog}>Edit</Button>
        </CardActions>
      )
    }
    
  </Card>
  )
}

export default AdminList