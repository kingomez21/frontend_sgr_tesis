import { Box, Button, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { gql, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { useContextUserAuth } from "../../store";
import { LoteSellType } from "./Itypes";
import { useState } from "react";
import ListClassifications from "./ListClassifications";



const GET_ONE_LOTESELL = gql`
query getOneLoteSell($id: String, $idCompany: String){
  lote: getOneLoteSell (id: $id, idCompany: $idCompany){
    id
    material: idMaterialType{
      name
    }
    products: productsQuantity
    total: totalWeightLote
    sold
    cls: idLoteSellInClassification{
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
    createdAt
  }
}

`

type dataQuery = {
    lote: LoteSellType
}

const ViewLoteSell = () => {
    const {id} = useParams()
    const dataUser = useContextUserAuth((state) => state.data)

    const {data, loading} = useQuery<dataQuery>(GET_ONE_LOTESELL,{
        variables: {
            id: `${id}`,
            idCompany: `${dataUser.idCompany.id}`
        }
    })

    return (
        loading ? "Cargando...": <ViewInformation data={data.lote}/>
    )
}

type propsInformation = {
    data: LoteSellType
}

const ViewInformation = ({data}: propsInformation) => {

    const navigate = useNavigate()
    
    const [name,] = useState(data.material.name)
    const [products,] = useState(data.products)
    const [total,] = useState(data.total)
    const [sold,] = useState(data.sold)

    return (
        <Dialog open fullScreen>
            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2} justifyContent="space-between">
                    <Stack direction="row">
                        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                        <Typography>INFORMACION DE LOTE #{data.id}</Typography>
                    </Stack>

                </Stack>
            </DialogTitle>
            <DialogContent>
                <br />
                <Box marginLeft={4} marginRight={4}>
                    <Stack direction="row" spacing={2}>
                        <TextField 
                            placeholder="Tipo de Material"
                            type="text"
                            label="Tipo de Material"
                            variant="outlined"
                            fullWidth
                            disabled={true}
                            value={name}
                        />
                        <TextField 
                            placeholder="Cantidad de Productos"
                            type="number"
                            label="Cantidad de Productos"
                            variant="outlined"
                            fullWidth
                            disabled={true}
                            value={products}
                        />
                    </Stack>
                    <br />
                    <Stack direction="row" spacing={2}>
                    <TextField 
                            placeholder="Total en KG"
                            type="number"
                            label="Total en KG"
                            variant="outlined"
                            fullWidth
                            disabled={true}
                            value={total}
                        />
                        <TextField 
                            placeholder="Vendido"
                            type="text"
                            label="Vendido"
                            variant="outlined"
                            fullWidth
                            disabled={true}
                            value={sold ? "SI": "NO"}
                        />
                    </Stack>
                    <br /><br />
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>LISTADO DE PRODUCTOS</Typography>
                        <Typography>CANTIDAD: {data.cls.length}</Typography>
                    </Stack>
                    <br />
                    <ListClassifications data={data.cls} viewStyle={true} />
                    
                </Box>

            </DialogContent>
        </Dialog>
    )
}

export default ViewLoteSell