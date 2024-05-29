import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Route, Routes, useNavigate, useParams } from "react-router-dom"

const exampleRole = [
    "Modulo historial", "Modulo registro"
]

type dataType = {
    message: string
}

type permision = {
    id: number
    name: string
}

type props = {
    data?: dataType
    dataPermision?: permision[]
}

const AsignPermission = () => {

    const { id } = useParams()

    return (
        <FormAsingPermission data={{ "message": `PERMISOS DEL EMPLEADO JUAN CAMILO MESSI RIVERA ${id}` }} />
    )
}

const FormAsingPermission = ({ data }: props) => {

    const navigate = useNavigate()

    const dataPermision: permision[] = [
        {
            id: 1,
            name: "modulo registro"
        },
        {
            id: 2,
            name: "modulo historial"
        }
    ]

    return (
        <Dialog open fullScreen>
            <DialogTitle>
                <Stack direction="row" spacing={1} padding={2} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography>{data.message}</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Paper>
                    <ListPermission dataPermision={dataPermision} />


                </Paper>
                <br />
                <Stack justifyContent="center">
                    <Button size="large" variant="contained" onClick={() => navigate('asignar-permiso')}>
                        <Typography>ASIGNAR PERMISO</Typography>
                    </Button>
                </Stack>
                <Routes>
                    <Route path="/asignar-permiso" element={<ViewFormAsingPermission />} />
                </Routes>
            </DialogContent>
        </Dialog>
    )
}

const ListPermission = ({ dataPermision }: props) => {

    //const navigate = useNavigate()

    const actions = () => {
        return (
            <Button variant="contained" color="error">
                <Typography>ELIMINAR</Typography>
            </Button>
        )
    }

    return (

        <List component={Grid} container>
            {
                dataPermision.map((value) => (
                    <ListItem
                        item
                        key={value.id}
                        component={Grid}
                        xs={12}
                        md={6}
                        secondaryAction={actions()}
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemText primary="Modulo #1" secondary="Activo" />
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List>
    )
}

const ViewFormAsingPermission = () => {

    const navigate = useNavigate()

    return (
        <Dialog scroll="paper" open sx={{ height: "auto" }} >
            <DialogTitle>
                <Stack direction="row" justifyContent="start" padding={1} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography justifyContent="center">FORMULARIO PARA LA ASIGNACION DE PERMISOS</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <br />
                <Stack direction="column" spacing={2} marginLeft={4} marginRight={4}>
                    <FormControl
                        required
                        fullWidth
                    >
                        <InputLabel>Seleccione el tipo de Proveedor</InputLabel>
                        <Select
                            label="Seleccione el tipo de documento"
                        /*onChange={(e) => {
                            const typeClient: any = e.target.value
                            setTypeProvider(typeClient)
                        }}
                        value={typeProvider}*/
                        >
                            {exampleRole?.map((v, i) => (
                                <MenuItem
                                    key={i}
                                    value={i}
                                >
                                    {v}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        placeholder="Ingrese su email"
                        type="email"
                        label="Correo Electronico"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                    /*onChange={(e) => {
                        setEmail(e.target.value)
                    }}*/
                    />

                </Stack>
                <br />
                <br />
                <Stack marginLeft={4} marginRight={4}>
                    <Button variant="contained" >
                        <Typography>GUARDAR</Typography>
                    </Button>
                </Stack>
            </DialogContent>

        </Dialog>
    )
}

export default AsignPermission