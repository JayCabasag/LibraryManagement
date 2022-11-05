import { SxProps } from "@mui/material"

const classes = {
    profileMainContainer: {
        marginLeft: 5,
        marginRight: 5, 
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        width: '100%'
    },
    profileBodyContainer: {
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        gap: 3,
        marginTop: 1,
        padding: 1
    },
    searchAndAddBookContainer: {
        display: 'flex',
        width: '100%',
        gap: 1
    },
    addBookButton: {
        paddingLeft: 5,
        paddingRight: 5
    }, 
    profileCardContent: {
        display: 'flex', 
        width: '100%', 
        gap: 2
    }
} as Record<string, SxProps>

export default classes