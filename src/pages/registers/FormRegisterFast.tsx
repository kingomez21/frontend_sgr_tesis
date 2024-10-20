import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Message from "../../components/Message"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useRegisterContext from "./context/useRegisterContext"
import { gql, useMutation } from "@apollo/client"
import { useContextUserAuth } from "../../store"

const CREATE_RAW_MATERIAL = gql`
mutation createRawMaterial($material: InputRawMaterial){
	CreateRawMaterial(material: $material){
    message
  }
}`

type InputRawMaterial = {
    idCollection?: string
    idMaterialType: string
    idCompany?: string
    kgQuantity: number
    materialPricePerKg: number
    idProvider: string
}

const FormRegisterFast = () => {

    const navigate = useNavigate()
    const dataUser = useContextUserAuth((state) => state.data)

    const [idMaterialType, setIdMaterialType] = useState("")
    const [kgQuantity, setKgQuantity] = useState(0)
    const [materialPricePerKg, setMaterialPricePerKg] = useState(0)
    const [provider, setProvider] = useState("")

    const { materialTypes, setUpdated, dataProviders } = useRegisterContext()
    const [material] = useMutation(CREATE_RAW_MATERIAL)

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
        const form: InputRawMaterial = {
            idMaterialType,
            kgQuantity,
            idCompany: `${dataUser.idCompany.id}`,
            materialPricePerKg,
            idProvider: provider
        }
        material({
            variables: {
                material: form
            }
        })
            .then((data) => {
                setMsg(data.data.CreateRawMaterial.message)
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
        <Dialog scroll="paper" open sx={{ height: "auto" }} >
            <Message band={open} message={msg} status={statusErr ? false : true} />
            <DialogTitle>
                <Stack direction="row" justifyContent="start" padding={1} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography justifyContent="center">REGISTRO RAPIDO DE MATERIA PRIMA</Typography>
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
                            <InputLabel>Seleccione el proveedor</InputLabel>
                            <Select
                                label="Seleccione el proveedor"
                                onChange={(e) => {
                                    const provider = e.target.value
                                    setProvider(provider)
                                }}
                                value={provider}
                            >
                                {dataProviders?.map((v) => (
                                    <MenuItem
                                        key={v.id}
                                        value={v.id}
                                    >
                                        {v.nit} - {v.fullName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Stack>
                    <br />

                    <Stack direction="row" spacing={2}>

                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione el tipo de material</InputLabel>
                            <Select
                                label="Seleccione el tipo de material"
                                onChange={(e) => {
                                    const material: string = e.target.value
                                    setIdMaterialType(material)
                                }}
                                value={idMaterialType}
                            >
                                {materialTypes?.map((v) => (
                                    <MenuItem
                                        key={v.id}
                                        value={v.id}
                                    >
                                        {v.id} - {v.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>

                    <br />

                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Ingrese la cantidad de kilogramos del material"
                            type="number"
                            label="Kilogramos del material"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setKgQuantity(parseInt(e.target.value))}
                            value={kgQuantity}
                        />
                        <TextField
                            placeholder="Ingrese el precio por Kg del material"
                            type="number"
                            label="Precio por Kg"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setMaterialPricePerKg(parseInt(e.target.value))}
                            value={materialPricePerKg}
                        />
                    </Stack>
                    <br />
                    <br />


                    <Stack justifyContent="center" direction="row">
                        <Button fullWidth size="medium" variant="contained" onClick={() => submit()} >
                            <Typography>GUARDAR MATERIA PRIMA</Typography>
                        </Button>
                    </Stack>

                </Box>
            </DialogContent>

        </Dialog>
    )
}

export default FormRegisterFast