import { Box, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import EditAdminDialog from '../admin-edit-dialog'
import DeleteAdminDialog from '../admin-delete-dialog'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../services/firebase-config'
import { doc, deleteDoc } from "firebase/firestore";

interface AdminStaffListProps {
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


const AdminStaffList = ({fullname, adminId, adminType, adminProfileImage, adminStatus, handleRefreshAdminList}: AdminStaffListProps) => {
  const [showEditAdminDialog, setShowEditAdminDialog] = React.useState<boolean>(false)
  const [showDeleteAdminDialog, setShowDeleteAdminDialog] = React.useState<boolean>(false)

  const hasAdminType = adminStatus === ADMIN_TYPE.ADMIN ||  adminStatus === ADMIN_TYPE.HEAD_ADMIN

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

  const handleCloseAfterDeleteAdminDialog = async () => {
    setShowDeleteAdminDialog(false)
    try {
        await deleteDoc(doc(db, "admins", adminId)).then(()=>{
          handleRefreshAdminList()
         }
        ).catch(() => {
          
        })
       } catch (error) {
       
       }
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
        <img src={adminProfileImage} alt='Profile' height={75} width={75} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {fullname}
        </Typography>
        <Typography variant='body1' sx={{fontSize: 15, textTransform: 'capitalize'}}>Rank: {adminType}</Typography>
      </Box>
    </CardContent>
    <CardActions>
      {
        hasAdminType && (<>
          <Button size="small" variant='outlined' onClick={handleShowEditAdminDialog}>Edit</Button>
          <Button size="small" variant='contained' onClick={handleOpenDeleteAdminDialog}>Delete</Button> 
        </>)
      }
    </CardActions>
  </Card>
  )
}

export default AdminStaffList