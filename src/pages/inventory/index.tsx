import { Box, Typography } from "@mui/material"
import { useContextUserAuth } from "../../store"
import { useEffect } from "react"

const Inventory = () => {
    const setTitle = useContextUserAuth((state) => state.setTitle)

    useEffect(() => {
        setTitle("GESTION DE INVENTARIO")
        
    }, [])
    return (
        <Box>
            <Typography>Funciona</Typography>
        </Box>
    )
}

export default Inventory