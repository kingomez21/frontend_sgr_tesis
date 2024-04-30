import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { document_type, gender, blood_type, marital_status } from "./constant"
import { useQuery, gql, useMutation } from "@apollo/client"
import { useState } from "react";

const GET_COMPANYS = gql`
    query getCompany{
        getCompany{
            id
            name
        }
    }
`

const REGISTER_PERSON = gql`
    mutation($persona: InputPerson){
    createPerson(person: $persona){
        message
    }
    }

`

type company = {
    id: string
    name: string
}

type inputPerson = {
    identityNumber: number
    firstName: string
    lastName: string
    documentType: any
    homeAddress: string
    neighborhood: string
    phoneNumber1: string
    phoneNumber2: string
    gender: any
    admissionDate: string
    jobPosition: string
    birthday: string
    maritalStatus: any
    bloodType: any
    company: any
    email: string
}

const RegisterForm = () => {
    const navigate = useNavigate()
    const { data, loading } = useQuery(GET_COMPANYS)
    const [createPerson, ] = useMutation(REGISTER_PERSON)

    const [identity, setIdentity] = useState(0)
    const [fullName, setFullName] = useState("")
    const [lastName, setLastName] = useState("")
    const [cellphone, setCellphone] = useState("")
    const [phone, setPhone] = useState("")
    const [document, setDocument] = useState({})
    const [genderV, setGenderV] = useState({})
    const [blood, setBlood] = useState({})
    const [maritalStatus, setMaritalStatus] = useState({})
    const [birthday, setBirthday] = useState("")
    const [email, setEmail] = useState("")
    const [direction, setDirection] = useState("")
    const [barrio, setBarrio] = useState("")
    const [company, setCompany] = useState({})
    const [jopPosition, setJopPosition] = useState("")
    const [admissionDate, setAdmissionDate] = useState("")

    const back = () => {
        return navigate(-1)
    }

    const submit = async () => {
        
        const data: inputPerson = {
            "identityNumber": identity,
            "firstName": fullName,
            "lastName": lastName,
            "documentType": document,
            "homeAddress": direction,
            "neighborhood": barrio,
            "phoneNumber1": cellphone,
            "phoneNumber2": phone,
            "gender": genderV,
            "admissionDate": admissionDate,
            "jobPosition": jopPosition,
            "birthday": birthday,
            "maritalStatus": maritalStatus,
            "bloodType": blood,
            "company": company,
            "email": email
        }
        createPerson({
            variables: {
                persona: data
            }
        })
        .then( (data) => console.log(data) )
        .catch( (error) => console.log(error))
        
    }

    return (
        <Paper sx={{ padding: 2 }}>
            <Stack direction="row" spacing={3}>
                <Button startIcon={<ArrowBackIcon />} onClick={() => back()}></Button>
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
                        onChange={(e) => {
                            setIdentity(parseInt(e.target.value))
                        }}
                    />
                    <TextField
                        placeholder="Ingre su nombre completo"
                        type="text"
                        label="Nombre Completo"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => {
                            setFullName(e.target.value)
                        }}
                    />
                    <TextField
                        placeholder="Ingre sus apellidos"
                        type="text"
                        label="Apellidos"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }}
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
                        type="text"
                        label="Numero Celular"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => {
                            setCellphone(e.target.value)
                        }}
                    />
                    <TextField
                        placeholder="Ingrese numero de telefono fijo"
                        type="text"
                        label="Telefono"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => {
                            setPhone(e.target.value)
                        }}
                    />

                    <FormControl
                        fullWidth
                    >
                        <InputLabel>Seleccione el tipo de documento</InputLabel>
                        <Select
                            label="Seleccione el tipo de documento"
                            onChange={(e) => {
                                setDocument(e.target.value)
                            }}
                        >
                            {document_type?.map((v) => (
                                <MenuItem
                                    key={v}
                                    value={v}
                                >
                                    {v}
                                </MenuItem>
                            ))}
                        </Select>

                    </FormControl>


                </Stack>

                <br />
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                >
                    <FormControl
                        fullWidth
                    >
                        <InputLabel>Seleccione su genero</InputLabel>
                        <Select
                            label="Seleccione su genero"
                            onChange={(e) => {
                                setGenderV(e.target.value)
                            }}
                        >
                            {gender?.map((v) => (
                                <MenuItem
                                    key={v}
                                    value={v}
                                >
                                    {v}
                                </MenuItem>
                            ))}

                        </Select>

                    </FormControl>

                    <FormControl
                        fullWidth
                    >
                        <InputLabel>Seleccione su tipo de sangre</InputLabel>
                        <Select
                            label="Seleccione su tipo de sangre"
                            onChange={(e) => {
                                setBlood(e.target.value)
                            }}
                        >
                            {blood_type?.map((v) => (
                                <MenuItem
                                    key={v}
                                    value={v}
                                >
                                    {v}
                                </MenuItem>
                            ))}

                        </Select>

                    </FormControl>

                    <FormControl
                        fullWidth
                    >
                        <InputLabel>Seleccione su estado civil</InputLabel>
                        <Select
                            label="Seleccione su estado civil"
                            onChange={(e) => {
                                setMaritalStatus(e.target.value)
                            }}
                        >
                            {marital_status?.map((v) => (
                                <MenuItem
                                    key={v}
                                    value={v}
                                >
                                    {v}
                                </MenuItem>
                            ))}

                        </Select>

                    </FormControl>

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
                        onChange={(e) => {
                            setBirthday(e.target.value)
                        }}
                    />
                    <TextField
                        placeholder="Ingrese su correo electronico"
                        type="email"
                        label="Correo Electronico"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
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
                        onChange={(e) => {
                            setDirection(e.target.value)
                        }}
                    />
                    <TextField
                        placeholder="Ingrese el nombre del barrio de residencia"
                        type="text"
                        label="Barrio de residencia"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => {
                            setBarrio(e.target.value)
                        }}
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
                    <FormControl
                        fullWidth
                    >
                        <InputLabel>Seleccione la empresa</InputLabel>
                        <Select
                            label="Seleccione la empresa"
                            onChange={(e) => {
                                setCompany(e.target.value)
                            }}
                        >
                            {loading ? <MenuItem disabled> Cargando.. </MenuItem> : (
                                data?.getCompany?.map((v: company) => (
                                    <MenuItem
                                        key={v.id}
                                        value={v.id}
                                    >
                                        {v.name}
                                    </MenuItem>
                                ))
                            )}


                        </Select>

                    </FormControl>

                    <TextField
                        placeholder="Seleccione su cargo"
                        type="text"
                        label="Cargo"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => {
                            setJopPosition(e.target.value)
                        }}
                    />
                    <TextField
                        type="date"
                        label="Fecha de ingreso a la empresa"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => {
                            setAdmissionDate(e.target.value)
                        }}
                    />
                </Stack>
            </Box>
            <br />
            <br />
            <Button fullWidth variant="contained" onClick={() => submit()}>
                Guardar Informacion
            </Button>
        </Paper>
    )
}

export default RegisterForm