import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom"
import { gql, useMutation, useQuery } from "@apollo/client";
import { Collections, dataRawMaterial } from "../RegisterTypes";
import useRegisterContext from "../context/useRegisterContext";
import { useState } from "react";
import { useContextUserAuth } from "../../../store";
import Message from "../../../components/Message";

const GET_ONE_RAW_MATERIAL = gql`
query getOneRawMaterial($pk: String){
  getOneRawMaterial(pk: $pk){
    id
    idMaterialType{
      id
      name
    }  
    kgQuantity
    materialPricePerKg
    isPending
    idCollection{
      id
    }
  }
}
`

const GET_ALL_COLLECTION_NO_PENDING = gql`
query getAllCollectionNoPending($idCompany: String){
  getAllCollectionNoPending(idCompany: $idCompany){
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

const UPDATE_RAW_MATERIAL = gql`
mutation UpdateRawMaterial($idRawMaterial: String, $updateRawMaterial: InputRawMaterial){
  UpdateRawMaterial(idRawMaterial: $idRawMaterial, rawMaterialUpdate: $updateRawMaterial){
    message
  }
}
`

type InputRawMaterial = {
    idCollection: string,
    idMaterialType: string,
    idCompany?: string,
    kgQuantity: number,
    materialPricePerKg: number
}

const ViewFormRawMaterial = () => {

    const { id } = useParams()
    const dataUser = useContextUserAuth((state) => state.data)

    const dataRawMaterial = useQuery(GET_ONE_RAW_MATERIAL, {
        variables: {
            pk: `${id}`
        },
        fetchPolicy: "no-cache"
    })

    const dataCollectionNoPending = useQuery(GET_ALL_COLLECTION_NO_PENDING, {
        variables: {
            idCompany: `${dataUser.idCompany.id}`
        },
        fetchPolicy: "no-cache"
    })

    return (
        dataRawMaterial.loading ? "Cargando..." :
            <FormEditRawMaterial
                id={id}
                data={dataRawMaterial.data.getOneRawMaterial}
                collections={dataCollectionNoPending.loading ? [] : dataCollectionNoPending.data.getAllCollectionNoPending}
            />
    )
}

type FormEditRawMaterial = {
    id: string
    data: dataRawMaterial
    collections: Collections[]
}

const FormEditRawMaterial = ({ id, data, collections }: FormEditRawMaterial) => {

    const navigate = useNavigate()
    const { materialTypes, setUpdated } = useRegisterContext()
    //const dataUser = useContextUserAuth((state) => state.data)
    const [rawMaterialUpdate] = useMutation(UPDATE_RAW_MATERIAL)
    const [idCollection, setIdCollection] = useState(data.idCollection.id)
    const [idMaterialType, setIdMaterialType] = useState(data.idMaterialType.id)
    const [kgQuantity, setKgQuantity] = useState(data.kgQuantity)
    const [materialPricePerKg, setMaterialPricePerKg] = useState(data.materialPricePerKg)

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
            idCollection,
            idMaterialType,
            //idCompany: `${dataUser.idCompany.id}`,
            kgQuantity,
            materialPricePerKg
        }
        rawMaterialUpdate({
            variables: {
                idRawMaterial: id,
                updateRawMaterial: form
            }
        })
            .then((data) => {
                setMsg(data.data.UpdateRawMaterial.message)
                setUpdated(Math.floor(Math.random() * 100))
                setTimeout(() => handleClose(), 6000)
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
                    <Typography justifyContent="center">ACTUALIZAR MATERIA PRIMA # {id}</Typography>
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
                            <InputLabel>Seleccione la Recolección</InputLabel>
                            <Select
                                label="Seleccione la Recolección"
                                onChange={(e) => {
                                    const collection = e.target.value
                                    setIdCollection(collection)
                                }}
                                value={idCollection}
                            >
                                {collections?.map((v) => (
                                    <MenuItem
                                        key={v.id}
                                        value={v.id}
                                    >
                                        Recoleccion #{v.id} - Cantidad: {v.materialsQuantity} - Dinero pagado: ${v.spentMoney}
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

export default ViewFormRawMaterial