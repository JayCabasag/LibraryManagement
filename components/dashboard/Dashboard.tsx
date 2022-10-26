import { Box, Typography, Grid} from '@mui/material'
import React from 'react'
import Card from '../card'
import classes from './style'

const Dashboard = () => {
  return (
    <Box sx={classes.dashboardMainContainer}>
       <Typography variant='h2'>
            Dashboard
       </Typography>
       <Box sx={classes.dashboardBodyContainer}>
          <Grid container spacing={3} columns={12}>
            <Grid item xs={4}>
              <Card routeName='professors' title='Overall Users' total={20}/>
            </Grid>
            <Grid item xs={4}>
              <Card routeName='books' title='Total Books' total={20}/>
            </Grid>
            <Grid item xs={4}>
              <Card routeName='students' title='Student Users' total={20}/>
            </Grid>
          </Grid>

          <Grid container spacing={3} columns={12}>
            <Grid item xs={4}>
              <Card routeName='professors' title='Professor Users' total={20}/>
            </Grid>
            <Grid item xs={4}>
              <Card routeName='books' title='Borrowed Books' total={20}/>
            </Grid>
          </Grid>
       </Box>
    </Box>
  )
}

export default Dashboard