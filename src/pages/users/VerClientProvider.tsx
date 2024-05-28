import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";

const exampleTypeClient = [
    "PERSONA NATURAL",
    "EMPRESA"
]

type dataProps = {
    id?: string
    type: number
    fullname: string
    adress: string
    place: string
    email: string
    cellphone: string
}

type props = {
    data: dataProps
}

const VerClientProvider = () => {

    const { id } = useParams()

    const data: dataProps = {
        id,
        type: 1,
        fullname: "Anything",
        adress: "asdasdasd",
        place: "asdasda",
        email: "asds@gmail.com",
        cellphone: "3123445544"
    }

    const [dataexample,] = useState(data)

    return (
        <View data={dataexample} />
    )
}

const View = ({data}: props) => {

    const navigate = useNavigate()
    const [editable, setEditable] = useState(false)
    
    const [type, setType] = useState(data.type)
    const [fullName, setFullName] = useState(data.fullname)
    const [adress, setAdress] = useState(data.adress)
    const [place, setPlace] = useState(data.place)
    const [email, setEmail] = useState(data.email)
    const [cellphone, setCellPhone] = useState(data.cellphone)

    const handlerEdit = () => {
        setEditable(true)
    }

    const submit = () => {
        let dataForm = {
            type,
            fullName,
            adress,
            place,
            email,
            cellphone
        }
        console.log(dataForm)
    }

    return (
        <Dialog open fullScreen>
            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography>INFORMACION DE {fullName}</Typography>
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
                                    setType(typeClient)
                                }}
                                value={type}
                                disabled={!editable}
                            >
                                {exampleTypeClient?.map((v, i) => (
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
                            disabled={!editable}
                            value={fullName}
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
                                setAdress(e.target.value)
                            }}
                            disabled={!editable}
                            value={adress}
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
                            disabled={!editable}
                            value={place}
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
                            disabled={!editable}
                            value={email}
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
                            disabled={!editable}
                            value={cellphone}
                        />
                    </Stack>
                    <br />
                    <br />
                    <Stack justifyContent="center">
                        {editable ? (
                            <Button size="medium" variant="contained" onClick={() => submit()}>
                            <Typography>GUARDAR INFORMACION</Typography>
                        </Button>
                        ) : (
                            <Button size="medium" variant="contained" onClick={() => handlerEdit()}>
                                <Typography>EDITAR INFORMACION</Typography>
                            </Button>
                        )}
                        
                    </Stack>
                </Box>

            </DialogContent>
        </Dialog>
    )
}

export default VerClientProvider