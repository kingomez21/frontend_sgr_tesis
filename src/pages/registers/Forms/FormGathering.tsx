import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom"
import { gql, useMutation } from "@apollo/client";
import useRegisterContext from "../context/useRegisterContext";
import { useState } from "react";
import { useContextUserAuth } from "../../../store";
import Message from "../../../components/Message";

const CREATE_COLLECTION = gql`
mutation CreateCollection($collection: InputCollection){
  collection: CreateCollection(collection: $collection){
    message
  }
}`

type InputCollection = {
    route: string
    company: string
    materialsQuantity: number
    spentMoney: number
    payType: string
}

const FormGathering = () => {

    const navigate = useNavigate()
    const { routes, dataPayTypes, setUpdated } = useRegisterContext()
    const dataUser = useContextUserAuth((state) => state.data)
    const [collection] = useMutation(CREATE_COLLECTION)
    const [route, setRoute] = useState("2")
    const [materialsQuantity, setMaterialsQuantity] = useState(0)
    const [spentMoney, setSpentMoney] = useState(0)
    const [payType, setPayType] = useState("")

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
        const registroRecoleccion: InputCollection = {
            route,
            company: `${dataUser.idCompany.id}`,
            materialsQuantity,
            spentMoney,
            payType
        }
        collection({
            variables: {
                collection: registroRecoleccion
            }
        })
            .then((data) => {
                setMsg(data.data.collection.message)
                setUpdated(spentMoney)
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
                <Typography marginLeft={4}>FORMULARIO DE CREACIÓN DE RECOLECCIÓN</Typography>
            </DialogTitle>
            <DialogContent>
                <br />
                <Box marginLeft={4} marginRight={4}>

                    <Stack direction="row" spacing={2}>
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione la ruta para la recolección</InputLabel>
                            <Select
                                label="Seleccione la ruta para la recolección"
                                onChange={(e) => {
                                    const route = e.target.value
                                    setRoute(route)
                                }}
                                value={route}
                            >
                                {routes?.map((v) => (
                                    <MenuItem
                                        key={v.id}
                                        value={v.id}
                                    >
                                        {v.initPlace} - {v.destinyPlace}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione el tipo de pago</InputLabel>
                            <Select
                                label="Seleccione el tipo de pago"
                                onChange={(e) => {
                                    const payType = e.target.value
                                    setPayType(payType)
                                }}
                                value={payType}
                            >
                                {dataPayTypes?.map((v) => (
                                    <MenuItem
                                        key={v.id}
                                        value={v.id}
                                    >
                                        {v.platformName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>

                    <br />
                    <br />

                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Ingrese la cantidad de material"
                            type="number"
                            label="Cantidad de material"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setMaterialsQuantity(parseInt(e.target.value))
                            }}
                        />
                        <TextField
                            placeholder="Ingrese el dinero gastado"
                            type="number"
                            label="Dinero gastado"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setSpentMoney(parseInt(e.target.value))
                            }}
                        />
                    </Stack>
                    <br />
                    <br />
                    <Stack justifyContent="center" direction="row">
                        <Button fullWidth size="medium" variant="contained" onClick={() => submit()} >
                            <Typography>GUARDAR RECOLECCIÓN</Typography>
                        </Button>
                    </Stack>
                </Box>

            </DialogContent>
        </Dialog>
    )
}

export default FormGathering