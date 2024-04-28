import { Button, Paper, Stack, TextField, Typography } from "@mui/material"
import {useNavigate} from "react-router-dom"

const FormLogin = () => {
    const navigate = useNavigate()


    return (
        <Paper sx={{ padding: 2 }}>
            <Stack direction="column" justifyContent="center" alignItems="center">
                <Typography variant="h5">
                    <strong>Inicio de sesión</strong> 
                </Typography>
                <br />
                <Typography>
                    Digita tus credenciales para ingresar al sistema
                </Typography>
                <br />
                <Typography>
                    Usuario
                </Typography>
                <br />
                <TextField 
                    label="Usuario" 
                    variant="outlined"
                    fullWidth 
                />
                <br />
                <br />
                <Typography>
                    Contraseña
                </Typography>
                <br />
                <TextField 
                    label="Contraseña" 
                    variant="outlined"
                    fullWidth 
                />
                <br />
                <Button fullWidth variant="contained">
                    Ingresar
                </Button>
                <br />
                <Typography>
                    o regístrate
                </Typography>
                <br />
                <Button fullWidth color="inherit" variant="contained" onClick={() => navigate('/register')}>
                    Registrarse
                </Button>
            </Stack>
        </Paper>
    )
}

export default FormLogin