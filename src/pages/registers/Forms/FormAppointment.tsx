import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom"
import useRegisterContext from "../context/useRegisterContext";
import { RegisterAppointment } from "../RegisterTypes";
import { useState } from "react";

const FormAppointment = () => {

    const navigate = useNavigate()
    const {dataRegisterAppointment, setRegisterAppointment, dataProviders} = useRegisterContext()

    const [provider, setProvider] = useState("1")
    const [dateAppointment, setDateAppointment] = useState("")
    const [placeAppointment, setPlaceAppointment] = useState("")

    const submit = () => {
        const registroCita: RegisterAppointment = {
            provider,
            dateAppointment,
            placeAppointment
        }
        setRegisterAppointment(registroCita)
        console.log(dataRegisterAppointment)
    }

    return (
        <Dialog open fullScreen>
            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography>CREACIÓN DE REGISTRO</Typography>
                </Stack>
                <Typography marginLeft={4}>FORMULARIO DE CREACIÓN DE CITA</Typography>
            </DialogTitle>
            <DialogContent>
                <br />
                <Box marginLeft={4} marginRight={4}>

                    <Stack justifyContent="center">
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione el proveedor</InputLabel>
                            <Select
                                label="Seleccione el tipo de documento"
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

export default FormAppointment