import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useContextUserAuth } from "../../../store";
import { Collections, Routes } from "../RegisterTypes";
import { useState } from "react";
import useRegisterContext from "../context/useRegisterContext";
import Message from "../../../components/Message";

const GET_ONE_COLLECTION = gql`
query getOneCollection($pk: String){
  getOneCollection(pk: $pk){
    id
    idRoute{
      id
      initPlace
      destinyPlace
    }
    materialsQuantity
    spentMoney
    idPayType{
      id
      platformName
    }
    isPending
  }
}
`

const GET_ALL_ROUTE_NO_PENDING = gql`
query getAllRouteNoPending($idCompany: String){
  getAllRouteNoPending(idCompany: $idCompany){
    id
    idDate{
      id
      meetDate
      meetPlace
    }
    initPlace
    destinyPlace
    isPending
  }
}
`

const UPDATE_COLLECTION = gql`
mutation UpdateCollection($idCollection: String, $collectionUpdate: InputCollection){
  UpdateCollection(idCollection: $idCollection, collectionUpdate: $collectionUpdate){
    message
  }
}
`
type InputCollection = {
    route: string
    company: string
    materialsQuantity: number
    spentMoney: number
    payType: string
}

const ViewFormGathering = () => {

    const { id } = useParams()
    const dataUser = useContextUserAuth((state) => state.data)

    const dataGathering = useQuery(GET_ONE_COLLECTION, {
        variables: {
            pk: `${id}`
        },
        fetchPolicy: "no-cache"
    })

    const dataRouteNoPending = useQuery(GET_ALL_ROUTE_NO_PENDING, {
        variables: {
            idCompany: `${dataUser.idCompany.id}`
        },
        fetchPolicy: "no-cache"
    })

    return (
        dataGathering.loading ? "Cargando..." :
            <FormEditGathering id={id} data={dataGathering.data.getOneCollection} routes={dataRouteNoPending.loading ? [] : dataRouteNoPending.data.getAllRouteNoPending} />
    )
}

type FormEditGatheringProps = {
    id: string
    data: Collections
    routes: Routes[]
}

const FormEditGathering = ({ id, data, routes }: FormEditGatheringProps) => {

    const navigate = useNavigate()
    const { dataPayTypes, setUpdated } = useRegisterContext()
    const dataUser = useContextUserAuth((state) => state.data)
    const [collectionUpdate] = useMutation(UPDATE_COLLECTION)
    const [route, setRoute] = useState(data.idRoute.id)
    const [materialsQuantity, setMaterialsQuantity] = useState(data.materialsQuantity)
    const [spentMoney, setSpentMoney] = useState(data.spentMoney)
    const [payType, setPayType] = useState(data.idPayType.id)

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
        collectionUpdate({
            variables: {
                idCollection: id,
                collectionUpdate: registroRecoleccion
            }
        })
        .then((data) => {
            setMsg(data.data.UpdateCollection.message)
            setUpdated(Math.floor(Math.random() * 100))
            setTimeout( () => handleClose(), 6000)
        })
        .catch(() => {
            setStatusErr(true)
            setMsg("Ocurrio un error inesperado")
            setTimeout( () => handleClose(), 6000)
        })
    }

    return (
        <Dialog scroll="paper" open sx={{ height: "auto" }} >
            <Message band={open} message={msg} status={statusErr ? false : true} />
            <DialogTitle>
                <Stack direction="row" justifyContent="start" padding={1} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography justifyContent="center">ACTUALIZAR RECOLECCION # {id}</Typography>
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
                            value={materialsQuantity}
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
                            value={spentMoney}
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

export default ViewFormGathering