import { Box, Button, Paper, Stack, Typography } from "@mui/material"
import ListProviderClient from "./ListProviderClient"
import ListUsers from "./ListUsers"
import { useContextUserAuth } from "../../store"
import { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import FormClient from "./FormClient"
import FormProvider from "./FormProvider"

const data = [
    {
        id: 1,
        name: "prueba"
    },
    {
        id: 2,
        name: "prueba"
    },
    {
        id: 3,
        name: "prueba"
    },
    {
        id: 4,
        name: "prueba"
    },
    {
        id: 5,
        name: "prueba"
    }
    ,
    {
        id: 6,
        name: "prueba"
    }
    ,
    {
        id: 7,
        name: "prueba"
    }
    ,
    {
        id: 8,
        name: "prueba"
    }
    ,
    {
        id: 9,
        name: "prueba"
    }
    ,
    {
        id: 10,
        name: "prueba"
    }
    ,
    {
        id: 11,
        name: "prueba"
    }
    ,
    {
        id: 12,
        name: "prueba"
    }
    ,
    {
        id: 13,
        name: "prueba"
    }
    ,
    {
        id: 14,
        name: "prueba"
    }
    ,
    {
        id: 15,
        name: "prueba"
    }
    ,
    {
        id: 16,
        name: "prueba"
    }
    ,
    {
        id: 17,
        name: "prueba"
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
            </Routes>
        </Box>
    )
}

export default Users