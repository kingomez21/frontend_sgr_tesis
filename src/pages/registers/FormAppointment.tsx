import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom"
import useRegisterContext from "./context/useRegisterContext";
import { RegisterAppointment } from "./RegisterTypes";
import { useState } from "react";
//import { useState } from "react";
//import { useContextUserAuth } from "../../store";
//import { gql, useMutation } from "@apollo/client";
//import Message from "../../components/Message";
//import { Label } from "@mui/icons-material";

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

/*type inputClient = {
    idProvider: string
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

`*/

const FormAppointment = () => {

    const navigate = useNavigate()
    const {dataRegisterAppointment, setRegisterAppointment} = useRegisterContext()
    //const data = useContextUserAuth((state) => state.data)
    //const [createClient,] = useMutation(CREATE_CLIENT)

    const [provider, setProvider] = useState("1")
    const [dateAppointment, setDateAppointment] = useState("")
    const [placeAppointment, setPlaceAppointment] = useState("")

    //const [open, setOpen] = useState(false)
    //const [msg, setMsg] = useState("")
    //const [statusErr, setStatusErr] = useState(false)

    /*const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    };*/

    const submit = () => {
        const registroCita: RegisterAppointment = {
            provider,
            dateAppointment,
            placeAppointment
        }
        setRegisterAppointment(registroCita)
        console.log(dataRegisterAppointment)
        //handleOpen()
        //const dataForm: inputClient = {
            //idProvider: `${Provider}`,
            //idCompany: data.idCompany ? data.idCompany.id : "1",
            //dateAppointment,
            //timeAppointment
        //}
    }
        //console.log(dataForm)
        /*createClient({
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
        
    }*/

    return (
        <Dialog open fullScreen>
            {/*<Message band={open} message={msg} status={statusErr ? false : true} /> */}
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
                                {Provider?.map((v) => (
                                    <MenuItem
                                        key={v.id}
                                        value={v.id}
                                    >
                                        {v.name}
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