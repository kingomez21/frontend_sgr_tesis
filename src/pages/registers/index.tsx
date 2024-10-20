import { Box, Button, IconButton, InputAdornment, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material"
import { useContextUserAuth } from "../../store"
import { useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import RefreshIcon from "@mui/icons-material/Refresh"
import SearchIcon from '@mui/icons-material/Search';
//import CompleteRegister from "./CompleteRegister"
import RegisterProvider from "./context/RegisterProvider"
import GetPermission from "../../hooks/getPermission"
import FormAppointment from "./Forms/FormAppointment"
import FormRoute from "./Forms/FormRoute"
import FormGathering from "./Forms/FormGathering"
import FormClassification from "./Forms/FormClassification"
import FormRawMaterial from "./Forms/FormRawMaterial"
import useRegisterContext from "./context/useRegisterContext"
import ListAppointments from "./Lists/ListAppointments"
import ListRoutes from "./Lists/ListRoutes"
import ListCollections from "./Lists/ListCollections"
import ListRawMaterials from "./Lists/ListRawMaterials"
import ViewFormAppointment from "./Views/ViewFormAppointment"
import ViewFormRoute from "./Views/ViewFormRoute"
import ViewFormGathering from "./Views/ViewFormGathering"
import ViewFormRawMaterial from "./Views/ViewFormRawMaterial"
import Fuse from "fuse.js"
import FormRegisterFast from "./FormRegisterFast"

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
                        <Stack justifyContent="space-between" direction="row" spacing={2}>
                            <Button onClick={() => navigate('crear-registro')} variant="contained">
                                <Typography>REGISTRO RÁPIDO</Typography>
                            </Button>
                            <ValidationClassification />
                        </Stack>
                    </Stack>
                    <br />
                    <br />
                    <br />


                    <Stack marginLeft={5} marginRight={5}>
                        <Stack justifyContent="space-between" direction="row">
                            <Typography>LISTADO DE CITAS - PENDIENTES</Typography>
                            <Stack direction="row" spacing={2}>
                                <Button sx={{ width: '216px' }} onClick={() => navigate('crear-cita')} variant="contained" >
                                    <Typography> AÑADIR CITA </Typography>
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
                            <Typography>LISTADO DE RUTAS - PENDIENTES</Typography>
                            <Stack direction="row" spacing={2}>
                                <Button sx={{ width: '216px' }} onClick={() => navigate('crear-ruta')} variant="contained" >
                                    <Typography> AÑADIR RUTA </Typography>
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
                            <Typography>LISTADO DE RECOLECCIONES - PENDIENTES</Typography>
                            <Stack direction="row" spacing={2}>
                                <Button sx={{ width: '216px' }} onClick={() => navigate('crear-recoleccion')} variant="contained" >
                                    <Typography> AÑADIR RECOLECCIÓN</Typography>
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
                            <Typography>LISTADO DE MATERIAS PRIMAS - PENDIENTES</Typography>
                            <Stack direction="row" spacing={2}>
                                <Button sx={{ width: '216px' }} onClick={() => navigate('crear-materiaprima')} variant="contained" >
                                    <Typography> AÑADIR MATERIA PRIMA</Typography>
                                </Button>
                            </Stack>
                        </Stack>
                        <Paper sx={{ marginTop: 2 }}>
                            <ViewListRawMaterials />
                        </Paper>
                    </Stack>
                    <br />
                    <br />
                    <Routes>
                        <Route path="/crear-cita" element={<FormAppointment />} />
                        <Route path="/editar-cita/:id" element={<ViewFormAppointment />} />
                        <Route path="/crear-ruta" element={<FormRoute />} />
                        <Route path="/editar-ruta/:id" element={<ViewFormRoute />} />
                        <Route path="/crear-recoleccion" element={<FormGathering />} />
                        <Route path="/editar-recoleccion/:id" element={<ViewFormGathering />} />
                        <Route path="/crear-materiaprima" element={<FormRawMaterial />} />
                        <Route path="/editar-materiaprima/:id" element={<ViewFormRawMaterial />} />
                        <Route path="/crear-clasificacion" element={<FormClassification />} />
                        <Route path="/listado-clasificaciones" />
                        {/* <Route path="/crear-registro" element={<CompleteRegister />} /> */}
                        <Route path="/crear-registro" element={<FormRegisterFast />} />
                    </Routes>
                </Box>
            </RegisterProvider >

        ) : (
            <Typography>No tiene permisos</Typography>
        )
    )
}

