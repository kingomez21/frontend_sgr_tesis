import { Box, Button, Paper, Stack, Typography } from "@mui/material"
import { useContextUserAuth } from "../../store"
import { useEffect } from "react"
import { getPermission } from "../../hooks/getPermission"
import { Route, Routes, useNavigate } from "react-router-dom"
import FormAppointment from "./FormAppointment"
import FormRoute from "./FormRoute"
import FormGathering from "./FormGathering"
import FormClassification from "./FormClassification"
import CompleteRegister from "./CompleteRegister"
import RegisterProvider from "./context/RegisterProvider"
import FormRawMaterial from "./FormRawMaterial"
//import { DocumentNode } from "graphql"

const Registers = () => {

    const navigate = useNavigate()
    const setTitle = useContextUserAuth((state) => state.setTitle)
    //const permissions = useContextUserAuth((state) => state.permissions)
    const isOk = getPermission("modulo registro")

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
                {/*<ListCounts title="LISTADO DE CLIENTES Y PROVEEDORES" counts={{
                    totalCount: "CANTIDAD",
                    typeOne: "PROVEEDORES",
                    typeTwo: "CLIENTES"
                }} query={GET_COUNTS_APPOINTMENTS} /> */}
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
                {/*<ListCounts title="LISTADO DE USUARIOS" counts={{
                    totalCount: "CANTIDAD",
                    typeOne: "ACTIVOS",
                    typeTwo: "DESPEDIDOS"
                }} query={GET_COUNTS_ROUTES} variables={{ variables: { company: data !== null ? data.idCompany.id : "1" } }} /> */}
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
                    {/* <Route path="/:type/:id" element={<VerClientProvider />} />
                    <Route path="/empleado/:id/:company" element={<VerUsers />} />
                    <Route path="/permisos/:namePerson/:id/*" element={<AsignPermission />} /> */}
                </Routes>
            </Box>
            </RegisterProvider >

        ) : (
    <Typography>No tiene permisos</Typography>
)
    )
}

/* type counters = {
    totalCount: string
    typeOne: string
    typeTwo: string
}

type propsListCounts = {
    title: string
    counts: counters
    query: DocumentNode
    variables?
}

const ListCounts = ({ title, counts, query, variables }: propsListCounts) => {

    const { data, loading, refetch } = useQuery(query, variables)

    useEffect(() => {
        refetch()
    }, [])

    return (
        <Stack direction="row" justifyContent="space-between" marginLeft={5} marginRight={5} marginTop={5}>
            <Typography>
                {title}
            </Typography>
            <Stack
                direction="row"
                spacing={2}
            >

                <Typography>{counts.totalCount}: {loading ? "Cargando.." : data.getCounts.totalCount} </Typography>
                <Typography>{counts.typeOne}: {loading ? "Cargando.." : data.getCounts.countOne} </Typography>
                <Typography>{counts.typeTwo}: {loading ? "Cargando.." : data.getCounts.countTwo} </Typography>

            </Stack>
        </Stack>
    )
}
*/
export default Registers