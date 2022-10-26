import { SxProps } from "@mui/material"

const classes = {
    studentMainContainer: {
        marginTop: 12,
        marginLeft: 5,
        marginRight: 5, 
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        width: '100%'
    },
    studentBodyContainer: {
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
    searchContainer: {
        display: 'flex',
        width: '100%',
        gap: 1
    },
    searchButton: {
        paddingLeft: 5,
        paddingRight: 5
    },
    studentListContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 1
    }
} as Record<string, SxProps>

export default classes