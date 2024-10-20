import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { gql, useMutation, useQuery } from "@apollo/client"
import { useNavigate, useParams } from "react-router-dom"
import { Appointments, Routes } from "../RegisterTypes"
import { useState } from "react";
import { useContextUserAuth } from "../../../store";
import Message from "../../../components/Message";
import useRegisterContext from "../context/useRegisterContext";


const GET_ONE_ROUTE = gql`
query getOneRoute($pk: String){
  getOneRoute(pk: $pk){
    id
    idDate{
      id
      meetDate
      meetPlace
    }
    initPlace
    destinyPlace 
  }
}
`

const GET_ALL_DATE_NO_PENDING = gql`
query getAllDateNoPending($idCompany: String){
  getAllDateNoPending(idCompany: $idCompany){
    id
    idProvider{
      id 
      fullName
    } 
    meetDate
    meetPlace
    isPending
  }
}
`
const UPDATE_ROUTE = gql`
mutation UpdateRoute($idRoute: String, $routeUpdate: InputRoute){
  UpdateRoute(idRoute: $idRoute, routeUpdate: $routeUpdate){
    message
  }
}
`

type InputRoute = {
    date: string
    company?: string
    initPlace: string
    destinyPlace: string
}

const ViewFormRoute = () => {

    const { id } = useParams()
    const dataUser = useContextUserAuth((state) => state.data)

    const dataRoutes = useQuery(GET_ONE_ROUTE, {
        variables: {
            pk: `${id}`
        },
        fetchPolicy: "no-cache"
    })

    const dataDateNoPending = useQuery(GET_ALL_DATE_NO_PENDING, {
        variables: {
            idCompany: `${dataUser.idCompany.id}`
        },
        fetchPolicy: "no-cache"
    })

    return (
        dataRoutes.loading ?
            "Cargando..." :
            <FormEditRoute id={id} data={dataRoutes.data.getOneRoute} appointments={dataDateNoPending.loading ? [] : dataDateNoPending.data.getAllDateNoPending} />
    )
}

type FormEditRouteProps = {
    id: string
    data: Routes
    appointments?: Appointments[]
}

const FormEditRoute = ({ id, data, appointments }: FormEditRouteProps) => {

    const navigate = useNavigate()
    const {setUpdated} = useRegisterContext()
    const [date, setDate] = useState(data.idDate.id)
    const [routeUpdate] = useMutation(UPDATE_ROUTE)
    const [initPlace, setInitPlace] = useState(data.initPlace)
    const [destinyPlace, setDestinyPlace] = useState(data.destinyPlace)

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
        const registroRuta: InputRoute = {
            date,
            //company: `${dataUser.idCompany.id}`,
            initPlace,
            destinyPlace
        }
        routeUpdate({
            variables: {
                idRoute: id,
                routeUpdate: registroRuta
            }
        })
        .then((data) => {
            setMsg(data.data.UpdateRoute.message)
            setUpdated(Math.floor(Math.random() * 100))
            setTimeout( () => handleClose(), 6000)
        })
        .catch(() => {
            setStatusErr(true)
            setMsg("Ocurrio un error inesperado")
            setTimeout( () => handleClose(), 6000)
        })
    }

    return (
        <Dialog scroll="paper" open sx={{ height: "auto" }} >
            <Message band={open} message={msg} status={statusErr ? false : true} />
            <DialogTitle>
                <Stack direction="row" justifyContent="start" padding={1} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography justifyContent="center">ACTUALIZAR RUTA # {id}</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <br />
                <Box marginLeft={4} marginRight={4}>
                    <Stack direction="row" spacing={2}>
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione la cita de la ruta</InputLabel>
                            <Select
                                label="Seleccione la cita de la ruta"
                                onChange={(e) => {
                                    const date = e.target.value
                                    setDate(date)
                                }}
                                value={date}
                            >
                                {appointments?.map((v) => (
                                    <MenuItem
                                        key={v.id}
                                        value={v.id}
                                    >
                                        {v.meetDate} - {v.meetPlace}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>

                    <br />
                    <br />

                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Ingrese el punto de partida de la ruta"
                            type="text"
                            label="Lugar de inicio"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setInitPlace(e.target.value)
                            }}
                            value={initPlace}
                        />
                        <TextField
                            placeholder="Ingrese el destino de la ruta"
                            type="text"
                            label="Lugar de destino"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setDestinyPlace(e.target.value)
                            }}
                            value={destinyPlace}
                        />
                    </Stack>
                    <br />
                    <br />
                    <Stack justifyContent="space-between" direction="row">
                        <Button fullWidth size="medium" variant="contained" onClick={() => submit()} >
                            <Typography>GUARDAR RUTA</Typography>
                        </Button>
                    </Stack>
                </Box>
            </DialogContent>

        </Dialog>
    )
}

export default ViewFormRoute