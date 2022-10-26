import { SxProps } from "@mui/material"
import { COLORS } from "../../utils/app_constants"

const classes = {
    cardContainer: {
        minHeight: '200px', 
        minWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        border: `1px solid ${COLORS.ALPHA_RED}`,
        borderRadius: '5px',
        boxShadow: 2,
        cursor: 'pointer'
    }
} as Record<string, SxProps>

export default classes