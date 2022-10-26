import React, { useState} from 'react'
import { AppBar, Container, Toolbar, Box, Menu, MenuItem, Avatar, Divider, ListItemIcon, Typography} from '@mui/material'
import {Logout, Settings} from '@mui/icons-material';
import { IMAGES } from '../../utils/app_constants'
import { userMenuPaperProps, classes } from './style';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Navbar = () => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoToProfile = (stringLink: string) => {
    router.push(stringLink)
  }

  const [adminName, setAdminName] = useState<string>('Admin')
  const [adminType, setAdminType] = useState<string>('Wala lang')
  return (
    <AppBar position="fixed" sx={{zIndex: 99, padding: '5px'}}>
         <Container maxWidth="xl" sx={classes.navbarContainer}>
            <Toolbar>
              TCU Mobile Library
            </Toolbar>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography>{adminName}</Typography>
              <Box sx={classes.adminWhiteBadge}>{adminType}</Box>
              <Box 
                sx={classes.profileImageContainer} 
                onClick={handleClick}
                aria-controls="user-menu" 
                aria-haspopup="true"
               > 
                <Image alt='profile' src={IMAGES.PROFILE_IMAGE_NOT_AVAILABLE} height={45} width={45} />
              </Box>
            </Box>
           
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={userMenuPaperProps}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={classes.adminText}>
                <Typography variant='h6'>{adminType}</Typography>
              </Box>
                <MenuItem onClick={() => {handleGoToProfile('/homepage/profile')}}>
                  <Avatar /> Profile
                </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Account Settings
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
         </Container>
    </AppBar>
  )
}

export default Navbar