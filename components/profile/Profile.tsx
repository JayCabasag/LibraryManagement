import { Box, Typography, Card, CardActionArea, CardActions, CardMedia, CardContent, Button, TextField} from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { IMAGES } from '../../utils/app_constants'
import classes from './style'

const Profile = () => {
  return (
    <Box sx={classes.profileMainContainer}>
       <Typography variant='h2'>
            Profile
       </Typography>
       <Box sx={classes.profileBodyContainer}>
       <Card sx={{ width: '100%', padding: 3, overflowY: 'auto', overflowX: 'hidden'}}>
          <CardActionArea sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Image src={IMAGES.PROFILE_IMAGE_NOT_AVAILABLE} alt='profile' height={200} width={200}/>
            <CardContent>
              <Typography gutterBottom variant="h2" component="div">
                Admin name
              </Typography>
              <Typography>Admin</Typography>
            </CardContent>
          </CardActionArea>
          <CardContent sx={classes.profileCardContent}>
            <Box sx={{display: 'flex', flexDirection: 'column',gap: 1, flex: 1}}>
              <Typography variant='h4'>Login Information</Typography>
              <TextField id="outlined-basic" label="Username/Employee No." variant="outlined" type='text' sx={classes.inputTextField}/>
              <TextField id="outlined-basic" label="Email" variant="outlined" type='email' sx={classes.inputTextField} />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, flex: 1}}>
              <Typography variant='h4'>Personal Information</Typography>
                    <TextField id="outlined-basic" label="Firstname" variant="outlined" type='text' sx={classes.inputTextField}/>
                    <TextField id="outlined-basic" label="Middlename" variant="outlined" type='text' sx={classes.inputTextField} />
                    <TextField id="outlined-basic" label="Lastname" variant="outlined" type='text' sx={classes.inputTextField} />
            </Box>
          </CardContent>
          <CardActions sx={{display: 'flex', width: '100%'}}>
            <Button size="large" variant='outlined' color="primary">
             Change password
            </Button>
            <Button size="large" variant='contained' color="primary">
              Save
            </Button>
          </CardActions>
        </Card>
       </Box>
    </Box>
  )
}

export default Profile