import { Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import useRegisterContext from "./context/useRegisterContext";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_PROVIDERS = gql`
query getAllProviders{
  getAllProviders{
    id
    fullName
  }
}`

const Provider = [{
    id: "1",
    name: 'JuanUseful'
}, {
    id: "2",
    name: 'SebasMono'
}, {
    id: "3",
    name: 'CarlitosBonitoYGordito'
}
]

const FormAppointmentStepper = () => {

    const { dataRegisterAppointment, setRegisterAppointment } = useRegisterContext()
    const [formData, setFormData] = useState({
        provider: '1',
        dateAppointment: '',
        placeAppointment: ''
    });

    const data = useQuery(GET_PROVIDERS)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setRegisterAppointment(formData)
        console.log(dataRegisterAppointment)
    };

    return (
        <Box>
            <br />
            <Typography marginLeft={4}>FORMULARIO DE CREACIÓN DE CITA</Typography>
            <br />
            <Box marginLeft={4} marginRight={4}>
                <form>
                    <Stack justifyContent="center">
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione el proveedor</InputLabel>
                            <Select
                                label="Seleccione el tipo de documento"
                                name="provider"
                                onChange={handleChange}
                                value={formData.provider}
                            >
                                {data.loading ? <MenuItem disabled> Cargando.. </MenuItem> : (
                                    data?.data.getAllProviders?.map((v) => (
                                        <MenuItem
                                            key={v.id}
                                            value={v.id}
                                        >
                                            {v.fullName}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                    </Stack>
                    <br />
                    <br />

                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Ingrese la fecha de la cita o reunión"
                            type="date"
                            name="dateAppointment"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            placeholder="Ingrese el lugar de la reunión"
                            type="text"
                            name="placeAppointment"
                            label="Lugar de la reunión"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                        />
                    </Stack>
                </form>
                <br />
            </Box>
        </Box>
    )
}

export default FormAppointmentStepper