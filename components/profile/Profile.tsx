import { Box, Typography, Card, CardActionArea, CardActions, Tooltip, CardContent, Button, TextField, InputAdornment, IconButton} from '@mui/material'
import Image from 'next/image'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { IMAGES } from '../../utils/app_constants'
import classes from './style'

const Profile = () => {

  const {user, getAdminStatus} = useAuth()
  const [showCopiedTooltip, setShowCopiedTooltip] = React.useState<boolean>(false)
  const [adminType, setAdminType] = React.useState<string>('Admin')

  React.useEffect(() => {
    getAdminStatus(user.uid).then((response: any) => {
      setAdminType(response as string)
    }).catch(() => {
      setAdminType('Admin')
    })
  }, [user, getAdminStatus])

  const handleCopyUid = () => {
    navigator.clipboard.writeText(user.uid).then(()=> {
      setShowCopiedTooltip(true)
    })
  }

  const handleCloseTooltip = () => {
    setShowCopiedTooltip(false)
  }

  return (
    <Box sx={classes.profileMainContainer}>
       <Typography variant='h2'>
            Profile
       </Typography>
       <Box sx={classes.profileBodyContainer}>
       <Card sx={{ width: '100%', padding: 3, overflowY: 'auto', overflowX: 'hidden'}}>
          <CardActionArea sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Image 
              src={user.profileURL} 
              alt='profile' 
              height={200}
              width={200} 
              onError={({currentTarget}) => {
                currentTarget.src = IMAGES.PROFILE_IMAGE_NOT_AVAILABLE
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h2" component="div" sx={{textTransform: 'capitalize'}}>
                {user.displayName}
              </Typography>
              <Typography sx={{textTransform: 'capitalize'}}>{adminType}</Typography>
            </CardContent>
          </CardActionArea>
          <CardContent sx={classes.profileCardContent}>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, flex: 1}}>
              <Typography variant='h4'>Personal Information</Typography>
                    <TextField id="outlined-basic" label="UId" variant="outlined" type='text' sx={classes.inputTextField} defaultValue={user.uid} disabled 
                      InputProps={{
                        endAdornment: (
                          <Tooltip title="Copied" placement="bottom" arrow open={showCopiedTooltip} onClose={handleCloseTooltip}>
                             <InputAdornment position='end'>
                                <IconButton onClick={handleCopyUid}>
                                  <ContentCopyIcon />
                                </IconButton>
                              </InputAdornment>
                          </Tooltip>
                        )
                      }}
                    />
                   
                    <TextField id="outlined-basic" label="Name" variant="outlined" type='text' sx={classes.inputTextField} defaultValue={user.displayName}/>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column',gap: 1, flex: 1}}>
              <Typography variant='h4'>Login Information</Typography>
              <TextField id="outlined-basic" label="Email" variant="outlined" type='email' sx={classes.inputTextField} defaultValue={user.email}/>
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