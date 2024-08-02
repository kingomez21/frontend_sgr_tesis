import { Box, Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client";
import { useContextUserAuth } from "../../store";
import { HistoryClassification } from "./HistoryTypes";

const GET_ONE_CLASSIFICATION = gql`
query getOneClassification($id: String, $idCompany: String){
  data: getOneClassification(id: $id, idCompany: $idCompany){
    id
    materiaPrima: idRawMaterial{
      id
      idMaterialType{
        name
      }
      kgQuantity
      materialPricePerKg
      coleccion: idCollection{
        id
        materialsQuantity
        spentMoney
        idPayType{
          platformName
        }
        createdAt
        ruta: idRoute{
          id
          initPlace
          destinyPlace
          createdAt
          cita: idDate{
            id
            meetDate
            meetPlace
            createdAt
            proveedor: idProvider{
              nit
              fullName
              address
              place
              cellphone
              email
              isActive
            }
          }
        }
      }
    }
    usuario: idUserInfo{
      persona: idPerson{
        identityNumber
        documentType
        firstName
        lastName
        homeAddress
        neighborhood
        phoneNumber1
        phoneNumber2
        gender
        admissionDate
        jobPosition
        birthday
        maritalStatus
        bloodType
        createdAt
      }
      roles: idUserRol{
        idUserRolInPermission{
          nameView
          isActive
        }
      }
      
    }
    lote: idLoteSell{
      id
      idMaterialType{
        name
      }
      productsQuantity
      totalWeightLote
      sold
      createdAt
      venta: idLoteSellInReceiptSell{
        id
        cliente: idClient{
          nit
          fullName
          address
          place
          cellphone
          email
          isActive
          createdAt
        }
        date
        idPayType{
          platformName
        }
        productPricePerKg
        totalPrice
        
      }
    }
    totalWeight
  }
}

`

const ViewHistoryClassifications = () => {

    const {id} = useParams()
    const dataUser = useContextUserAuth((state) => state.data)
    const data = useQuery(GET_ONE_CLASSIFICATION, {
        variables: {
            id,
            idCompany: `${dataUser.idCompany.id}`
        }
    })

    return (
        <View id={id} data={data.loading ? null : data.data.data} />
    )
}

type props = {
    id: string
    data: HistoryClassification
}

const View = ({id, data}: props) => {

    const navigate = useNavigate()

    return (
        <Dialog open fullScreen>
            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2} justifyContent="space-between">
                    <Stack direction="row">
                        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                        <Typography>INFORMACION DE {data !== null ? data.materiaPrima.idMaterialType.name.toUpperCase() : ""}</Typography>
                    </Stack>

                </Stack>
            </DialogTitle>
            <DialogContent>
                <br />
                <Box marginLeft={4} marginRight={4}>

                    <Typography>{id}</Typography>
                </Box>

            </DialogContent>
        </Dialog>
    )
}

export default ViewHistoryClassifications