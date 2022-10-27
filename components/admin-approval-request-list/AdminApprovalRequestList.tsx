import { Box, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import DeclineAdminRequestDialog from '../admin-decline-request-dialog'
import ApproveAdminRequestDialog from '../admin-approve-request-dialog'

interface AdminApprovalRequestListProps {
    fullname: string,
    adminId: string,
    adminType: string,
    adminProfileImage: string
}

const AdminApprovalRequestList = ({fullname, adminId, adminType, adminProfileImage}: AdminApprovalRequestListProps) => {
  
  const [showDeclineAdminRequestDialog, setShowDeclineAdminRequestDialog] = React.useState<boolean>(false)
  const [showApproveAdminRequestDialog, setShowApproveAdminRequestDialog] = React.useState<boolean>(false)
  
  const handleShowDeclineAdminRequestDialog =  () => {
    setShowDeclineAdminRequestDialog(true)
  }
  const handleCloseDeclineAdminRequestDialog = () => {
    setShowDeclineAdminRequestDialog(false)
  }
  const handleOpenApproveAdminRequestDialog = () => {
    setShowApproveAdminRequestDialog(true)
  }

  const handleCloseApproveAdminRequestDialog = () => {
    setShowApproveAdminRequestDialog(false)
  }
  
  return (
    <Card sx={{ minWidth: '100%', display: 'flex', flexDirection: 'row'}} elevation={2}>
    
     {/* // Show dialog to edit Admin */}
      <DeclineAdminRequestDialog
            fullname={fullname}
            adminId={adminId}
            adminType={adminType}
            adminProfileImage={adminProfileImage}
            showDeclineAdminRequestDialog={showDeclineAdminRequestDialog}
            handleCloseDeclineAdminRequestDialog={handleCloseDeclineAdminRequestDialog}
          />

        {/* Show dialog to delete admin */}
          <ApproveAdminRequestDialog
            fullname={fullname}
            adminId={adminId}
            adminType={adminType}
            adminProfileImage={adminProfileImage}
            showApproveAdminRequestDialog={showApproveAdminRequestDialog}
            handleCloseApproveAdminRequestDialog={handleCloseApproveAdminRequestDialog}
          />

    <CardContent sx={{flex: 1, display: 'flex', alignItems: 'center', gap: 1}}>
      <Box>
        <Image src={adminProfileImage} alt='Profile' height={75} width={75} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {fullname}
        </Typography>
        <Typography variant='body1' sx={{fontSize: 15}}>Rank: {adminType}</Typography>
      </Box>
    </CardContent>
    <CardActions>
      <Button size="small" variant='outlined' onClick={handleShowDeclineAdminRequestDialog}>Decline</Button>
      <Button size="small" variant='contained' onClick={handleOpenApproveAdminRequestDialog}>Approve</Button>
    </CardActions>
  </Card>
  )
}

export default AdminApprovalRequestList