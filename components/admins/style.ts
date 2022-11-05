import { SxProps } from "@mui/material"
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
    adminMainContainer: {
        marginLeft: 5,
        marginRight: 5, 
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        width: '100%'
    },
    adminBodyContainer: {
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,
        gap: 3,
        marginTop: 1,
        padding: 1
    },

    adminListContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 1,

    }
} as Record<string, SxProps>

export {classes, userMenuPaperProps}