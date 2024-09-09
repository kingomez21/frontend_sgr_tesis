import { Box, Button, Paper, Stack, Typography } from "@mui/material"
import { useContextUserAuth } from "../../store"
import { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import CompleteRegister from "./CompleteRegister"
import RegisterProvider from "./context/RegisterProvider"
import GetPermission from "../../hooks/GetPermission"
import FormAppointment from "./Forms/FormAppointment"
import FormRoute from "./Forms/FormRoute"
import FormGathering from "./Forms/FormGathering"
import FormClassification from "./Forms/FormClassification"
import FormRawMaterial from "./Forms/FormRawMaterial"

const Registers = () => {

    const navigate = useNavigate()
    const setTitle = useContextUserAuth((state) => state.setTitle)
    const isOk = GetPermission("modulo registro")

    useEffect(() => {
        setTitle("GESTION DE REGISTROS")
    },)

    return (
        isOk ? (
            <RegisterProvider>
                <Box>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        marginTop={5}
                    >
                    <Stack justifyContent="space-between" direction="row">
                        <Button onClick={() => navigate('crear-registro')} variant="contained">
                            <Typography>CREAR REGISTRO COMPLETO</Typography>
                        </Button>
                    </Stack>
                </Stack>
                
                <Stack marginLeft={5} marginRight={5}>

                    <Paper sx={{ marginTop: 2 }}>
                        <Stack justifyContent="space-between" direction="row">
                            <Typography>AQUI - LISTADO DE CITAS</Typography>
                            <Button sx={{ width: '216px' }} onClick={() => navigate('crear-cita')} variant="contained" >
                                <Typography> AÑADIR CITA </Typography>
                            </Button>
                        </Stack>
                    </Paper>
                </Stack>
                
                <Stack marginLeft={5} marginRight={5}>
                    <Paper sx={{ marginTop: 2 }}>
                        <Stack justifyContent="space-between" direction="row">
                            <Typography>AQUI - LISTADO DE RUTAS</Typography>
                            <Button sx={{ width: '216px' }} onClick={() => navigate('crear-ruta')} variant="contained" >
                                <Typography> AÑADIR RUTA </Typography>
                            </Button>
                        </Stack>
                    </Paper>
                </Stack>
                <Stack marginLeft={5} marginRight={5}>
                    <Paper sx={{ marginTop: 2 }}>
                    <Stack justifyContent="space-between" direction="row">
                    <Typography>AQUI - LISTADO DE RECOLECCIONES</Typography>
                        <Button sx={{ width: '216px' }} onClick={() => navigate('crear-recoleccion')} variant="contained" >
                            <Typography> AÑADIR RECOLECCIÓN</Typography>
                        </Button>
                    </Stack>
                    </Paper>
                </Stack>
                <Stack marginLeft={5} marginRight={5}>
                    <Paper sx={{ marginTop: 2 }}>
                    <Stack justifyContent="space-between" direction="row">
                    <Typography>AQUI - LISTADO DE MATERIA PRIMA</Typography>
                        <Button sx={{ width: '216px' }} onClick={() => navigate('crear-materiaprima')} variant="contained" >
                            <Typography> AÑADIR MATERIA PRIMA</Typography>
                        </Button>
                    </Stack>
                    </Paper>
                </Stack>
                <Stack marginLeft={5} marginRight={5}>
                    <Paper sx={{ marginTop: 2 }}>
                    <Stack justifyContent="space-between" direction="row">
                    <Typography>AQUI - LISTADO DE CLASIFICACIÓN</Typography>
                        <Button sx={{ width: '216px' }} onClick={() => navigate('crear-clasificacion')} variant="contained" >
                            <Typography> AÑADIR CLASIFICACIÓN</Typography>
                        </Button>
                    </Stack>
                    </Paper>
                </Stack>
                <br />
                <br />
                <Routes>
                    <Route path="/crear-cita" element={<FormAppointment />} />
                    <Route path="/crear-ruta" element={<FormRoute />} />
                    <Route path="/crear-recoleccion" element={<FormGathering />} />
                    <Route path="/crear-clasificacion" element={<FormClassification />} />
                    <Route path="/crear-registro" element={<CompleteRegister />} />
                    <Route path="/crear-materiaprima" element={<FormRawMaterial />} />
                </Routes>
            </Box>
            </RegisterProvider >

        ) : (
    <Typography>No tiene permisos</Typography>
)
    )
}

export default Registers