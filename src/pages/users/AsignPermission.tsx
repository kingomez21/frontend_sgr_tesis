import { 
    Button, 
    Dialog, 
    DialogContent, 
    DialogTitle, 
    FormControl, 
    Grid, 
    InputLabel, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemText, 
    MenuItem, 
    Paper, 
    Select, 
    Stack, 
    Typography 
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from '@mui/icons-material/Refresh';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Route, Routes, useNavigate, useParams } from "react-router-dom"
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Message from "../../components/Message";

/*const roles = [
    "---", "MODULO HISTORIAL", "MODULO REGISTRO", "MODULO REPORTE", "MODULO USUARIO", "MODULO INVENTARIO"
]*/

type permision = {
    id: string
    nameView: string
    description: string
    isActive: boolean
}

type props = {
    namePerson?: string
    dataPermision?: permision[]
    idUser?: string
    refresh?
}

const GET_PERMISSIONS = gql`
query getPermissionUser($idUser: String){
    getPermissions: getPermissionUser(idUser: $idUser){
      id
      nameView
      description: descriptionPermission
      isActive
    }
  }
`

const AsignPermission = () => {

    const { id, namePerson } = useParams()
    const { data, loading, refetch } = useQuery(GET_PERMISSIONS, {
        variables: {
            idUser: id
        }
    })

    return (
        <>
            {loading ? <Typography>Cargando...</Typography> :
                <FormAsingPermission idUser={id} namePerson={namePerson} dataPermision={data.getPermissions} refresh={refetch}/>}
        </>
    )
}

const FormAsingPermission = ({ namePerson, dataPermision, refresh }: props) => {

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
                    <>
                        <Stack direction="row" justifyContent="end">
                            <Button size="large" startIcon={<RefreshIcon />} onClick={() => refresh()} ></Button>
                        </Stack>
                        <ListPermission dataPermision={dataPermision} />
                    </>
                </Paper>
                <br />
                {/*<Stack justifyContent="center">
                    <Button size="large" variant="contained" onClick={() => navigate('asignar-permiso')}>
                        <Typography>ASIGNAR PERMISO</Typography>
                    </Button>
                </Stack>*/}
                <Routes>
                    {/*<Route path="/asignar-permiso" element={<ViewFormAsingPermission idUser={idUser} />} /> */}
                    <Route path="/ver-permiso/:idPermiso" element={<ViewPermission dataPermision={dataPermision} />} />
                </Routes>
            </DialogContent>
        </Dialog>
    )
}

/*const DELETE_PERMISSION = gql`
mutation deletePermission($idPermission: String){
    deletePermission: deletePermissionUser(idPermission: $idPermission){
      message
    }
  }

`*/

