import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { blood_type, document_type, gender, marital_status } from "../register/constant";

type dataPerson = {
    id?: string
    identityNumber?: number
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
    company?: any
    email: string
}

type props = {
    data: dataPerson
}

const VerUsers = () => {
    const { id } = useParams()
    const data: dataPerson = {
        "id": id,
        "identityNumber": 13454565,
        "firstName": "asjdksd",
        "lastName": "asdasd",
        "documentType": "CC",
        "homeAddress": "Cualquiera",
        "neighborhood": "Villa Rica",
        "phoneNumber1": "45462131",
        "phoneNumber2": "23215453",
        "gender": "Masculino",
        "admissionDate": "2024-04-12",
        "jobPosition": "empleado",
        "birthday": "2000-04-12",
        "maritalStatus": "Soltero",
        "bloodType": "A",
        "email": "sebas@gmail.com"
    }
    return (
        <View data={data} />
    )
}

const View = ({ data }: props) => {

    const navigate = useNavigate()
    const [editable, setEditable] = useState(false)

    const [identity, setIdentity] = useState(data.identityNumber)
    const [firstName, setFirstName] = useState(data.firstName)
    const [lastName, setLastName] = useState(data.lastName)
    const [cellphone, setCellphone] = useState(data.phoneNumber1)
    const [phone, setPhone] = useState(data.phoneNumber2)
    const [document, setDocument] = useState(data.documentType)
    const [genderV, setGenderV] = useState(data.gender)
    const [blood, setBlood] = useState(data.bloodType)
    const [maritalStatus, setMaritalStatus] = useState(data.maritalStatus)
    const [birthday, setBirthday] = useState(data.birthday)
    const [email, setEmail] = useState(data.email)
    const [direction, setDirection] = useState(data.homeAddress)
    const [barrio, setBarrio] = useState(data.neighborhood)
    //const [company, setCompany] = useState(data.company)
    const [jopPosition, setJopPosition] = useState(data.jobPosition)
    const [admissionDate, setAdmissionDate] = useState(data.admissionDate)

    const handlerEdit = () => {
        setEditable(true)
    }

    const submit = () => {
        let dataForm: dataPerson = {
            "identityNumber": identity,
            "firstName": firstName,
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
            //"company": company,
            "email": email
        }
        console.log(dataForm)
    }


    return (
        <Dialog open fullScreen>
            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography>INFORMACION DE {firstName} {lastName}</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Box
                    component="section" sx={{ p: 1 }}
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
                            required
                            fullWidth
                            onChange={(e) => {
                                setIdentity(parseInt(e.target.value))
                            }}
                            value={identity}
                            disabled={!editable}
                        />
                        <TextField
                            placeholder="Ingrese su nombre"
                            type="text"
                            label="Nombre Completo"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }}
                            value={firstName}
                            disabled={!editable}
                        />
                        <TextField
                            placeholder="Ingre sus apellidos"
                            type="text"
                            label="Apellidos"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }}
                            value={lastName}
                            disabled={!editable}
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
                            required
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setCellphone(e.target.value)
                            }}
                            value={cellphone}
                            disabled={!editable}
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
                            value={phone}
                            disabled={!editable}
                        />

                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione el tipo de documento</InputLabel>
                            <Select
                                label="Seleccione el tipo de documento"
                                onChange={(e) => {
                                    const document_value: any = e.target.value
                                    setDocument(document_value)
                                }}
                                value={document}
                                disabled={!editable}
                            >
                                {document_type?.map((v, i) => (
                                    <MenuItem
                                        key={i}
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
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione su genero</InputLabel>
                            <Select
                                label="Seleccione su genero"
                                onChange={(e) => {
                                    const gender_value: any = e.target.value
                                    setGenderV(gender_value)
                                }}
                                value={genderV}
                                disabled={!editable}
                            >
                                {gender?.map((v, i) => (
                                    <MenuItem
                                        key={i}
                                        value={v}
                                    >
                                        {v}
                                    </MenuItem>
                                ))}

                            </Select>

                        </FormControl>

                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione su tipo de sangre</InputLabel>
                            <Select
                                label="Seleccione su tipo de sangre"
                                onChange={(e) => {
                                    const blood: any = e.target.value
                                    setBlood(blood)
                                }}
                                value={blood}
                                disabled={!editable}
                            >
                                {blood_type?.map((v, i) => (
                                    <MenuItem
                                        key={i}
                                        value={v}
                                    >
                                        {v}
                                    </MenuItem>
                                ))}

                            </Select>

                        </FormControl>

                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione su estado civil</InputLabel>
                            <Select
                                label="Seleccione su estado civil"
                                onChange={(e) => {
                                    const marital_value: any = e.target.value
                                    setMaritalStatus(marital_value)
                                }}
                                value={maritalStatus}
                                disabled={!editable}
                            >
                                {marital_status?.map((v, i) => (
                                    <MenuItem
                                        key={i}
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
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => {
                                setBirthday(e.target.value)
                            }}
                            value={birthday}
                            disabled={!editable}
                        />
                        <TextField
                            placeholder="Ingrese su correo electronico"
                            type="email"
                            label="Correo Electronico"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            value={email}
                            disabled={!editable}
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
                            required
                            fullWidth
                            onChange={(e) => {
                                setDirection(e.target.value)
                            }}
                            value={direction}
                            disabled={!editable}
                        />
                        <TextField
                            placeholder="Ingrese el nombre del barrio de residencia"
                            type="text"
                            label="Barrio de residencia"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={(e) => {
                                setBarrio(e.target.value)
                            }}
                            value={barrio}
                            disabled={!editable}
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
                            placeholder="Seleccione su cargo"
                            type="text"
                            label="Cargo"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setJopPosition(e.target.value)
                            }}
                            value={jopPosition}
                            disabled={!editable}
                        />
                        <TextField
                            type="date"
                            label="Fecha de ingreso a la empresa"
                            variant="outlined"
                            required
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => {
                                setAdmissionDate(e.target.value)
                            }}
                            value={admissionDate}
                            disabled={!editable}
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

export default VerUsers