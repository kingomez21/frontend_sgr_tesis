import { Box, Button, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useContextUserAuth } from "../../store";
import { ClassificationsType } from "./Itypes";
import { useState } from "react";

const GET_ONE_CLASSIFICATION = gql`
    query getOneClassification($id: String, $idCompany: String){
        classification: getOneClassification(id: $id, idCompany: $idCompany){
            id
            totalWeight
            idUserInfo{
                idPerson{
                    firstName
                    lastName
                }
            }
            idRawMaterial{
                idMaterialType{
                    name
                }
                materialName
                materialPricePerKg
                kgQuantity
            }
            idCompany{
                name
                nit
            }
            idLoteSell{
                id
                productsQuantity
                sold
            }
            createdAt
            
        }
    }

`
type dataQuery = {
    classification: ClassificationsType
}

const ViewClassification = () => {
    const { id } = useParams()
    const dataUser = useContextUserAuth((state) => state.data)

    const { data, loading } = useQuery<dataQuery>(GET_ONE_CLASSIFICATION, {
        variables: {
            id: `${id}`,
            idCompany: `${dataUser.idCompany.id}`
        }
    })

    return (
        loading ? "Cargando..." : <ViewInformation data={data.classification} />
    )
}

type propsInfo = {
    data: ClassificationsType
}

const ViewInformation = ({ data }: propsInfo) => {

    const navigate = useNavigate()

    const [name, setName] = useState(data.idRawMaterial.idMaterialType.name)
    const [totalW, setTotalW] = useState(data.totalWeight)
    const [person, setPerson] = useState(data.idUserInfo.idPerson.firstName + " " + data.idUserInfo.idPerson.lastName)
    const [pricePerKg, setPricePerKg] = useState(data.idRawMaterial.materialPricePerKg)

    return (
        <Dialog open fullScreen>
            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2} justifyContent="space-between">
                    <Stack direction="row">
                        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                        <Typography>INFORMACIÓN DE {name.toUpperCase()} {totalW} KG</Typography>
                    </Stack>

                </Stack>
            </DialogTitle>
            <DialogContent>
                <br />
                <Box marginLeft={4} marginRight={4}>

                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Ingrese nombre del material"
                            type="text"
                            label="Nombre Material"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            disabled={true}
                            value={name}
                        />
                        <TextField
                            placeholder="Ingrese el total en KG"
                            type="number"
                            label="Total en KG"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setTotalW(parseInt(e.target.value))
                            }}
                            disabled={true}
                            value={totalW}
                        />
                    </Stack>
                    <br />
                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Persona encargada de la clasificación"
                            type="text"
                            label="Nombre de la persona"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setPerson(e.target.value)
                            }}
                            disabled={true}
                            value={person}
                        />
                        <TextField
                            placeholder="Precio por Kg"
                            type="number"
                            label="Precio por Kg"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setPricePerKg(parseInt(e.target.value))
                            }}
                            disabled={true}
                            value={pricePerKg}
                        />
                    </Stack>
                    <br /><br />
                    { data.idLoteSell?.sold !== null && data.idLoteSell?.sold === true ? 
                     <>
                    <Typography>INFORMACIÓN DE LOTE DE VENTA</Typography>
                    <br />
                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Número de lote"
                            type="text"
                            label="Número de lote"
                            variant="outlined"
                            fullWidth
                            /*onChange={(e) => {
                                setNumberLote(e.target.value)
                            }}*/
                            disabled={true}
                            value={data.idLoteSell !== null ? data.idLoteSell.id : "NINGUNO"}
                        />
                        <TextField
                            placeholder="Cantidad de productos"
                            type="number"
                            label="Cantidad de productos"
                            variant="outlined"
                            fullWidth
                            /*onChange={(e) => {
                                setPrdQuantity(parseInt(e.target.value))
                            }}*/
                            disabled={true}
                            value={data.idLoteSell !== null ? data.idLoteSell.productsQuantity : "NINGUNO"}
                        />
                        <TextField
                            placeholder="Vendido"
                            type="text"
                            label="Vendido"
                            variant="outlined"
                            fullWidth
                            disabled={true}
                            value={data.idLoteSell !== null ? data.idLoteSell.sold ? "SI" : "NO" : "NINGUNO"}
                        />
                    </Stack>
                    </>
                    : (<></>)
                    }
                </Box>

            </DialogContent>
        </Dialog>
    )
}

export default ViewClassification