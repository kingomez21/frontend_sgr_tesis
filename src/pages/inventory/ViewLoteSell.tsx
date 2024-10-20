import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useContextUserAuth } from "../../store";
import { LoteSellType } from "./Itypes";
import { useEffect, useState } from "react";
import ListClassifications from "./ListClassifications";
import Message from "../../components/Message";
import { useInventoryContext } from "./Icontext";



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
    sell: idLoteSellInReceiptSell{
      id
      client: idClient{
        nit
        fullName
        address
 		place
        cellphone
        email
      }
      date
      perkg: productPricePerKg
      totalPrice
      pay: idPayType{
        name: platformName
      }
    }
  }
}

`

type dataQuery = {
    lote: LoteSellType
}

const ViewLoteSell = () => {
    const { id } = useParams()
    const dataUser = useContextUserAuth((state) => state.data)
    const {updated} = useInventoryContext()
    
    const { data, loading, refetch } = useQuery<dataQuery>(GET_ONE_LOTESELL, {
        variables: {
            id: `${id}`,
            idCompany: `${dataUser.idCompany.id}`
        }
    })

    useEffect( () => {
        refetch()
    }, [id, updated] )

    return (
        loading ? "Cargando..." : <ViewInformation data={data.lote} idCompany={dataUser.idCompany.id} />
    )
}

type propsInformation = {
    data: LoteSellType
    idCompany?: string
}

type ClientType = {
    id: string
    nit: string
    fullName: string
}

type ClientsQuery = {
    clients: ClientType[]
}

const GET_ALL_CLIENTS = gql`
query getAllClients($idCompany: String){
	clients: getAllClients(idCompany: $idCompany){
    id
    nit
    fullName
  }
}

`

type PayType = {
    id: string
    platformName: string
}

type PayTypeQuery = {
    pay: PayType[]
}

const GET_ALL_PAY_TYPE = gql`

query getAllPayType{
  pay: getAllPayType{
    id
    platformName
  }
}

`

const ViewInformation = ({ data, idCompany }: propsInformation) => {

    const navigate = useNavigate()

    const dataClients = useQuery<ClientsQuery>(GET_ALL_CLIENTS, {
        variables: {
            idCompany
        }
    })

    const dataPayTypes = useQuery<PayTypeQuery>(GET_ALL_PAY_TYPE, {
        variables: {
            idCompany
        }
    })

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
                        <Typography>INFORMACIÓN DE LOTE #{data.id}</Typography>
                    </Stack>
                    <Button variant="contained" onClick={() => navigate('crear-venta')} disabled={sold === true ? true : false}>
                        <Typography>CREAR VENTA</Typography>
                    </Button>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <br />
                <Box marginLeft={4} marginRight={4}>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Tipo de material"
                            type="text"
                            label="Tipo de material"
                            variant="outlined"
                            fullWidth
                            disabled={true}
                            value={name}
                        />
                        <TextField
                            placeholder="Cantidad de productos"
                            type="number"
                            label="Cantidad de productos"
                            variant="outlined"
                            fullWidth
                            disabled={true}
                            value={products}
                        />
                    </Stack>
                    <br />
                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Total en Kg"
                            type="number"
                            label="Total en Kg"
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
                            value={sold ? "SI" : "NO"}
                        />
                    </Stack>
                    <br /><br />
                    {sold ? (
                        <>
                            <Typography>INFORMACIÓN DE VENTA</Typography>
                            <br />
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    placeholder="NIT del cliente"
                                    type="text"
                                    label="NIT del cliente"
                                    variant="outlined"
                                    fullWidth
                                    disabled={true}
                                    value={data.sell[0].client.nit}
                                />
                                <TextField
                                    placeholder="Nombre del cliente"
                                    type="text"
                                    label="Nombre del cliente"
                                    variant="outlined"
                                    fullWidth
                                    disabled={true}
                                    value={data.sell[0].client.fullName}
                                />
                                <TextField
                                    placeholder="Dirección de residencia"
                                    type="text"
                                    label="Dirección de residencia"
                                    variant="outlined"
                                    fullWidth
                                    disabled={true}
                                    value={data.sell[0].client.address}
                                />
                            </Stack>
                            <br />
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    placeholder="Ciudad de residencia"
                                    type="text"
                                    label="Ciudad de residencia"
                                    variant="outlined"
                                    fullWidth
                                    disabled={true}
                                    value={data.sell[0].client.place}
                                />
                                <TextField
                                    placeholder="N° de Celular"
                                    type="text"
                                    label="N° de Celular"
                                    variant="outlined"
                                    fullWidth
                                    disabled={true}
                                    value={data.sell[0]?.client.cellphone === null ? "" : data.sell[0]?.client.cellphone}
                                />
                                <TextField
                                    placeholder="Correo electrónico"
                                    type="text"
                                    label="Correo electrónico"
                                    variant="outlined"
                                    fullWidth
                                    disabled={true}
                                    value={data.sell[0]?.client.email === null ? "" : data.sell[0]?.client.email }
                                />
                            </Stack>
                            <br />
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    placeholder="Fecha de venta"
                                    type="text"
                                    label="Fecha de venta"
                                    variant="outlined"
                                    fullWidth
                                    disabled={true}
                                    value={data.sell[0].date}
                                />
                                <TextField
                                    placeholder="Tipo de pago"
                                    type="text"
                                    label="Tipo de pago"
                                    variant="outlined"
                                    fullWidth
                                    disabled={true}
                                    value={data.sell[0].pay.name}
                                />
                            </Stack>
                            <br />
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    placeholder="Precio por Kg"
                                    type="number"
                                    label="Precio por Kg"
                                    variant="outlined"
                                    fullWidth
                                    disabled={true}
                                    value={data.sell[0].perkg}
                                />
                                <TextField
                                    placeholder="Valor de venta"
                                    type="number"
                                    label="Valor de venta"
                                    variant="outlined"
                                    fullWidth
                                    disabled={true}
                                    value={data.sell[0].totalPrice}
                                />
                            </Stack>
                        </>
                    ) : (
                        <></>
                    )}

                    <br /><br />
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>LISTADO DE PRODUCTOS</Typography>
                        <Typography>CANTIDAD: {data.cls.length}</Typography>
                    </Stack>
                    <br />
                    <ListClassifications data={data.cls} viewStyle={true} />
                </Box>

            </DialogContent>
            <Routes>
                <Route path="/crear-venta" element={<FormCreateSell idLote={data.id} idCompany={idCompany} clients={dataClients.loading ? [] : dataClients.data.clients} paytypes={dataPayTypes.loading ? [] : dataPayTypes.data.pay} />} />
            </Routes>
        </Dialog>
    )
}

type propsFormSell = {
    clients: ClientType[]
    paytypes: PayType[]
    idCompany: string
    idLote: string
}

const CREATE_RECEIPT_SELL = gql`
mutation createReceiptSell($input: inputReceiptSell){
  sell: createReceiptSell(sell: $input){
    message
  }
}

