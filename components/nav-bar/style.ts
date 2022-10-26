import { SxProps } from "@mui/material";
import { COLORS, IMAGES } from '../../utils/app_constants'

const PROFILE_IMAGE_SIZES = '50'

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

const classes = {
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
      }
  
} as Record<string, SxProps>

export {userMenuPaperProps, classes}