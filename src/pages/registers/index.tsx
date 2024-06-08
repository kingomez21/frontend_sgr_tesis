import { Box, Typography } from "@mui/material"
import { useContextUserAuth } from "../../store"
import { useEffect } from "react"
import { getPermission } from "../../hooks/getPermission"

const Registers = () => {

    const setTitle = useContextUserAuth((state) => state.setTitle)
    //const permissions = useContextUserAuth((state) => state.permissions)
    const isOk = getPermission("modulo registro")

    useEffect(() => {
        setTitle("GESTION DE REGISTROS")
        
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

export default Registers