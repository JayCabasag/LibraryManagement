import { Box, Typography, Grid} from '@mui/material'
import React from 'react'
import useGetDashboardData from '../../hooks/useGetDashboardData'
import Card from '../card'
import classes from './style'

const Dashboard = () => {
  
  const { overallUsersTotal, totalBooks, studentUsersTotal, professorUsersTotal, overallTransactionsTotal } = useGetDashboardData()

  return (
    <Box sx={classes.dashboardMainContainer}>
       <Typography variant='h2'>
            Dashboard
       </Typography>
       <Box sx={classes.dashboardBodyContainer}>
          <Grid container spacing={3} columns={12}>
            <Grid item xs={4}>
              <Card routeName='professors' title='Overall Users' total={overallUsersTotal}/>
            </Grid>
            <Grid item xs={4}>
              <Card routeName='books' title='Total Books' total={totalBooks}/>
            </Grid>
            <Grid item xs={4}>
              <Card routeName='students' title='Student Users' total={studentUsersTotal}/>
            </Grid>
          </Grid>

          <Grid container spacing={3} columns={12}>
            <Grid item xs={4}>
              <Card routeName='professors' title='Professor Users' total={professorUsersTotal}/>
            </Grid>
            <Grid item xs={4}>
              <Card routeName='books' title='Transactions' total={overallTransactionsTotal}/>
            </Grid>
          </Grid>
       </Box>
    </Box>
  )
}

export default Dashboard