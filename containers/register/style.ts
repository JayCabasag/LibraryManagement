import { SxProps } from "@mui/material";
import { COLORS, IMAGES } from "../../utils/app_constants";

const MINIMUM_FIELD_CONTAINER_WIDTH = '650px'

const classes = {
    backgroundImageContainer: {
        height: '100%',
        width: '100%',
        position: 'fixed', 
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
    signUpContainer: {
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
        padding: '40px',
        borderRadius: '5px',
        boxShadow: 3,
        gap: 1,
        background: COLORS.WHITE,
        paddingBottom: '30px'
    },
    inputTextField: {
        color: COLORS.BLACK,
    },
    signUpButton: {
         padding: '12px 0',
         borderColor: COLORS.RED,
         backgroundColor: COLORS.RED,
         color: COLORS.WHITE,
         '&:hover': {
            backgroundColor: COLORS.WHITE,
            border: `1px solid ${COLORS.RED}`,
            color: COLORS.RED
        }
    }
} as Record<string, SxProps>

export default classes