import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Route, Routes, useNavigate, useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

const exampleRole = [
    "Modulo historial", "Modulo registro"
]

type permision = {
    id: string
    nameView: string
}

type props = {
    namePerson?: string
    dataPermision?: permision[]
}

const GET_PERMISSIONS = gql`
query getPermissionUser($idUser: String){
    getPermissions: getPermissionUser(idUser: $idUser){
      id
      nameView
    }
  }
`

const AsignPermission = () => {

    const { id, namePerson } = useParams()
    const {data, loading, refetch} = useQuery(GET_PERMISSIONS, {
        variables: {
            idUser: id
        }
    })

    useEffect(()=>{
        refetch()
    }, [])

    return (
        <>
        { loading ? <Typography>Cargando...</Typography> :
            <FormAsingPermission namePerson={namePerson} dataPermision={data.getPermissions}  />}
        </>
    )
}

const FormAsingPermission = ({ namePerson, dataPermision }: props) => {

    const navigate = useNavigate()

    return (
        <Dialog open fullScreen>
            <DialogTitle>
                <Stack direction="row" spacing={1} padding={2} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography>LISTADO DE PERMISOS DEL USUARIO {namePerson.toUpperCase()}</Typography>
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
                            <ListItemText primary={value.nameView} secondary="Activo" />
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