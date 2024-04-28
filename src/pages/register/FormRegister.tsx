import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material"
import {useNavigate} from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const RegisterForm = () => {
    const navigate = useNavigate()

    const back = () => {
        return navigate(-1)
    }

    return (
        <Paper sx={{ padding: 2 }}>
            <Stack direction="row" spacing={3}>
            <Button startIcon={<ArrowBackIcon/>} onClick={() => back()}>
                
            </Button>
            <Typography variant="h5">
                FORMULARIO DE REGISTRO
            </Typography>
            </Stack>
            <br />
            <Box
                component="section" sx={{ p: 2 }}
            >
                <Typography>
                    INFORMACION PERSONAL
                </Typography>
                <br />
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                >
                    <TextField
                        placeholder="Ingrese su numero de identificacion"
                        type="number"
                        label="No. de Identificacion"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        placeholder="Ingre su nombre completo"
                        type="text"
                        label="Nombre Completo"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        placeholder="Ingre sus apellidos"
                        type="text"
                        label="Apellidos"
                        variant="outlined"
                        fullWidth
                    />
                </Stack>

                <br />
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                >
                    <TextField
                        placeholder="Ingrese numero celular"
                        type="number"
                        label="Numero Celular"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        placeholder="Ingrese numero de telefono fijo"
                        type="number"
                        label="Telefono"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        placeholder="Seleccione su tipo de documento"
                        type="text"
                        label="Tipo de documento"
                        variant="outlined"
                        fullWidth
                    />
                </Stack>

                <br />
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                >
                    <TextField
                        placeholder="Seleccione su genero"
                        type="text"
                        label="Genero"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        placeholder="Seleccione su tipo de sangre"
                        type="text"
                        label="Tipo de sangre"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        placeholder="Seleccione su estado civil"
                        type="text"
                        label="Estado civil"
                        variant="outlined"
                        fullWidth
                    />
                </Stack>

                <br />
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                >
                    <TextField
                        type="date"
                        label="Fecha de nacimiento"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        placeholder="Ingrese su correo electronico"
                        type="email"
                        label="Correo Electronico"
                        variant="outlined"
                        fullWidth
                    />
                </Stack>

            </Box>

            <Box
                component="section" sx={{ p: 2 }}
            >
                <Typography>
                    INFORMACION DE RESIDENCIA
                </Typography>
                <br />
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                >
                    <TextField
                        placeholder="Ingrese su direccion de residensia"
                        type="text"
                        label="Direccion de residencia"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        placeholder="Ingrese el nombre del barrio de residencia"
                        type="text"
                        label="Barrio de residencia"
                        variant="outlined"
                        fullWidth
                    />

                </Stack>
            </Box>

            <Box
                component="section" sx={{ p: 2 }}
            >
                <Typography>
                    INFORMACION DE EMPRESA
                </Typography>
                <br />
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                >
                    <TextField
                        placeholder="Seleccione la empresa a la que pertenece"
                        type="text"
                        label="Nombre de la empresa"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        placeholder="Seleccione su cargo"
                        type="text"
                        label="Cargo"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        type="date"
                        label="Fecha de ingreso a la empresa"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Stack>
            </Box>
            <br />
            <br />
            <Button fullWidth variant="contained">
                Guardar Informacion
            </Button>
        </Paper>
    )
}

export default RegisterForm