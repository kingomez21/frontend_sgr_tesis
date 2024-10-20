import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { blood_type, cargo, document_type, gender, marital_status } from "../register/constant";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useContextUserAuth } from "../../store";
import Message from "../../components/Message";

const statusActive = [
    "false", "true"
]

type dataPerson = {
    id?: string
    identityNumber?: number
    firstName: string
    lastName: string
    documentType
    homeAddress: string
    neighborhood: string
    phoneNumber1: string
    phoneNumber2: string
    gender
    admissionDate: string
    jobPosition: string
    birthday: string
    maritalStatus
    bloodType
    company?
    email: string
    isActive?: string
}

type props = {
    datas?
    idUser?: string
    company?: string
}

const GET_ONE_USER = gql`
query getUser ($idUser: String, $company: String){
    getUser: getUserPerCompany(idUser: $idUser, company: $company){
      id
      idPerson{
        id
        identityNumber
        documentType
        firstName
        lastName
        phoneNumber1
        phoneNumber2
        gender
        bloodType
        maritalStatus
        birthday
        homeAddress
        neighborhood
        jobPosition
        admissionDate
      }
      idCompany{
        id
        name
        nit
      }
      idUserAuth{
        email
      }
      isActive
    }
  }
`

const VerUsers = () => {
    const { id, company } = useParams()

    const { data, loading, refetch } = useQuery(GET_ONE_USER, {
        variables: {
            idUser: id,
            company: company
        }
    })

    useEffect(() => {
        refetch()
    },)

    return (
        <>
            {loading ? <Typography>Cargando...</Typography> : <View datas={data} />}
        </>
    )
}

const UPDATE_USER = gql`
mutation updateUserInfo($idUser: String, $company: String, $input: InputPerson){
    updateUserInfo(idUser: $idUser, company: $company, inputPerson: $input){
      message
    }
  }

`

const DELETE_USER = gql`
mutation deleteUser($idUser: String){
    deleteUser(idUser: $idUser){
        message
    }
  }
`

