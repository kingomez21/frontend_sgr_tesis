import { Box, Typography } from "@mui/material"
import { useContextUserAuth } from "../../store"
import { useEffect } from "react"
import { getPermission } from "../../hooks/getPermission"

const Inventory = () => {

    const setTitle = useContextUserAuth((state) => state.setTitle)
    //const permissions = useContextUserAuth((state) => state.permissions)
    const isOk = getPermission("modulo inventario")

    useEffect(() => {
        setTitle("GESTION DE INVENTARIO")
        
    }, [])
    return (
        isOk ? (
        <Box>
            <Typography>Funciona</Typography>
        </Box>
        ) : (
            <Typography>No tiene permisos</Typography>
        )
    )
}

export default Inventory