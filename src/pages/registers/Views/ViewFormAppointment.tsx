import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useRegisterContext from "../context/useRegisterContext";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Appointments } from "../RegisterTypes";
import Message from "../../../components/Message";

const GET_ONE_DATE = gql`
query getOneDate($pk: String) {
  getOneDate(pk: $pk){
    id
    idProvider{
      id
      fullName
    }
    meetDate
    meetPlace
  }
}
`

const UPDATE_DATE = gql`
mutation UpdateDate($idDate: String, $dateUpdate: InputDate){
  UpdateDate(idDate: $idDate, dateUpdate: $dateUpdate){
    message
  }
}
`

type InputDate = {
    provider: string
    company?: string
    meetDate: string
    meetPlace: string
}

const ViewFormAppointment = () => {

    const { id } = useParams()

    const dataDate = useQuery(GET_ONE_DATE, {
        variables: {
            pk: `${id}`
        },
        fetchPolicy: "no-cache"
    })

    return (
        dataDate.loading ? "Cargando..." : <FormEditAppointment id={id} data={dataDate.data.getOneDate} />
    )
}

type formEditAppointmentProps = {
    id: string
    data: Appointments
}

const FormEditAppointment = ({ id, data }: formEditAppointmentProps) => {

    const navigate = useNavigate()
    const { dataProviders, setUpdated } = useRegisterContext()
    const [dateUpdate] = useMutation(UPDATE_DATE)
    const [provider, setProvider] = useState(data.idProvider.id)
    const [dateAppointment, setDateAppointment] = useState(data.meetDate)
    const [placeAppointment, setPlaceAppointment] = useState(data.meetPlace)

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
        const registroCita: InputDate = {
            provider,
            //company: `${dataUser.idCompany.id}`,
            meetDate: dateAppointment,
            meetPlace: placeAppointment
        }
        dateUpdate({
            variables: {
                idDate: id,
                dateUpdate: registroCita
            }
        })
        .then((data) => {
            setMsg(data.data.UpdateDate.message)
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
                    <Typography justifyContent="center">ACTUALIZAR CITA # {id}</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <br />
                <Box marginLeft={4} marginRight={4}>

                    <Stack justifyContent="center">
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione el Proveedor</InputLabel>
                            <Select
                                label="Seleccione el Proveedor"
                                onChange={(e) => {
                                    const provider = e.target.value
                                    setProvider(provider)
                                }}
                                value={provider}
                            >
                                {dataProviders?.map((v) => (
                                    <MenuItem
                                        key={v.id}
                                        value={v.id}
                                    >
                                        {v.nit} - {v.fullName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>

                    <br />
                    <br />

                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Ingrese la fecha de la cita o reunión"
                            type="date"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setDateAppointment(e.target.value)
                            }}
                            value={dateAppointment}
                        />
                        <TextField
                            placeholder="Ingrese el lugar de la reunión"
                            type="text"
                            label="Lugar de la reunión"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setPlaceAppointment(e.target.value)
                            }}
                            value={placeAppointment}
                        />
                    </Stack>
                    <br />
                    <br />
                    <Stack justifyContent="center" direction="row">
                        <Button fullWidth size="medium" variant="contained" onClick={() => submit()}>
                            <Typography>GUARDAR CITA</Typography>
                        </Button>
                    </Stack>
                </Box>
            </DialogContent>

        </Dialog>
    )
}

export default ViewFormAppointment