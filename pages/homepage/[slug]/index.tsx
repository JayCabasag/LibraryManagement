import React, {useState, useEffect} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {SxProps } from '@mui/material'
import Dashboard from '../../../components/dashboard'
import Books from '../../../components/books'
import Admins from '../../../components/admins'
import Profile from '../../../components/profile'
import Users from '../../../components/users'
import GridViewIcon from '@mui/icons-material/GridView';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {Toolbar, Box, Menu, MenuItem, Avatar, Divider, ListItemIcon, Typography} from '@mui/material'
import {Logout, Settings} from '@mui/icons-material';
import { IMAGES, COLORS } from '../../../utils/app_constants'
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from '../../../context/AuthContext';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Records from '../../../components/records';
import { db } from '../../../services/firebase-config';
import { getDoc, doc } from 'firebase/firestore';
import AuthenticatingLoading from '../../../components/loading/AuthenticatingLoading';

const DRAWER_WIDTH = 300;
const PROFILE_IMAGE_SIZES = '50'

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const classes = {
  homeContainer: {
      height: '85vh',
      width: '100%',
      display: 'flex',
      overflow: 'hidden'
  },
  navbarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
 },
  profileImageContainer: {
      border: '2px solid white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: PROFILE_IMAGE_SIZES,
      width: PROFILE_IMAGE_SIZES,
      borderRadius: '50%',
      overflow: 'hidden',
      cursor: 'pointer'
  },
  accountMenu: {
      marginTop: '10px'
  },
  userMenu: {
      '&.MuiMenu-paper': {}
  },
  adminText: {
    padding: '6px 10px'
  },
  adminWhiteBadge: {
    border: '1px solid white',
    cursor: 'pointer', 
    paddingLeft: 1, 
    paddingRight: 1, 
    borderRadius: '5px', 
    backgroundColor: COLORS.WHITE,
      color: COLORS.RED
    },
} as Record<string, SxProps>

const userMenuPaperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: `${DRAWER_WIDTH}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface IndexProps {
  authorize: any
}
const HomePage = ({authorize}: IndexProps) =>  {
  const theme = useTheme();
  const [openSidebar, setOpenSidebar] = React.useState(true);

  const router = useRouter()

  const { slug } = router.query
  const { user, logout, getAdminStatus } = useAuth()

  const handleDrawerOpen = () => {
    setOpenSidebar(true);
  };

  const handleDrawerClose = () => {
    setOpenSidebar(false);
  };

  const handleGoTo = (stringLink: string) => {
    router.push(stringLink)
  }  

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

  const [adminName, setAdminName] = useState<string>(user?.displayName || 'Admin')
  const [adminType, setAdminType] = useState<string>('')

  useEffect(() => {
    getAdminStatus(user.uid).then((response: any) => {
      setAdminType(response as string)
    }).catch(() => {
      setAdminType('Admin')
    })
  }, [user, getAdminStatus])

  const handleLogoutUser = async () => {
    await logout()
  }

  if(adminType === '' || adminType === 'requesting'){
    return (
      <AuthenticatingLoading message={"Please wait..."}/>
    )
  }

  return (
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <AppBar position="fixed" open={openSidebar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ ...(openSidebar && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Toolbar sx={{flex: 1}}>
            <Typography variant="h6" noWrap component="div">
              Techno Library
            </Typography>
            </Toolbar>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography>{adminName}</Typography>
                <Box sx={classes.adminWhiteBadge}><Typography sx={{textTransform: 'capitalize'}}>{adminType}</Typography></Box>
                <Box 
                  sx={classes.profileImageContainer} 
                  onClick={handleClick}
                  aria-controls="user-menu" 
                  aria-haspopup="true"
                 > 
                  <Image alt='profile' src={user.profileURL} onError={({currentTarget}) => {currentTarget.src = IMAGES.PROFILE_IMAGE_NOT_AVAILABLE}} height={45} width={45} />
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
                  <Typography variant='h6' sx={{textTransform: 'capitalize'}}>{adminType}</Typography>
                </Box>
                  <MenuItem onClick={() => {handleGoToProfile('/homepage/profile')}}>
                    <Avatar /> Account Profile
                  </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogoutUser}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={openSidebar}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
                <ListItem disablePadding>
                      <ListItemButton onClick={() => handleGoTo('/homepage/dashboard')}>
                      <ListItemIcon>
                          <GridViewIcon /> 
                      </ListItemIcon>
                      <ListItemText primary={'Dashboard'} />
                      </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding >
                      <ListItemButton onClick={() => handleGoTo('/homepage/books')}>
                          <ListItemIcon>
                              <LibraryBooksIcon /> 
                          </ListItemIcon>
                          <ListItemText primary={'Books'} />
                          </ListItemButton>
                  </ListItem>
          </List>
          <Divider />
          <List>
          <ListItem disablePadding>
                  <ListItemButton onClick={() => handleGoTo('/homepage/admins')}>
                          <ListItemIcon>
                              <PersonIcon /> 
                          </ListItemIcon>
                          <ListItemText primary={'Admins'} />
                          </ListItemButton>
                  </ListItem>
  
                  <ListItem disablePadding>
                      <ListItemButton onClick={() => handleGoTo('/homepage/users')}>
                      <ListItemIcon>
                          <PersonOutlineIcon /> 
                      </ListItemIcon>
                      <ListItemText primary={'Users'} />
                      </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                      <ListItemButton onClick={() => handleGoTo('/homepage/records')}>
                      <ListItemIcon>
                          <HowToRegIcon /> 
                      </ListItemIcon>
                      <ListItemText primary={'Records'} />
                      </ListItemButton>
                  </ListItem>
          </List>
        </Drawer>
        <Main open={openSidebar}>
          <DrawerHeader />
          <Box sx={classes.homeContainer}>
              {
                  slug === undefined && (
                      <Dashboard />
                  )
              }
              {
                  slug === 'dashboard' && (
                      <Dashboard />
                  )
              }
                  {
                  slug === 'books' && (
                      <Books />
                  )
              }
                  {
                  slug === 'admins' && (
                      <Admins/>
                  )
              }
                  {
                  slug === 'users' && (
                      <Users />
                  )
              }
                  {
                  slug === 'records' && (
                      <Records />
                  )
              }
                  {
                  slug === 'profile' && (
                      <Profile />
                  )
              }
              </Box> 
        </Main>
      </Box>
    );
}

export default HomePage