import { Box, Typography } from "@mui/material"
import { useContextUserAuth } from "../../store"
import { useEffect } from "react"

const History = () => {
    const setTitle = useContextUserAuth((state) => state.setTitle)

    useEffect(() => {
        setTitle("GESTION DE HISTORIAL")
        
    }, [])
    return(
        <Box>
            <Typography>Funciona</Typography>
        </Box>
    )
}

export default History