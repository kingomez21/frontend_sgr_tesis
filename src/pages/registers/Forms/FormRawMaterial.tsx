import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useNavigate } from "react-router-dom"
import useRegisterContext from "../context/useRegisterContext"
import { useEffect, useState } from "react"
import { gql, useMutation, useQuery } from "@apollo/client"
import ListRawMaterials from "../Lists/ListRawMaterials"
import { useContextUserAuth } from "../../../store"
import Message from "../../../components/Message"
import { Collections } from "../RegisterTypes"

type InputRawMaterial = {
    idCollection: string,
    idMaterialType: string,
    idCompany: string,
    kgQuantity: number,
    materialPricePerKg: number
}

const CREATE_RAW_MATERIAL = gql`
mutation createRawMaterial($material: InputRawMaterial){
	CreateRawMaterial(material: $material){
    message
  }
}`

const FormRawMaterial = () => {

    const navigate = useNavigate()
    const { collections } = useRegisterContext()

    const [idCollection, setIdCollection] = useState("")

    return (
        <Dialog open fullScreen>

            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography>CREACIÓN DE REGISTRO</Typography>
                </Stack>
                <Typography marginLeft={4}>FORMULARIO DE CREACIÓN DE MATERIA PRIMA</Typography>
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
                    <br />
                    <ViewListRawMaterialPerCollection idCollection={idCollection} collections={collections} />


                    <br />


                </Box>
            </DialogContent>
        </Dialog>
    )
}

const GET_ONE_COLLECTION = gql`
query getOneCollection($pk: String){
  getOneCollection(pk: $pk){
    materials: idCollectionInRawMaterials{
      id
      idMaterialType{
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
}`

type props = {
    idCollection: string
    collections: Collections[]
}

const ViewListRawMaterialPerCollection = ({ idCollection, collections }: props) => {

    const navigate = useNavigate()
    const dataUser = useContextUserAuth((state) => state.data)
    const { materialTypes, setUpdated } = useRegisterContext()

    const collection = useQuery(GET_ONE_COLLECTION, {
        variables: {
            pk: idCollection
        },
        fetchPolicy: "no-cache"
    })

    const [idMaterialType, setIdMaterialType] = useState("1")
    const [kgQuantity, setKgQuantity] = useState(0)
    const [materialPricePerKg, setMaterialPricePerKg] = useState(0)
    const [refresh, setRefresh] = useState(0)

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
            idCollection,
            idMaterialType,
            idCompany: `${dataUser.idCompany.id}`,
            kgQuantity,
            materialPricePerKg

        }
        material({
            variables: {
                material: form
            }
        })
            .then((data) => {
                setMsg(data.data.CreateRawMaterial.message)
                setTimeout(() => handleClose(), 3000)
                setRefresh(Math.floor(Math.random() * 100))
            })
            .catch(() => {
                setStatusErr(true)
                setMsg("Ocurrio un error inesperado")
                setTimeout(() => handleClose(), 6000)
            })

    }

    const finish = () => {
        setUpdated(refresh)
        navigate(-1)
    }

    useEffect(() => {
        collection.refetch()
    }, [refresh])

    return (
        <>
            <Message band={open} message={msg} status={statusErr ? false : true} />
            {collection.loading ? (
                <Stack direction="row" justifyContent="center" alignItems="center">
                    <Typography sx={{ justifyContent: "center", justifyItems: "center" }}>Cargando...</Typography>
                </Stack>
            ) : (
                collection.data.getOneCollection === null ? (
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        <Typography>No hay registros de Materia Prima</Typography>
                    </Stack>
                ) : (
                    <>
                        <Typography>LISTADO DE PRODUCTOS AGREGADOS</Typography>
                        <ListRawMaterials data={collection.data.getOneCollection.materials} viewStyle={true} />
                        <br />
                        <Stack direction="row" spacing={4}>
                            <Typography>CANTIDAD DE PRODUCTOS: {collections?.find((value) => value.id === idCollection)?.materialsQuantity}</Typography>
                            <Typography>CANTIDAD DE PRODUCTOS INGRESADOS: {collection.data.getOneCollection.materials.length} </Typography>
                        </Stack>
                        <br />
                        {
                            collections?.find((value) => value.id === idCollection)?.materialsQuantity === collection.data.getOneCollection.materials.length ?
                                (
                                    <Stack justifyContent="center" direction="row">
                                        <Button variant="contained" onClick={() => finish()}>
                                            <Typography>FINALIZAR REGISTRO</Typography>
                                        </Button>
                                    </Stack>
                                ) : (
                                    <>
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
                                            />
                                            <TextField
                                                placeholder="Ingrese el precio por Kg del material"
                                                type="number"
                                                label="Precio por Kg"
                                                variant="outlined"
                                                fullWidth
                                                onChange={(e) => setMaterialPricePerKg(parseInt(e.target.value))}
                                            />
                                        </Stack>
                                        <br />
                                        <br />


                                        <Stack justifyContent="center" direction="row">
                                            <Button fullWidth size="medium" variant="contained" onClick={() => submit()} >
                                                <Typography>GUARDAR MATERIA PRIMA</Typography>
                                            </Button>
                                        </Stack>

                                    </>
                                )
                        }
                    </>
                )
            )
            }
        </>
    )
}

export default FormRawMaterial