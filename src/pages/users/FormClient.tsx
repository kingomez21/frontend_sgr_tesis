import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { useContextUserAuth } from "../../store";
import { gql, useMutation } from "@apollo/client";
import Message from "../../components/Message";

const TypeClient = [
    "---",
    "PERSONA NATURAL",
    "EMPRESA"
]

type inputClient = {
    idTypeClient: string
    idCompany: string
    fullName: string
    nit: string
    address: string
    email?: string
    cellphone?: string
    place: string
}

const CREATE_CLIENT = gql`
mutation CreateClient($input: InputClient){
    createClient(client: $input){
      message
    }
  }

`

const FormClient = () => {

    const navigate = useNavigate()
    const data = useContextUserAuth((state) => state.data)
    const [createClient,] = useMutation(CREATE_CLIENT)

    const [typeClient, setTypeClient] = useState("0")
    const [fullName, setFullName] = useState("")
    const [address, setAddress] = useState("")
    const [nit, setNit] = useState("")
    const [place, setPlace] = useState("")
    const [email, setEmail] = useState("")
    const [cellphone, setCellPhone] = useState("")

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
        let dataForm: inputClient = {
            idTypeClient: `${typeClient}`,
            idCompany: data.idCompany ? data.idCompany.id : "1",
            fullName,
            nit,
            address,
            place,
            cellphone,
            email
           
        }
        //console.log(dataForm)
        createClient({
            variables: {
                input: dataForm
            }
        })
        .then( (data) => {
            setMsg(data.data.createClient.message)
            setTimeout( () => handleClose(), 6000)
        } )
        .catch( () => {
            setStatusErr(true)
            setMsg("Ocurrio un error inesperado")
            setTimeout( () => handleClose(), 6000)
        } )
        
    }

    return (
        <Dialog open fullScreen>
            <Message band={open} message={msg} status={statusErr ? false : true} />
            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography>FORMULARIO CREACION DE CLIENTE</Typography>
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
                            <InputLabel>Seleccione el tipo de cliente</InputLabel>
                            <Select
                                label="Seleccione el tipo de documento"
                                onChange={(e) => {
                                    const typeClient: any = e.target.value
                                    setTypeClient(typeClient)
                                }}
                                value={typeClient}
                            >
                                {TypeClient?.map((v, i) => (
                                    <MenuItem
                                        key={i}
                                        value={i}
                                    >
                                        {v}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            placeholder="Ingrese su nombre completo"
                            type="text"
                            label="Nombre Completo"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setFullName(e.target.value)
                            }}
                        />
                    </Stack>

                    <br />
                    <br />

                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Ingrese su direccion de residencia"
                            type="text"
                            label="Direccion"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }}
                        />
                        <TextField
                            placeholder="Ingrese la ciudad de residencia"
                            type="text"
                            label="Ciudad"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setPlace(e.target.value)
                            }}
                        />
                        <TextField
                            placeholder="Ingrese su NIT"
                            type="text"
                            label="Nit"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setNit(e.target.value)
                            }}
                        />
                    </Stack>

                    <br />
                    <br />

                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Ingrese su email"
                            type="email"
                            label="Correo Electronico"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <TextField
                            placeholder="Ingrese el telefono celular"
                            type="text"
                            label="Telefono"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setCellPhone(e.target.value)
                            }}
                        />
                    </Stack>
                    <br />
                    <br />
                    <Stack justifyContent="center">
                        <Button size="medium" variant="contained" onClick={() => submit()}>
                            <Typography>GUARDAR INFORMACION</Typography>
                        </Button>
                    </Stack>
                </Box>

            </DialogContent>
        </Dialog>
    )
}

export default FormClient