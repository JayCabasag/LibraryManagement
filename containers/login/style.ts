import { SxProps } from "@mui/material";
import { COLORS, IMAGES } from "../../utils/app_constants";

const MINIMUM_FIELD_CONTAINER_WIDTH = '420px'

const classes = {
    backgroundImageContainer: {
        height: '100%',
        width: '100%',
        position: 'absolute', 
        backgroundColor: 'red', 
        zIndex: -9, 
        backgroundImage: `url(${IMAGES.LOGIN_IMG_BACKGROUND_IMG})`
    },
    backgroundImageContainerBackdrop: {
        height: '100%', 
        width: '100%', 
        opacity: '.5'
    },
    headerText: {
        color: COLORS.RED,
        fontWeight: '700',
        paddingBottom: '10px'
    },
    loginContainer: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    fieldContainer: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: MINIMUM_FIELD_CONTAINER_WIDTH,
        padding: '20px',
        borderRadius: '5px',
        boxShadow: 3,
        gap: 1,
        background: COLORS.WHITE
    },
    inputTextField: {
        color: COLORS.BLACK,
    },
    loginButton: {
        padding: '12px 0',
        backgroundColor: COLORS.RED,
        border: `1px solid ${COLORS.RED}`,
       
    },
    loginSuccessDialog: {
        '.MuiDialog-paper': {
            padding: '10px'
        }
    },
    signUpButton: {
         padding: '12px 0',
         borderColor: COLORS.RED,
         color: COLORS.RED,
         '&:hover': {
            backgroundColor: COLORS.WHITE,
            border: `1px solid ${COLORS.RED}`,
            color: COLORS.RED
        }
    },
    loginCardContainer: { 
        minWidth: 400, 
        padding: 2 
    },
    actionButtonContainer: {
        display: 'flex', 
        flexDirection: 'column', 
        width: '100%', 
        gap: 1, 
        marginTop: 1
    }
} as Record<string, SxProps>

export default classes