const optionsFuseAppointment = {
    includeScore: true,
    keys: ['id', 'provider', 'meetDate', 'meetPlace']
}

const optionsFuseRoute = {
    includeScore: true,
    keys: ['id', 'idDate.meetDate', 'initPlace', 'destinyPlace']
}

const optionsFuseGathering = {
    includeScore: true,
    keys: ['id', 'idRoute.initPlace', 'idRoute.destinyPlace', 'materialsQuantity', 'spentMoney', 'idPayType.platformName']
}

const optionsFuseRawMaterial = {
    includeScore: true,
    keys: ['id', 'idCollection.id', 'idMaterialType.name', 'kgQuantity', 'materialPricePerKg']
}

const ViewListAppointments = () => {

    const { appointments } = useRegisterContext()
    const [search, setSearch] = useState("")

    const fuse = new Fuse(appointments, optionsFuseAppointment)

    return (
        <Stack direction="column" justifyContent="space-between">
            <Stack direction="row" justifyContent="space-between">
                <TextField
                    label="Buscador"
                    sx={{ width: "50%", marginLeft: "1%" }}
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar cita"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton ><SearchIcon /></IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button size="large" startIcon={<RefreshIcon />} ></Button>
            </Stack>
            <ListAppointments data={(search === null || search === "") ? appointments : fuse.search(search).map((value) => value.item)} />
        </Stack>
    )
}

const ViewListRoutes = () => {

    const { routes } = useRegisterContext()
    const [search, setSearch] = useState("")

    const fuse = new Fuse(routes, optionsFuseRoute)

    return (
        <Stack direction="column" justifyContent="space-between">
            <Stack direction="row" justifyContent="space-between">
                <TextField
                    label="Buscador"
                    sx={{ width: "50%", marginLeft: "1%" }}
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar ruta"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton ><SearchIcon /></IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button size="large" startIcon={<RefreshIcon />} ></Button>
            </Stack>
            <ListRoutes data={(search === null || search === "") ? routes : fuse.search(search).map((value) => value.item)} />
        </Stack>
    )
}

const ViewListCollections = () => {

    const { collections } = useRegisterContext()
    const [search, setSearch] = useState("")

    const fuse = new Fuse(collections, optionsFuseGathering)

    return (
        <Stack direction="column" justifyContent="space-between">
            <Stack direction="row" justifyContent="space-between">
                <TextField
                    label="Buscador"
                    sx={{ width: "50%", marginLeft: "1%" }}
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar recolección"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton ><SearchIcon /></IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button size="large" startIcon={<RefreshIcon />} ></Button>
            </Stack>
            <ListCollections data={(search === null || search === "") ? collections : fuse.search(search).map((value) => value.item)} />
        </Stack>
    )
}

const ViewListRawMaterials = () => {

    const { rawMaterials } = useRegisterContext()
    const [search, setSearch] = useState("")

    const fuse = new Fuse(rawMaterials, optionsFuseRawMaterial)

    return (
        <Stack direction="column" justifyContent="space-between">
            <Stack direction="row" justifyContent="space-between">
                <TextField
                    label="Buscador"
                    sx={{ width: "50%", marginLeft: "1%" }}
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar materia prima"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton ><SearchIcon /></IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button size="large" startIcon={<RefreshIcon />} ></Button>
            </Stack>
            <ListRawMaterials data={(search === null || search === "") ? rawMaterials : fuse.search(search).map((value) => value.item)} />
        </Stack>
    )
}

const ValidationClassification = () => {
    const { rawMaterials } = useRegisterContext()
    const navigate = useNavigate()
    return (
        <Button variant="contained" onClick={() => navigate('crear-clasificacion')} disabled={rawMaterials === null || rawMaterials.length === 0 ? true : false}>
            {rawMaterials === null || rawMaterials.length === 0 ? 
            (<Tooltip title="Se habilitará cuando hayan Materias Primas disponibles" >
                    <Typography>AÑADIR CLASIFICACIÓN</Typography>
                </Tooltip>) 
                : (<Typography>AÑADIR CLASIFICACIÓN</Typography>)}
        </Button>
    )
}

export default Registers