const View = ({ datas }: props) => {

    const navigate = useNavigate()
    const [editable, setEditable] = useState(false)
    const data = useContextUserAuth((state) => state.data)
    const [updateUserInfo,] = useMutation(UPDATE_USER)
    const [deleteUser,] = useMutation(DELETE_USER)

    const dataUser: dataPerson = {
        "id": datas.getUser.id,
        "identityNumber": datas.getUser.idPerson.identityNumber,
        "firstName": datas.getUser.idPerson.firstName,
        "lastName": datas.getUser.idPerson.lastName,
        "documentType": datas.getUser.idPerson.documentType,
        "homeAddress": datas.getUser.idPerson.homeAddress,
        "neighborhood": datas.getUser.idPerson.neighborhood,
        "phoneNumber1": datas.getUser.idPerson.phoneNumber1,
        "phoneNumber2": datas.getUser.idPerson.phoneNumber2,
        "gender": datas.getUser.idPerson.gender,
        "admissionDate": datas.getUser.idPerson.admissionDate,
        "jobPosition": datas.getUser.idPerson.jobPosition,
        "birthday": datas.getUser.idPerson.birthday,
        "maritalStatus": datas.getUser.idPerson.maritalStatus,
        "bloodType": datas.getUser.idPerson.bloodType,
        "email": datas.getUser.idUserAuth.email
    }
    const [identity, setIdentity] = useState(dataUser.identityNumber)
    const [firstName, setFirstName] = useState(dataUser.firstName)
    const [lastName, setLastName] = useState(dataUser.lastName)
    const [cellphone, setCellphone] = useState(dataUser.phoneNumber1)
    const [phone, setPhone] = useState(dataUser.phoneNumber2)
    const [document, setDocument] = useState(dataUser.documentType)
    const [genderV, setGenderV] = useState(dataUser.gender)
    const [blood, setBlood] = useState(dataUser.bloodType)
    const [maritalStatus, setMaritalStatus] = useState(dataUser.maritalStatus)
    const [birthday, setBirthday] = useState(dataUser.birthday)
    const [email, setEmail] = useState(dataUser.email)
    const [direction, setDirection] = useState(dataUser.homeAddress)
    const [barrio, setBarrio] = useState(dataUser.neighborhood)
    const [jopPosition, setJopPosition] = useState(dataUser.jobPosition)
    const [admissionDate, setAdmissionDate] = useState(dataUser.admissionDate)
    const [isActive, setIsActive] = useState(""+datas.getUser.isActive)

    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState("")
    const [statusErr, setStatusErr] = useState(false)

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handlerEdit = () => {
        setEditable(true)
    }

    const submit = () => {
        handleOpen()
        const dataForm: dataPerson = {
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
            "email": email,
            "isActive": isActive
        }
        
        updateUserInfo({
            variables: {
                idUser: dataUser.id,
                company: data.idCompany ? data.idCompany.id : "1",
                input: dataForm
            }
        })
            .then((data) => {
                setMsg(data.data.updateUserInfo.message)
                setTimeout(() => handleClose(), 6000)
            })
            .catch(() => {
                setStatusErr(true)
                setMsg("Ocurrio un error inesperado")
                setTimeout(() => handleClose(), 6000)
            })

    }

    const delete_user = () => {
        handleOpen()
        deleteUser({
            variables: {
                idUser: datas.getUser.id
            }
        })
            .then((data) => {
                setMsg(data.data.deleteUser.message)
                setTimeout(() => handleClose(), 6000)
            })
            .catch(() => {
                setStatusErr(true)
                setMsg("Ocurrio un error inesperado")
                setTimeout(() => handleClose(), 6000)
            })
    }


    return (
        <Dialog open fullScreen>

            <DialogTitle>
                <Message band={open} message={msg} status={statusErr ? false : true} />
                <Stack direction="row" justifyContent="space-between" spacing={2} padding={2} margin={2}>
                    <Stack direction="row" >
                        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                        <Typography>INFORMACIÓN DE {firstName.toUpperCase()} {lastName.toUpperCase()} - {datas.getUser.isActive ? "ACTIVO" : "DESPEDIDO"}</Typography>
                    </Stack>
                    <Button variant="contained" color="error" onClick={() => delete_user()}>
                        Eliminar
                    </Button>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Box
                    component="section" sx={{ p: 1 }}
                >
                    <Stack
                        marginRight={1}
                        marginLeft={1}
                    >
                        <Typography>
                            INFORMACIÓN PERSONAL
                        </Typography>
                    </Stack>
                    <br />
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={4}
                        marginRight={1}
                        marginLeft={1}
                    >
                        <TextField
                            placeholder="Ingrese su numero de identificación"
                            type="number"
                            label="No. de identificación"
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
                            label="Nombre completo"
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
                            placeholder="Ingrese sus apellidos"
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
                        marginRight={1}
                        marginLeft={1}
                    >
                        <TextField
                            placeholder="Ingrese número celular"
                            type="text"
                            label="Número de celular"
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
                            placeholder="Ingrese numero de teléfono fijo"
                            type="text"
                            label="Teléfono"
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
                                    const document_value = e.target.value
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
                        marginRight={1}
                        marginLeft={1}
                    >
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione su género</InputLabel>
                            <Select
                                label="Seleccione su género"
                                onChange={(e) => {
                                    const gender_value= e.target.value
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
                                    const blood = e.target.value
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
                                    const marital_value = e.target.value
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
                        marginRight={1}
                        marginLeft={1}
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
                            placeholder="Ingrese su correo electrónico"
                            type="email"
                            label="Correo electrónico"
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
                        INFORMACIÓN DE RESIDENCIA
                    </Typography>
                    <br />
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={4}
                    >
                        <TextField
                            placeholder="Ingrese su dirección de residencia"
                            type="text"
                            label="Dirección de residencia"
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
                        INFORMACIÓN DE EMPRESA
                    </Typography>
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
                            <InputLabel>Seleccione su cargo</InputLabel>
                            <Select
                                label="Seleccione su cargo"
                                onChange={(e) => {
                                    const job_position = e.target.value
                                    setJopPosition("" + job_position)
                                }}
                                value={jopPosition}
                                disabled={!editable}
                            >
                                {cargo?.map((v, i) => (
                                    <MenuItem
                                        key={i}
                                        value={v}
                                    >
                                        {v}
                                    </MenuItem>
                                ))}

                            </Select>

                        </FormControl>
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
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Estado</InputLabel>
                            <Select
                                label="Estado"
                                onChange={(e) => {
                                    const active = e.target.value
                                    setIsActive(active)
                                }}
                                value={isActive}
                                disabled={!editable}
                            >
                                {statusActive?.map((v, i) => {
                                    const valor = v === "true" ? "ACTIVO" : "DESPEDIDO"
                                    return (
                                        <MenuItem
                                            key={i}
                                            value={v}
                                        >
                                            {valor}
                                        </MenuItem>
                                    )
                                }
                                )
                                }

                            </Select>

                        </FormControl>
                    </Stack>
                    <br />
                    <br />
                    <Stack justifyContent="center">
                        {editable ? (
                            <Button size="medium" variant="contained" onClick={() => submit()}>
                                <Typography>GUARDAR INFORMACIÓN</Typography>
                            </Button>
                        ) : (
                            <Button size="medium" variant="contained" onClick={() => handlerEdit()}>
                                <Typography>EDITAR INFORMACIÓN</Typography>
                            </Button>
                        )}

                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default VerUsers