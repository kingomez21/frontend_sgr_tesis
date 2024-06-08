import { Box, Typography } from "@mui/material"
import { useEffect } from "react"
import { useContextUserAuth } from "../../store"
import { getPermission } from "../../hooks/getPermission"

const Reports = () => {

    const setTitle = useContextUserAuth((state) => state.setTitle)
    //const permissions = useContextUserAuth((state) => state.permissions)
    const isOk = getPermission("modulo reporte")

    useEffect(() => {
        setTitle("GESTION DE REPORTES")
    }, [])
    return (
        isOk ?(
        <Box>
            <Typography>Funciona</Typography>
        </Box>
        ) :
        <Typography>No tiene permisos</Typography>
    )
}

export default Reports