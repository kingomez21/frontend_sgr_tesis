import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom"
import useRegisterContext from "../context/useRegisterContext";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useContextUserAuth } from "../../../store";
import Message from "../../../components/Message";

const CREATE_CLASSIFICATION = gql`
mutation CreateClassification($classification: InputClassification){
  classification: CreateClassification(classification: $classification){
    message
  }
}`

type InputClassification = {
    idRawMaterial: string
    idUserInfo: string
    totalWeight: number
    idProcedureType: string
    idCompany: string
}

const FormClassification = () => {

    const navigate = useNavigate()
    const {rawMaterials, dataUsers, dataProcedureType, setUpdated} = useRegisterContext()
    const dataUser = useContextUserAuth((state) => state.data)
    const [classification] = useMutation(CREATE_CLASSIFICATION)
    const [rawMaterial, setRawMaterial] = useState("")
    const [userInfo, setUserInfo] = useState("")
    const [totalWeight, setTotalWeight] = useState(0)
    const [procedureType, setProcedureType] = useState("")

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
        const registroClasificacion: InputClassification = {
            idRawMaterial: rawMaterial,
            idCompany: `${dataUser.idCompany.id}`,
            idUserInfo: userInfo,
            totalWeight,
            idProcedureType: procedureType
        }
        classification({
            variables: {
                classification: registroClasificacion
            }
        })
            .then((data) => {
                setMsg(data.data.classification.message)
                setTimeout(() => handleClose(), 3000)
                setUpdated(Math.floor(Math.random() * 100))
            })
            .catch(() => {
                setStatusErr(true)
                setMsg("Ocurrio un error inesperado")
                setTimeout(() => handleClose(), 6000)
            })
    }

    return (
        <Dialog open fullScreen>
            <Message band={open} message={msg} status={statusErr ? false : true} />
            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography>CREACIÓN DE REGISTRO</Typography>
                </Stack>
                <Typography marginLeft={4}>FORMULARIO DE CREACIÓN DE CLASIFICACIÓN</Typography>
            </DialogTitle>
            <DialogContent>
                <br />
                <Box marginLeft={4} marginRight={4}>

                    <Stack direction="row" spacing={2}>
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione la materia prima a clasificar</InputLabel>
                            <Select
                                label="Seleccione la materia prima"
                                onChange={(e) => {
                                    const rawMaterial = e.target.value
                                    setRawMaterial(rawMaterial)
                                }}
                                value={rawMaterial}
                            >
                                {rawMaterials?.map((v) => (
                                    <MenuItem
                                        key={v.id}
                                        value={v.id}
                                    >
                                        {v.idMaterialType.name} - {v.kgQuantity} - {v.materialPricePerKg}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione el empleado encargado de la clasificación</InputLabel>
                            <Select
                                label="Seleccione el empleado encargado de la clasificación"
                                onChange={(e) => {
                                    const userInfo = e.target.value
                                    setUserInfo(userInfo)
                                }}
                                value={userInfo}
                            >

                                {dataUsers?.map((v) => (
                                    <MenuItem
                                        key={v.id}
                                        value={v.id}
                                    >
                                        {v.idPerson.identityNumber} - {v.idPerson.firstName} {v.idPerson.lastName}
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Stack>

                    <br />
                    <br />

                    <Stack direction="row" spacing={2}>
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione el tipo de procedimiento</InputLabel>
                            <Select
                                label="Seleccione el tipo de procedimiento"
                                onChange={(e) => {
                                    const procedureType = e.target.value
                                    setProcedureType(procedureType)
                                }}
                                value={procedureType}
                            >
                            {dataProcedureType?.map((v) => (
                                    <MenuItem
                                        key={v.id}
                                        value={v.id}
                                    >
                                        {v.id} - {v.procedureName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            placeholder="Ingrese el peso total del material"
                            type="number"
                            label="Peso total de la materia prima"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setTotalWeight(parseInt(e.target.value))}
                        />
                    </Stack>
                    <br />
                    <br />
                    <Stack justifyContent="center" direction="row">
                        <Button fullWidth size="medium" variant="contained" onClick={() => submit()}>
                            <Typography>GUARDAR CLASIFICACIÓN</Typography>
                        </Button>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default FormClassification