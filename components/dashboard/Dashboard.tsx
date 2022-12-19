import { Box, Typography, Grid} from '@mui/material'
import React from 'react'
import useGetAdminData from '../../hooks/useGetAdminData'
import useGetDashboardData from '../../hooks/useGetDashboardData'
import Card from '../card'
import classes from './style'

const Dashboard = () => {
  
  const { overallUsersTotal, totalBooks, studentUsersTotal, professorUsersTotal, overallTransactionsTotal } = useGetDashboardData()
  const [refresh] = React.useState<boolean>(true)
  const {totalAdmins } = useGetAdminData({refresh})

  return (
    <Box sx={classes.dashboardMainContainer}>
       <Typography variant='h2'>
            Dashboard
       </Typography>
       <Box sx={classes.dashboardBodyContainer}>
          <Grid container spacing={3} columns={12}>
            <Grid item xs={4}>
              <Card routeName='users' title='Users in Application' total={overallUsersTotal}/>
            </Grid>
            <Grid item xs={4}>
              <Card routeName='books' title='Total Books' total={totalBooks}/>
            </Grid>
            <Grid item xs={4}>
              <Card routeName='admins' title='Admins' total={totalAdmins}/>
            </Grid>
          </Grid>

          <Grid container spacing={3} columns={12}>
            <Grid item xs={4}>
              <Card routeName='records' title='Records' total={overallTransactionsTotal}/>
            </Grid>
          </Grid>
       </Box>
    </Box>
  )
}

export default Dashboard