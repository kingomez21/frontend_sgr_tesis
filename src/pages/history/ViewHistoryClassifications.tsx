import { Box, Button, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client";
import { useContextUserAuth } from "../../store";
import { HistoryClassification } from "./HistoryTypes";
import Progress from "../../components/Progress";

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

  const { id } = useParams()
  const dataUser = useContextUserAuth((state) => state.data)
  const data = useQuery(GET_ONE_CLASSIFICATION, {
    variables: {
      id,
      idCompany: `${dataUser.idCompany.id}`
    }
  })

  return (
    data.loading ? (
      <Progress open={data.loading} message="Cargando..." />
    ) : (
      <View id={id} data={data.data.data} />
    )
  )
}

type props = {
  id: string
  data: HistoryClassification
}

const View = ({ id, data }: props) => {

  const navigate = useNavigate()

  return (
    <Dialog open fullScreen>
      <DialogTitle>

        <Stack direction="row" padding={2} margin={1} justifyContent="start">
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Typography >INFORMACION DE HISTORIAL</Typography>
        </Stack>

      </DialogTitle>
      <DialogContent>
        <br />
        <Box marginLeft={5} marginRight={5}>
          <Typography>INFORMACION DE CLASIFICACION</Typography>
          <br />
          <Stack direction="row" spacing={2}>
            <TextField
              placeholder="N° de Clasificacion"
              type="text"
              label="N° de Clasificacion"
              variant="outlined"
              fullWidth
              value={id}
              disabled
            />
            <TextField
              placeholder="Nombre Material"
              type="text"
              label="Nombre Material"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.idMaterialType.name.toUpperCase()}
              disabled
            />
            <TextField
              placeholder="Peso en KG"
              type="number"
              label="Peso en KG"
              variant="outlined"
              fullWidth
              value={data.totalWeight}
              disabled
            />
          </Stack>
          <br />

          <Typography>INFORMACION DEL PROVEEDOR</Typography>
          <br />
          <Stack direction="row" spacing={2}>
            <TextField
              type="text"
              label="NIT del proveedor"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.coleccion.ruta.cita.proveedor.nit}
              disabled
            />
            <TextField
              type="text"
              label="Nombre del proveedor"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.coleccion.ruta.cita.proveedor.fullName}
              disabled
            />
            <TextField
              type="text"
              label="Direccion de residencia"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.coleccion.ruta.cita.proveedor.address}
              disabled
            />

          </Stack>
          <br />
          <Stack direction="row" spacing={2}>
            <TextField
              type="text"
              label="Ciudad de residencia"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.coleccion.ruta.cita.proveedor.place}
              disabled
            />
            <TextField
              type="email"
              label="Correo Electronico"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.coleccion.ruta.cita.proveedor.email !== null ? data.materiaPrima.coleccion.ruta.cita.proveedor.email : "" }
              disabled
            />
          </Stack>
          <br />
          <Stack direction="row" spacing={2}>
            <TextField
              type="text"
              label="Estado del Proveedor"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.coleccion.ruta.cita.proveedor.isActive ? "ACTIVO" : "INACTIVO"}
              disabled
            />
            <TextField
              type="text"
              label="N° de Celular"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.coleccion.ruta.cita.proveedor.cellphone !== null ? data.materiaPrima.coleccion.ruta.cita.proveedor.cellphone : "" }
              disabled
            />
          </Stack>
          <br />
          <Typography>INFORMACION CITA</Typography>
          <br />
          <Stack direction="row" spacing={2}>
            <TextField
              placeholder="Fecha de encuentro"
              type="text"
              label="Fecha de encuentro"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.coleccion.ruta.cita.meetDate}
              disabled
            />
            <TextField
              placeholder="Lugar de encuentro"
              type="text"
              label="Lugar de encuentro"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.coleccion.ruta.cita.meetPlace}
              disabled
            />
            <TextField
              type="text"
              label="Fecha de Registro"
              variant="outlined"
              fullWidth
              value={new Date(data.materiaPrima.coleccion.ruta.cita.createdAt).toLocaleDateString()}
              disabled
            />
          </Stack>
          <br />
          <Typography>INFORMACION DE RUTA</Typography>
          <br />
          <Stack direction="row" spacing={2}>
            <TextField
              type="email"
              label="Lugar de Inicio"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.coleccion.ruta.initPlace}
              disabled
            />
            <TextField
              type="text"
              label="Lugar de destino"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.coleccion.ruta.destinyPlace}
              disabled
            />
            <TextField
              type="text"
              label="Fecha de Registro"
              variant="outlined"
              fullWidth
              value={new Date(data.materiaPrima.coleccion.ruta.createdAt).toLocaleDateString()}
              disabled
            />
          </Stack>
          <br />
          <Typography>INFORMACION DE RECOLECCION</Typography>
          <br />
          <Stack direction="row" spacing={2}>
            <TextField
              type="text"
              label="Cantidad de Materia Prima Comprada"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.coleccion.materialsQuantity}
              disabled
            />
            <TextField
              type="text"
              label="Tipo de pago"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.coleccion.idPayType.platformName}
              disabled
            />
          </Stack>
          <br />
          <Stack direction="row" spacing={2}>
            <TextField
              type="text"
              label="Total de Compra"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.coleccion.spentMoney}
              disabled
            />
            <TextField
              type="text"
              label="Fecha de Registro"
              variant="outlined"
              fullWidth
              value={new Date(data.materiaPrima.coleccion.createdAt).toLocaleDateString()}
              disabled
            />
          </Stack>
          <br />
          <Typography>INFORMACION DE MATERIA PRIMA RECOLECTADA</Typography>
          <br />
          <Stack direction="row" spacing={2}>
            <TextField
              type="text"
              label="Tipo de Materia Prima"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.idMaterialType.name}
              disabled
            />
            <TextField
              type="text"
              label="Cantidad de Kg en Materia Prima"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.kgQuantity}
              disabled
            />
            <TextField
              type="text"
              label="Precio por Kg en Materia Prima"
              variant="outlined"
              fullWidth
              value={data.materiaPrima.materialPricePerKg}
              disabled
            />
          </Stack>
          <br />
          <Typography>INFORMACION DE LA PERSONA RESPONSABLE DE LA CLASIFICACION DE LA MATERIA PRIMA</Typography>
          <br />
          <Stack direction="row" spacing={2}>
            <TextField
              type="number"
              label="Identificacion"
              variant="outlined"
              fullWidth
              value={data.usuario.persona.identityNumber}
              disabled
            />
            <TextField
              type="text"
              label="Tipo de Identificacion"
              variant="outlined"
              fullWidth
              value={data.usuario.persona.documentType}
              disabled
            />
            <TextField
              type="text"
              label="Nombre Completo"
              variant="outlined"
              fullWidth
              value={`${data.usuario.persona.firstName} ${data.usuario.persona.lastName}`}
              disabled
            />
          </Stack>
          <br />
          <Stack direction="row" spacing={2}>
            <TextField
              type="text"
              label="Direccion de Residencia"
              variant="outlined"
              fullWidth
              value={data.usuario.persona.homeAddress}
              disabled
            />
            <TextField
              type="text"
              label="N° de Celular"
              variant="outlined"
              fullWidth
              value={data.usuario.persona.phoneNumber1}
              disabled
            />
            <TextField
              type="text"
              label="N° de Celular"
              variant="outlined"
              fullWidth
              value={data.usuario.persona.phoneNumber2}
              disabled
            />
          </Stack>
          <br />
          <Stack direction="row" spacing={2}>
            <TextField
              type="text"
              label="Barrio de Residencia"
              variant="outlined"
              fullWidth
              value={data.usuario.persona.neighborhood}
              disabled
            />
            <TextField
              type="text"
              label="Genero"
              variant="outlined"
              fullWidth
              value={data.usuario.persona.gender}
              disabled
            />
            <TextField
              type="text"
              label="Tipo de Sangre"
              variant="outlined"
              fullWidth
              value={data.usuario.persona.bloodType}
              disabled
            />
          </Stack>
          <br />
          <Stack direction="row" spacing={2}>
            <TextField
              type="text"
              label="Estado Civil"
              variant="outlined"
              fullWidth
              value={data.usuario.persona.maritalStatus}
              disabled
            />
            <TextField
              type="text"
              label="Cargo"
              variant="outlined"
              fullWidth
              value={data.usuario.persona.jobPosition}
              disabled
            />

          </Stack>
          <br />
          <Stack direction="row" spacing={2}>
            <TextField
              type="text"
              label="Fecha de Nacimiento"
              variant="outlined"
              fullWidth
              value={data.usuario.persona.birthday}
              disabled
            />
            <TextField
              type="text"
              label="Fecha de Admision"
              variant="outlined"
              fullWidth
              value={data.usuario.persona.admissionDate}
              disabled
            />
            <TextField
              type="text"
              label="Fecha de Registro"
              variant="outlined"
              fullWidth
              value={new Date(data.usuario.persona.createdAt).toLocaleDateString()}
              disabled
            />
          </Stack>
          <br />
          {
            data.usuario.roles !== null ? (
              <>
                <Typography>ROLES DE LA PERSONA</Typography>
                <br />
                {data.usuario.roles?.idUserRolInPermission?.map((value, index) => (
                  <Stack direction="row" key={index} spacing={2} marginBottom={2}>
                    <TextField

                      type="text"
                      label="Fecha de Registro"
                      variant="outlined"
                      fullWidth
                      value={value.nameView}
                      disabled
                    />
                    <TextField

                      type="text"
                      label="Fecha de Registro"
                      variant="outlined"
                      fullWidth
                      value={value.isActive ? "ACTIVO" : "INACTIVO"}
                      disabled
                    />
                  </Stack>

                ))}
              </>
            ) : (<></>)
          }
          <br />
          {
            data.lote !== null ? (
              <>
                <Typography>INFORMACION DE LOTE DE VENTA</Typography>
                <br />
                <Stack direction="row" spacing={2} >
                  <TextField
                    type="text"
                    label="N° de Lote"
                    variant="outlined"
                    fullWidth
                    value={data.lote !== null ? data.lote.id : ""}
                    disabled
                  />
                  <TextField
                    type="text"
                    label="Tipo de Lote"
                    variant="outlined"
                    fullWidth
                    value={data.lote.idMaterialType.name}
                    disabled
                  />
                  <TextField
                    type="text"
                    label="Cantidad de Productos en el Lote"
                    variant="outlined"
                    fullWidth
                    value={data.lote.productsQuantity}
                    disabled
                  />
                </Stack>
                <br />
                <Stack direction="row" spacing={2} >
                  <TextField
                    type="text"
                    label="Peso Total del Lote"
                    variant="outlined"
                    fullWidth
                    value={data.lote.totalWeightLote}
                    disabled
                  />
                  <TextField
                    type="text"
                    label="Vendido"
                    variant="outlined"
                    fullWidth
                    value={data.lote.sold ? "SI" : "NO"}
                    disabled
                  />
                </Stack>
                <br />
                {
                  data.lote.venta !== null && data.lote.venta.length > 0 ? (
                    <>
                      <Typography>INFORMACION DE VENTA</Typography>
                      <br />
                      {data.lote.venta.map((value, index) => (
                        <Stack direction="row" spacing={2} key={index} >
                          <TextField
                            type="text"
                            label="N° de Venta"
                            variant="outlined"
                            fullWidth
                            value={value.id}
                            disabled
                          />
                          <TextField
                            type="text"
                            label="Tipo de Pago"
                            variant="outlined"
                            fullWidth
                            value={value.idPayType.platformName}
                            disabled
                          />
                          <TextField
                            type="text"
                            label="Precio por Kg de Venta"
                            variant="outlined"
                            fullWidth
                            value={value.productPricePerKg}
                            disabled
                          />
                          <TextField
                            type="text"
                            label="Precio de Venta"
                            variant="outlined"
                            fullWidth
                            value={value.totalPrice}
                            disabled
                          />
                        </Stack>
                      ))
                      }
                      <br />
                      <Typography>INFORMACION DEL CLIENTE</Typography>
                      <br />
                      <Stack direction="row" spacing={2}>
                        <TextField
                          type="text"
                          label="NIT"
                          variant="outlined"
                          fullWidth
                          value={data.lote.venta[0].cliente.nit}
                          disabled
                        />
                        <TextField
                          type="text"
                          label="Nombre Completo"
                          variant="outlined"
                          fullWidth
                          value={data.lote.venta[0].cliente.fullName}
                          disabled
                        />
                        <TextField
                          type="text"
                          label="Direccion de Residencia"
                          variant="outlined"
                          fullWidth
                          value={data.lote.venta[0].cliente.address}
                          disabled
                        />
                      </Stack>
                      <br />
                      <Stack direction="row" spacing={2}>
                        <TextField
                          type="text"
                          label="Ciudad de Residencia"
                          variant="outlined"
                          fullWidth
                          value={data.lote.venta[0].cliente.place}
                          disabled
                        />
                        <TextField
                          type="text"
                          label="Correo Electronico"
                          variant="outlined"
                          fullWidth
                          value={data.lote.venta[0].cliente.email !== null ? data.lote.venta[0].cliente.email : ""}
                          disabled
                        />
                      </Stack>
                      <br />
                      <Stack direction="row" spacing={2}>
                          <TextField
                            type="text"
                            label="Estado del Cliente"
                            variant="outlined"
                            fullWidth
                            value={data.lote.venta[0].cliente.isActive ? "ACTIVO" : "INACTIVO"}
                            disabled
                          />
                          <TextField
                            type="text"
                            label="N° de Celular"
                            variant="outlined"
                            fullWidth
                            value={data.lote.venta[0].cliente.cellphone !== null ? data.lote.venta[0].cliente.cellphone : ""}
                            disabled
                          />
                        </Stack>

                    </>
                  ) : (<></>)
                }
              </>
            ) : (<></>)
          }



        </Box>

      </DialogContent>
    </Dialog>
  )
}

export default ViewHistoryClassifications