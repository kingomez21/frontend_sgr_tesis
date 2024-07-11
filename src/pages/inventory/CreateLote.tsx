import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, Stack, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from "react-router-dom"
import { gql, useMutation, useQuery } from "@apollo/client";
import { ClassificationsType, materialType } from "./Itypes";
import { useEffect, useMemo, useState } from "react";
import { useInventoryContext } from "./Icontext";
import { useContextUserAuth } from "../../store";

const GET_ALL_MATERIALS_TYPE = gql`

query getAllMaterialType{
  materials: getAllMaterialType{
    id
    name
  }
}

`

const CREATE_LOTE_SELL = gql`

mutation createLoteSell($lote: inputLoteSell){
  lote: createLoteSell(lote: $lote){
    message
  }
}

`

type dataQuery = {
    materials: materialType[]
}

const CreateLote = () => {

    const { data, loading } = useQuery<dataQuery>(GET_ALL_MATERIALS_TYPE)

    return (
        loading ? "Cargando.." : <ViewForm materialTypesObj={data.materials} />
    )
}

type propsViewForm = {
    materialTypesObj: materialType[]
}

const ViewForm = ({ materialTypesObj }: propsViewForm) => {

    const navigate = useNavigate()
    const dataUserInfo = useContextUserAuth((state) => state.data)
    const { aggProductsLote, setStock, stock, deleteAllProductsLote } = useInventoryContext()
    const [lote,] = useMutation(CREATE_LOTE_SELL)

    const [materialType, setMaterialType] = useState("10")
    const addProducts = useMemo(() => {
        return aggProductsLote.filter((value) => value.idRawMaterial.idMaterialType.id === materialType)
    }, [aggProductsLote])

    const submit = () => {
        let data = {
            idMaterialType: materialType,
            productsQuantity: addProducts.length,
            totalWeightLote: addProducts.map((value) => value.totalWeight).reduce((acum, curr) => acum + curr, 0),
            idProducts: addProducts.map((value) => value.id).toString(),
            idCompany: dataUserInfo.idCompany.id
        }
        console.log(data)
        lote({
            variables:{
                lote: data
            }
        })
        .then((data) => console.log(data.data.lote))
        .catch((err) => console.error(err))
        .finally()
        
    }

    useEffect(() => {
        setStock(materialType)
        deleteAllProductsLote()
    }, [materialType])

    return (
        <Dialog open fullScreen>
            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2} justifyContent="space-between">
                    <Stack direction="row">
                        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                        <Typography>FORMULARIO DE LOTE DE VENTA</Typography>
                    </Stack>
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
                                    setMaterialType(e.target.value)
                                }}
                                value={materialType}
                            >
                                {materialTypesObj?.map((v, i) =>
                                (
                                    <MenuItem
                                        key={i}
                                        value={v.id}
                                    >
                                        {v.name}
                                    </MenuItem>
                                ))
                                }
                            </Select>
                        </FormControl>
                        <Button variant="contained" onClick={() => submit()}>
                            <Typography>GUARDAR INFORMACION</Typography>
                        </Button>
                    </Stack>
                    <br /><br />
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>PRODUCTOS AGREGADOS</Typography>
                        <Typography>CANTIDAD: {aggProductsLote.length}</Typography>
                    </Stack>
                    <ViewListProducts data={aggProductsLote.filter((value) => value.idRawMaterial.idMaterialType.id === materialType)} typeFuntions={false} />
                    <br /><br />
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>LISTADO DE PRODUCTOS DE {materialTypesObj.find((value) => value.id === materialType).name.toUpperCase()}</Typography>
                        <Typography>CANTIDAD: {stock.length}</Typography>
                    </Stack>
                    <ViewListProducts data={stock} typeFuntions={true} />
                </Box>

            </DialogContent>
        </Dialog>
    )
}


type propsListProduct = {
    data: ClassificationsType[]
    typeFuntions: boolean
}

const ViewListProducts = ({ data, typeFuntions }: propsListProduct) => {

    const {setAggProductsLote, deleteProductsLote, aggStockAfter, deleteStock} = useInventoryContext()

    const actions = (value: ClassificationsType, v: number) => {

        const Agg = () => {
            setAggProductsLote([value])
            deleteStock(v)
        }

        const Delete = () => {
            deleteProductsLote(v)
            aggStockAfter([value])
        }

        return (
            typeFuntions ? (
                <Button variant="contained"  onClick={() => Agg()}>
                    <AddIcon />
                </Button>
            ) : (
                <Button variant="contained" color="error" onClick={() => Delete()}>
                    <RemoveIcon />
                </Button>
            )
            
        )
    }

    return (
        <Stack direction="row" >
            <List component={Grid} container sx={{ overflow: 'auto', maxHeight: 400 }}>
                {
                    data?.length > 0 ? (
                        data?.map((value, i) => (
                            <ListItem
                                item
                                key={i}
                                component={Grid}
                                xs={12}
                                md={6}
                                secondaryAction={actions(value, i)}
                                sx={{
                                    "& > .MuiButtonBase-root": {
                                        border: 1,
                                        borderRadius: 1,
                                        borderColor: "divider",
                                        margin: "1%"
                                    },
                                }}
                                disablePadding

                            >
                                <ListItemButton
                                //onClick={() => navigate(`clasificacion/${value.id}`)}
                                >
                                    <ListItemText
                                        primary={`
                                                ${value.idRawMaterial.idMaterialType.name.toUpperCase()} - ${value.totalWeight} KG 
                                                CLASIFICADO POR: ${value.idUserInfo.idPerson.firstName.toUpperCase()} ${value.idUserInfo.idPerson.lastName.toUpperCase()}
                                            `}
                                        secondary={`FECHA: ${new Date(value.createdAt).toLocaleDateString()}`}
                                    //secondary={value.idLoteSell.sold ? <CheckCircleOutlineIcon htmlColor="green"/> : <WatchLaterIcon /> }
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))

                    ) : (
                        <Stack direction="row" justifyContent="center" >
                            <Typography>No hay productos disponibles</Typography>
                        </Stack>
                    )

                }
            </List>
        </Stack>
    )
}


export default CreateLote