`

const FormCreateSell = ({ clients, paytypes, idCompany, idLote}: propsFormSell) => {

    const navigate = useNavigate()
    const {setUpdated} = useInventoryContext()
    const [sell] = useMutation(CREATE_RECEIPT_SELL)
    const [idClient, setIdClient] = useState("0")
    const [idPayType, setIdPayType] = useState("0")
    const [perkg, setPerKG] = useState(0)

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
        const data = {
            idClient,
            idPayType,
            perkg,
            idCompany,
            idLote
        }
        
        sell({
            variables: {
                input: data
            }
        })
        .then( (data) => {
            setMsg(data.data.sell.message)
            setTimeout( () => handleClose(), 6000)
            setUpdated("venta")
        } )
        .catch( () => {
            setStatusErr(true)
            setMsg("Ocurrió un error inesperado")
            setTimeout( () => handleClose(), 6000)
        } )
    }
    
    return (
        <Dialog scroll="paper" open sx={{ height: "auto" }}>
            <Message band={open} message={msg} status={statusErr ? false : true} />
            <DialogTitle>
                <Stack direction="row" spacing={2} marginTop={2} justifyContent="space-between">
                    <Stack direction="row">
                        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                        <Typography>FORMULARIO DE VENTA</Typography>
                    </Stack>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <br />
                <Box width={500} marginLeft={2} marginRight={2}>
                    <Stack direction="row" spacing={2}>
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione al cliente</InputLabel>
                            <Select
                                label="Seleccione al cliente"
                                onChange={(e) => {
                                    const id: string = e.target.value
                                    setIdClient(id)
                                }}
                                value={idClient}
                            >

                                {
                                    clients.length <= 0 ? (
                                        <></>
                                    ) : (
                                        clients?.map((v, i) => (
                                            <MenuItem
                                                key={i}
                                                value={v.id}
                                            >
                                                {v.nit} - {v.fullName}
                                            </MenuItem>
                                        ))
                                    )
                                }
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
                                    const id: string = e.target.value
                                    setIdPayType(id)
                                }}
                                value={idPayType}
                            >

                                {
                                    paytypes.length <= 0 ? (
                                        <></>
                                    ) : (
                                        paytypes?.map((v, i) => (
                                            <MenuItem
                                                key={i}
                                                value={v.id}
                                            >
                                                {v.platformName}
                                            </MenuItem>
                                        ))
                                    )
                                }
                            </Select>
                        </FormControl>

                    </Stack>
                    <br />
                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Precio por Kg"
                            type="number"
                            label="Precio por Kg"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setPerKG(parseInt(e.target.value))}
                        />
                    </Stack>
                    <br />
                    <Button variant="contained" fullWidth onClick={() => submit()}>
                        <Typography>GUARDAR INFORMACIÓN</Typography>
                    </Button>
                </Box>

            </DialogContent>
        </Dialog>
    )
}

export default ViewLoteSell