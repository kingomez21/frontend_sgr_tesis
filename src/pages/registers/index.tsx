import { Box, Button, Paper, Stack, Typography } from "@mui/material"
import { useContextUserAuth } from "../../store"
import { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
//import RefreshIcon from "@mui/icons-material/Refresh"
import CompleteRegister from "./CompleteRegister"
import RegisterProvider from "./context/RegisterProvider"
import GetPermission from "../../hooks/GetPermission"
import FormAppointment from "./Forms/FormAppointment"
import FormRoute from "./Forms/FormRoute"
import FormGathering from "./Forms/FormGathering"
import FormClassification from "./Forms/FormClassification"
import FormRawMaterial from "./Forms/FormRawMaterial"
import useRegisterContext from "./context/useRegisterContext"
import ListAppointments from "./Lists/ListAppointments"
import ListRoutes from "./Lists/ListRoutes"
import ListCollections from "./Lists/ListCollections"

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
                    <br />
                    <br />
                    <br />


                    <Stack marginLeft={5} marginRight={5}>
                        <Stack justifyContent="space-between" direction="row">
                            <Typography>LISTADO DE CITAS</Typography>
                            <Stack direction="row" spacing={2}>
                                <Button sx={{ width: '216px' }} onClick={() => navigate('crear-cita')} variant="contained" >
                                    <Typography> AÑADIR CITA </Typography>
                                </Button>
                                <Button variant="contained">
                                    <Typography>VER LISTADO COMPLETO</Typography>
                                </Button>
                            </Stack>
                        </Stack>
                        <Paper sx={{ marginTop: 2 }}>
                            <ViewListAppointments />
                        </Paper>
                    </Stack>
                    <br />
                    <br />
                    <Stack marginLeft={5} marginRight={5}>

                        <Stack justifyContent="space-between" direction="row">
                            <Typography>LISTADO DE RUTAS</Typography>
                            <Stack direction="row" spacing={2}>
                                <Button sx={{ width: '216px' }} onClick={() => navigate('crear-ruta')} variant="contained" >
                                    <Typography> AÑADIR RUTA </Typography>
                                </Button>
                                <Button variant="contained">
                                    <Typography>VER LISTADO COMPLETO</Typography>
                                </Button>
                            </Stack>
                        </Stack>
                        <Paper sx={{ marginTop: 2 }}>
                            <ViewListRoutes />
                        </Paper>
                    </Stack>
                    <br />
                    <br />
                    <Stack marginLeft={5} marginRight={5}>

                        <Stack justifyContent="space-between" direction="row">
                            <Typography>LISTADO DE RECOLECCIONES</Typography>
                            <Stack direction="row" spacing={2}>
                                <Button sx={{ width: '216px' }} onClick={() => navigate('crear-recoleccion')} variant="contained" >
                                    <Typography> AÑADIR RECOLECCIÓN</Typography>
                                </Button>
                                <Button variant="contained">
                                    <Typography>VER LISTADO COMPLETO</Typography>
                                </Button>
                            </Stack>
                        </Stack>
                        <Paper sx={{ marginTop: 2 }}>
                            <ViewListCollections />
                        </Paper>
                    </Stack>
                    <br />
                    <br />
                    <Stack marginLeft={5} marginRight={5}>

                        <Stack justifyContent="space-between" direction="row">
                            <Typography>AQUI - LISTADO DE MATERIA PRIMA</Typography>
                            <Stack direction="row" spacing={2}>
                                <Button sx={{ width: '216px' }} onClick={() => navigate('crear-materiaprima')} variant="contained" >
                                    <Typography> AÑADIR MATERIA PRIMA</Typography>
                                </Button>
                                <Button variant="contained">
                                    <Typography>VER LISTADO COMPLETO</Typography>
                                </Button>
                            </Stack>
                        </Stack>
                        <Paper sx={{ marginTop: 2 }}>
                        </Paper>
                    </Stack>
                    <br />
                    <br />
                    <Stack marginLeft={5} marginRight={5}>
                        <Stack justifyContent="space-between" direction="row">
                            <Typography>AQUI - LISTADO DE CLASIFICACIÓN</Typography>
                            <Stack direction="row" spacing={2}>
                                <Button sx={{ width: '216px' }} onClick={() => navigate('crear-clasificacion')} variant="contained" >
                                    <Typography> AÑADIR CLASIFICACIÓN</Typography>
                                </Button>
                                <Button variant="contained">
                                    <Typography>VER LISTADO COMPLETO</Typography>
                                </Button>
                            </Stack>
                        </Stack>
                        <Paper sx={{ marginTop: 2 }}>
                        </Paper>
                    </Stack>
                    <br />
                    <br />
                    <Routes>
                        <Route path="/crear-cita" element={<FormAppointment />} />
                        <Route path="/listado-citas" />
                        <Route path="/crear-ruta" element={<FormRoute />} />
                        <Route path="/listado-rutas" />
                        <Route path="/crear-recoleccion" element={<FormGathering />} />
                        <Route path="/listado-recolecciones" />
                        <Route path="/crear-materiaprima" element={<FormRawMaterial />} />
                        <Route path="/listado-materia-prima" />
                        <Route path="/crear-clasificacion" element={<FormClassification />} />
                        <Route path="/listado-clasificaciones" />
                        <Route path="/crear-registro" element={<CompleteRegister />} />
                    </Routes>
                </Box>
            </RegisterProvider >

        ) : (
            <Typography>No tiene permisos</Typography>
        )
    )
}

const ViewListAppointments = () => {

    const { appointments } = useRegisterContext()

    return (
        <ListAppointments data={appointments.slice(0, 6)} />
    )
}

const ViewListRoutes = () => {

    const { routes } = useRegisterContext()

    return (
        <ListRoutes data={routes.slice(0, 6)} />
    )
}

const ViewListCollections = () => {

    const { collections } = useRegisterContext()

    return (
        <ListCollections data={collections.slice(0, 6)} />
    )
}

export default Registers