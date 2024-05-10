import { gql, useMutation } from "@apollo/client"
import { Button, Paper, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useContextUserAuth } from "../../store"
//import { useContextUserAuth } from "../../store"

const LOGIN = gql`
    mutation($user: String!, $pass: String!){
        tokenAuth(username: $user, password: $pass){
            token
            payload
        }
    }
`


type login = {
    user: string
    pass: string
}


const FormLogin = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [tokenAuth,] = useMutation(LOGIN)
    
    const setToken = useContextUserAuth((state) => state.setToken)
    const setPayload = useContextUserAuth((state) => state.setPayload)

    const submit = () => {

        const data_form: login = {
            user: username,
            pass: password
        }
        tokenAuth({
            variables: data_form
        }).then((data) => {
            setToken(data.data.tokenAuth.token)
            setPayload(data.data.tokenAuth.payload.username)
        })
            .catch((err) => console.log(err))
            .finally(() => navigate('/'))


    }

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
                    type="email"
                    required={true}
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
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
                    type="password"
                    required={true}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    fullWidth
                />
                <br />
                <Button fullWidth variant="contained" onClick={() => submit()}>
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