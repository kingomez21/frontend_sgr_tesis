import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom"
import { gql, useMutation } from "@apollo/client";
import useRegisterContext from "../context/useRegisterContext";
import { useContextUserAuth } from "../../../store";
import { useState } from "react";

const CREATE_ROUTE = gql`
mutation CreateRoute($route: InputRoute){
  route: CreateRoute(route: $route){
    message
  }
}`

type InputRoute = {
    date: string
    company: string
    initPlace: string
    destinyPlace: string
}

const FormRoute = () => {

    const navigate = useNavigate()
    const { appointments } = useRegisterContext()
    const dataUser = useContextUserAuth((state) => state.data)
    const [route] = useMutation(CREATE_ROUTE)
    const [date, setDate] = useState("1")
    const [initPlace, setInitPlace] = useState("")
    const [destinyPlace, setDestinyPlace] = useState("")

    const submit = () => {
        const registroRuta: InputRoute = {
            date,
            company: `${dataUser.idCompany.id}`,
            initPlace,
            destinyPlace
        }
        route({
            variables: {
                route: registroRuta
            }
        })
            .then((data) => {
                alert(data.data.route.message)
            })
            .catch(() => {
                alert("Error")
            })
    }

    return (
        <Dialog open fullScreen>
            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography>CREACIÓN DE REGISTRO</Typography>
                </Stack>
                <Typography marginLeft={4}>FORMULARIO DE CREACIÓN DE RUTA</Typography>
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
                                label="Seleccione la cita"
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

export default FormRoute