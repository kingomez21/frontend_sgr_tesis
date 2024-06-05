import { Box, Typography } from "@mui/material"
import { useEffect } from "react"
import { useContextUserAuth } from "../../store"

const Reports = () => {

    const setTitle = useContextUserAuth((state) => state.setTitle)

    useEffect(() => {
        setTitle("GESTION DE REPORTES")
        
    }, [])
    return (
        <Box>
            <Typography>Funciona</Typography>
        </Box>
    )
}

export default Reports