import { Box, Typography } from "@mui/material"
import { useContextUserAuth } from "../../store"
import { useEffect } from "react"

const Registers = () => {

    const setTitle = useContextUserAuth((state) => state.setTitle)

    useEffect(() => {
        setTitle("GESTION DE REGISTROS")
        
    }, [])
    return (
        <Box>
            <Typography>Funciona</Typography>
        </Box>
    )
}

export default Registers