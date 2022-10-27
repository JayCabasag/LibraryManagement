import { SxProps } from "@mui/material"

const classes = {
    professorMainContainer: {
        marginTop: 12,
        marginLeft: 5,
        marginRight: 5, 
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        width: '100%'
    },
    professorBodyContainer: {
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
    searchTextfield: {
        flexGrow: 1,
        '& .MuiInputBase-root': {
            height: 48
        }
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
    professorListContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 1
    }
} as Record<string, SxProps>

export default classes