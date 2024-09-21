import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useRegisterContext from "../context/useRegisterContext";
import { gql, useQuery } from "@apollo/client";
import { Appointments } from "../RegisterTypes";

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
        }
    })

    return (
        dataDate.loading ? "Cargando..." : <FormEditAppointment id={id} data={dataDate.data.getOneDate} />
    )
}

type formEditAppointmentProps = {
    id: string
    data: Appointments
}

const FormEditAppointment = ({id, data}: formEditAppointmentProps) => {

    const navigate = useNavigate()
    const {dataProviders} = useRegisterContext()

    const [provider, setProvider] = useState(data.idProvider.id)
    const [dateAppointment, setDateAppointment] = useState(data.meetDate)
    const [placeAppointment, setPlaceAppointment] = useState(data.meetPlace)

    const submit = () => {

        const registroCita: InputDate = {
            provider,
            //company: `${dataUser.idCompany.id}`,
            meetDate: dateAppointment,
            meetPlace: placeAppointment
        }
        console.log(registroCita)
        
        return
    }


    return (
        <Dialog scroll="paper" open sx={{ height: "auto" }} >
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