const ListPermission = ({ dataPermision }: props) => {

    const navigate = useNavigate()
    /*const [deletePermission] =  useMutation(DELETE_PERMISSION)
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState("")
    const [statusErr, setStatusErr] = useState(false)

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const delete_permission = (id: string) => {
        handleOpen()
        deletePermission({
            variables: {
                idPermission: id
            }
        })
        .then((data) => {
            setMsg(data.data.deletePermission.message)
            setTimeout(() => handleClose(), 6000)
        })
        .catch(() => {
            setStatusErr(true)
            setMsg("Ocurrio un error inesperado")
            setTimeout(() => handleClose(), 6000)
        })
    }*/

    const actions = (active: boolean) => {
        return (
            active ? <CheckCircleOutlineIcon htmlColor="green"/> : <BlockIcon htmlColor="red" />
        )
    }

    return (

        <List component={Grid} container>
            {/*<Message band={open} message={msg} status={statusErr ? false : true} />*/}
            {
                dataPermision.map((value) => (
                    <ListItem
                        item
                        key={value.id}
                        component={Grid}
                        xs={12}
                        md={6}
                        secondaryAction={actions(value.isActive)}
                        disablePadding
                    >
                        <ListItemButton
                            onClick={() => navigate(`ver-permiso/${value.id}`)}
                        >
                            <ListItemText primary={value.nameView} secondary={value.isActive ? "Activo": "Inactivo"} />
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List>
    )
}

const CHANGE_PERMISSION = gql`
mutation changePermission($idPermission: String, $status: String){
    change: changeStatusPermission(idPermission: $idPermission, status: $status){
      message
    }
  }

`

const ViewPermission = ({dataPermision}: props) => {
    const navigate = useNavigate()
    const {idPermiso} = useParams()
    const state = [
        "false", "true"
    ]
    const [change,] = useMutation(CHANGE_PERMISSION)

    const [data,] = useState(dataPermision.filter((value) => value.id === idPermiso))
    
    const [valueState, setValueState] = useState(""+data[0].isActive)

    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState("")
    const [statusErr, setStatusErr] = useState(false)

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const submit = () => {
        handleOpen()
        change({
            variables:{
                idPermission: idPermiso,
                status: valueState
            }
        })
        .then((data) => {
            setMsg(data.data.change.message)
            setTimeout(() => handleClose(), 6000)
        })
        .catch(() => {
            setStatusErr(true)
            setMsg("Ocurrio un error inesperado")
            setTimeout(() => handleClose(), 6000)
        })
    }

    return (
        <Dialog scroll="paper" open sx={{ height: "auto" }} >
            <Message band={open} message={msg} status={statusErr ? false : true} />
            <DialogTitle>
                <Stack direction="row" justifyContent="start" padding={1} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography justifyContent="center">ASIGNACION DE PERMISOS {idPermiso}</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <br />
                <Stack direction="column" spacing={2} marginLeft={2} marginRight={2}>
                <FormControl
                        required
                        fullWidth
                    >
                        <InputLabel>Seleccione un estado</InputLabel>
                        <Select
                            label="Seleccione un estado"
                            onChange={(e) => {
                                const state = e.target.value
                                setValueState(state)
                            }}
                            value={valueState}
                        >
                            {state?.map((v, i) => {
                                const valor = v === "true" ? "ACTIVO" : "INACTIVO"
                                return (
                                    <MenuItem
                                        key={i}
                                        value={v}
                                    >
                                        {valor}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Stack>
                <br />
                <br />
                <Stack marginLeft={4} marginRight={4}>
                    <Button variant="contained" onClick={() => submit()}>
                        <Typography>GUARDAR</Typography>
                    </Button>
                </Stack>
            </DialogContent>

        </Dialog>
    )
}

/*type inputPermission = {
    nameView: string
    description: string
}

const ASIGN_PERMISSION = gql`
mutation asingPermission($idUser: String, $inputPermission: inputPermission){
    permission: createPermissionUser(idUser: $idUser, inputPermission: $inputPermission){
      message
    }
  }

`

const ViewFormAsingPermission = ({ idUser }: props) => {

    const navigate = useNavigate()
    const [permission] = useMutation(ASIGN_PERMISSION)

    const [nameView, setNameView] = useState(roles[0])
    const [description, setDescription] = useState("")

    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState("")
    const [statusErr, setStatusErr] = useState(false)

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    };


    const submit = () => {
        handleOpen()
        const dataForm: inputPermission = {
            nameView,
            description
        }
        
        permission({
            variables: {
                idUser: idUser,
                inputPermission: dataForm
            }
        })
            .then((data) => {
                setMsg(data.data.permission.message)
                setTimeout(() => handleClose(), 6000)
            })
            .catch(() => {
                setStatusErr(true)
                setMsg("Ocurrio un error inesperado")
                setTimeout(() => handleClose(), 6000)
            })
    }

    return (
        <Dialog scroll="paper" open sx={{ height: "auto" }} >
            <Message band={open} message={msg} status={statusErr ? false : true} />
            <DialogTitle>
                <Stack direction="row" justifyContent="start" padding={1} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography justifyContent="center">ASIGNACION DE PERMISOS</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <br />
                <Stack direction="column" spacing={2} marginLeft={2} marginRight={2}>
                    <FormControl
                        required
                        fullWidth
                    >
                        <InputLabel>Seleccione el modulo</InputLabel>
                        <Select
                            label="Seleccione el modulo"
                            onChange={(e) => {
                                const moduloName = e.target.value
                                setNameView(moduloName)
                            }}
                            value={nameView}
                        >
                            {roles?.map((v, i) => (
                                <MenuItem
                                    key={i}
                                    value={v}
                                >
                                    {v}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        placeholder="Ingrese una desripcion"
                        type="text"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                    />

                </Stack>
                <br />
                <br />
                <Stack marginLeft={4} marginRight={4}>
                    <Button variant="contained" onClick={() => submit()}>
                        <Typography>GUARDAR</Typography>
                    </Button>
                </Stack>
            </DialogContent>

        </Dialog>
    )
}*/

export default AsignPermission