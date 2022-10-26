import React from 'react'
import { Drawer, Toolbar, Box, List, ListItem, ListItemButton, ListItemIcon, Divider, ListItemText, Link } from '@mui/material'
import GridViewIcon from '@mui/icons-material/GridView';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { COLORS } from '../../utils/app_constants';
import { useRouter } from 'next/router';

const DRAWER_WIDTH = 300;

const SideBar = () => {

const router = useRouter()

const handleGoTo = (stringLink: string) => {
    router.push(stringLink)
}  

return (
    <Drawer
        variant="permanent"
        sx={{
          zIndex: 0,
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', marginTop: 1 }}>
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
                    <ListItemButton onClick={() => handleGoTo('/homepage/professors')}>
                        <ListItemIcon>
                        <PersonOutlineIcon /> 
                        </ListItemIcon>
                    <ListItemText primary={'Professors'} />
                        </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleGoTo('/homepage/students')}>
                    <ListItemIcon>
                        <PersonOutlineIcon /> 
                    </ListItemIcon>
                    <ListItemText primary={'Students'} />
                    </ListItemButton>
                </ListItem>
               
          </List>
        </Box>
      </Drawer>
  )
}

export default SideBar