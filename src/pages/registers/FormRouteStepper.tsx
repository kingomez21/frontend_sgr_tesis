import { Box, Stack, TextField, Typography } from "@mui/material"
import useRegisterContext from "./context/useRegisterContext"
import { useState } from "react"

const FormRouteStepper = () => {

    const { dataRegisterRoute, setRegisterRoute } = useRegisterContext()
    const [formData, setFormData] = useState({
        routeAppointment: '',
        initPlaceRoute: '',
        destinyPlaceRoute: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setRegisterRoute(formData)
        console.log(dataRegisterRoute)
    };

    return (
        <Box>
            <br />
            <Typography marginLeft={4}>FORMULARIO DE CREACIÓN DE RUTA</Typography>
            <br />
            <Box marginLeft={2} marginRight={2}>
                <form>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Ingrese el punto de partida de la ruta"
                            type="text"
                            label="Lugar de inicio"
                            name="initPlaceRoute"
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            placeholder="Ingrese el destino de la ruta"
                            type="text"
                            label="Lugar de destino"
                            name="destinyPlaceRoute"
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </Stack>
                </form>
                <br />
            </Box>
        </Box>
    )
}

export default FormRouteStepper