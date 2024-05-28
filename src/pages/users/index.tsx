import { Box, Button, Paper, Stack, Typography } from "@mui/material"
import ListProviderClient from "./ListProviderClient"
import ListUsers from "./ListUsers"
import { useContextUserAuth } from "../../store"
import { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import FormClient from "./FormClient"
import FormProvider from "./FormProvider"
import VerClientProvider from "./VerClientProvider"
import VerUsers from "./VerUsers"

const data = [
    {
        id: 1,
        name: "prueba",
        type: "proveedor"
    },
    {
        id: 2,
        name: "prueba",
        type: "proveedor"
    }

]

const Users = () => {
    const navigate = useNavigate()
    const setTitle = useContextUserAuth((state) => state.setTitle)
    useEffect(() => {
        setTitle("GESTION DE USUARIOS")
    })
    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                marginTop={5}
            >
                <Button onClick={() => navigate('crear-cliente')} variant="contained" >
                    <Typography> CREAR CLIENTES </Typography>
                </Button>
                <Button onClick={() => navigate('crear-proveedor')} variant="contained" >
                    <Typography> CREAR PROVEEDOR </Typography>
                </Button>
            </Stack>
            <Stack direction="row" justifyContent="space-between" marginLeft={5} marginRight={5} marginTop={5}>
                <Typography>
                    LISTADO DE PROVEEDORES Y CLIENTES
                </Typography>
                <Stack
                    direction="row"
                    spacing={2}
                >

                    <Typography>CANTIDAD: 3 </Typography>
                    <Typography>CLIENTES: 3 </Typography>
                    <Typography>PROVEEDOR: 3 </Typography>

                </Stack>
            </Stack>
            <Stack marginLeft={5} marginRight={5}>
                <Paper sx={{ marginTop: 5 }}>
                    <ListProviderClient data={data} />
                </Paper>
            </Stack>
            <Stack direction="row" justifyContent="space-between" marginLeft={5} marginRight={5} marginTop={5}>
                <Typography>
                    LISTADO DE USUARIOS
                </Typography>
                <Stack
                    direction="row"
                    spacing={2}
                >

                    <Typography>CANTIDAD: 3 </Typography>
                    <Typography>ACTIVOS: 3 </Typography>
                    <Typography>DESPEDIDO: 3 </Typography>

                </Stack>
            </Stack>
            <Stack marginLeft={5} marginRight={5}>
                <Paper sx={{ marginTop: 5 }}>
                <ListUsers data={data} />
                </Paper>
            </Stack>
            <br />
            <br />
            <Routes>
                <Route path="/crear-cliente" element={<FormClient />} />
                <Route path="/crear-proveedor" element={<FormProvider />} />
                <Route path="/:type/:id" element={<VerClientProvider />} />
                <Route path="/empleado/:id" element={<VerUsers />} />
            </Routes>
        </Box>
    )
}

export default Users