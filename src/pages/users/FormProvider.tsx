import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom"
import { useState } from "react";

const exampleTypeProvider = [
    "PERSONA NATURAL", "EMPRESA"
]

const FormProvider = () => {
    const navigate = useNavigate()

    const [typeProvider, setTypeProvider] = useState("1")
    const [fullName, setFullName] = useState("")
    const [adress, setAdress] = useState("")
    const [place, setPlace] = useState("")
    const [email, setEmail] = useState("")
    const [cellphone, setCellPhone] = useState("")

    const submit = () => {
        let data = {
            id_type_provider: typeProvider,
            full_name: fullName,
            adress: adress,
            city: place,
            email,
            cellphone
        }
        console.log(data)
    }

    return (
        <Dialog open fullScreen>
            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography>FORMULARIO CREACION DE PROVEEDOR</Typography>
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
                            <InputLabel>Seleccione el tipo de Proveedor</InputLabel>
                            <Select
                                label="Seleccione el tipo de documento"
                                onChange={(e) => {
                                    const typeClient: any = e.target.value
                                    setTypeProvider(typeClient)
                                }}
                                value={typeProvider}
                            >
                                {exampleTypeProvider?.map((v, i) => (
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
                                setAdress(e.target.value)
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

export default FormProvider