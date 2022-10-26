import { SxProps } from "@mui/material"

const classes = {
    dashboardMainContainer: {
        marginTop: 12,
        marginLeft: 5,
        marginRight: 5, 
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        width: '100%'
    },
    dashboardBodyContainer: {
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,
        gap: 3
    }
} as Record<string, SxProps>

export default classes