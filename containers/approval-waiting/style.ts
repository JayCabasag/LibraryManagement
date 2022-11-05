import { SxProps } from "@mui/material";

const classes = {
    mainContainer: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
} as Record<string, SxProps>

export default classes

