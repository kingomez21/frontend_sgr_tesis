import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Message from "../../components/Message";

const typesCP = [
    "---",
    "PERSONA NATURAL",
    "EMPRESA"
]

const statusActive = [
    "false", "true"
]

type dataProps = {
    id?: string
    type
    fullName: string
    address: string
    place: string
    nit?: string
    description: string
    email?: string
    cellphone?: string
    isActive?: boolean
}

type updateData = {
    type?: string
    fullName: string
    nit: string
    address: string
    place: string
    email?: string
    cellphone?: string
    isActive?: string
}

type props = {
    data: dataProps
    types?: string
}

const GET_ONE_CLIENT = gql`
query getOne($id: Int) {
    getOne: getOneClient(idClient: $id){
      id
      idCompany{
        name
      }
      fullName
      address
      place
      nit
      description
      type: idClientType{
        id
        name
      }
      cellphone
      email
      isActive
    }
  }

`

const GET_ONE_PROVIDER = gql`
query getOneProvider($id: Int) {
    getOne: getOneProvider(idProvider: $id){
      id
      idCompany{
        name
      }
      fullName
      address
      place
      nit
      description
      type: idProviderType{
        id
        name
      }
      cellphone
      email
      isActive
    }
  }

`

const VerClientProvider = () => {

    const { id, type } = useParams()
    const {data, loading, refetch} = useQuery(type === "cliente" ? GET_ONE_CLIENT : GET_ONE_PROVIDER, {
        variables: {
            id: parseInt(id)
        }
    })

    useEffect(() => {
        refetch()
    })
    
    return (
        <> 
            {loading ? <Typography>Cargando...</Typography> : <View data={data.getOne} types={type} />}
        </>
    )
}

const UPDATE_CLIENT = gql`
mutation ($id: String, $input: InputClient){
    result: updateClient(idClient: $id, clientUpdate: $input){
      message
    }
  }

`

const UPDATE_PROVIDER = gql`
mutation ($id: String, $input: inputProvider){
    result: updateProvider(idProvider: $id, providerUpdate: $input){
      message
    }
  }

`

const View = ({data, types}: props) => {
    
    const navigate = useNavigate()
    const [editable, setEditable] = useState(false)
    
    const [result,] = useMutation(types === "cliente" ? UPDATE_CLIENT : UPDATE_PROVIDER)

    const [type, setType] = useState(data.type.id)
    const [fullName, setFullName] = useState(data.fullName)
    const [address, setAddress] = useState(data.address)
    const [place, setPlace] = useState(data.place)
    const [nit, setNit] = useState(data.nit)
    const [isActive, setIsActive] = useState(""+data.isActive)
    const [email, setEmail] = useState(data.email?data.email:"")
    const [cellphone, setCellPhone] = useState(data.cellphone?data.cellphone:"")

    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState("")
    const [statusErr, setStatusErr] = useState(false)

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handlerEdit = () => {
        setEditable(true)
    }

    const submit = () => {
        handleOpen()
        const dataForm: updateData = {
            //type,
            fullName,
            address,
            place,
            nit,
            email,
            cellphone
        }
        //console.log(dataForm)
        result({
            variables: {
                id: data.id,
                input: dataForm
            }
        })
        .then( (data) => {
            setMsg(data.data.result.message)
            setTimeout( () => handleClose(), 6000)
        })
        .catch( () => {
            setStatusErr(true)
            setMsg("Ocurrio un error inesperado")
            setTimeout( () => handleClose(), 6000)
        })
        
    }

    return (
        <Dialog open fullScreen>
            <Message band={open} message={msg} status={statusErr ? false : true} />
            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography>INFORMACIÓN DE {fullName.toUpperCase()}</Typography>
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
                            <InputLabel>Seleccione el tipo de cliente</InputLabel>
                            <Select
                                label="Seleccione el tipo de cliente"
                                onChange={(e) => {
                                    const typeClient = e.target.value
                                    setType(typeClient)
                                }}
                                value={type}
                                disabled={!editable}
                            >
                                {typesCP?.map((v, i) => (
                                    <MenuItem
                                        key={i}
                                        value={i}
                                    >
                                        {v}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            placeholder="Ingrese su nombre completo"
                            type="text"
                            label="Nombre completo"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setFullName(e.target.value)
                            }}
                            disabled={!editable}
                            value={fullName}
                        />
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Estado</InputLabel>
                            <Select
                                label="Estado"
                                onChange={(e) => {
                                    const status = e.target.value
                                    setIsActive(status)
                                }}
                                value={isActive}
                                disabled={!editable}
                            >
                                {statusActive?.map((v, i) => {
                                    const valor = v === "true" ? "ACTIVO" : "INACTIVO"
                                    return (
                                        <MenuItem
                                            key={i}
                                            value={v}
                                        >
                                            {valor}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Stack>

                    <br />
                    <br />

                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Ingrese su dirección de residencia"
                            type="text"
                            label="Dirección"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }}
                            disabled={!editable}
                            value={address}
                        />
                        <TextField
                            placeholder="Ingrese la ciudad de residencia"
                            type="text"
                            label="Ciudad"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setPlace(e.target.value)
                            }}
                            disabled={!editable}
                            value={place}
                        />

                        <TextField
                            placeholder="Ingrese su Nit"
                            type="text"
                            label="NIT"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setNit(e.target.value)
                            }}
                            disabled={!editable}
                            value={nit}
                        />
                    </Stack>
                    <br />
                    <br />

                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Ingrese su email"
                            type="email"
                            label="Correo electrónico"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            disabled={!editable}
                            value={email}
                        />
                        <TextField
                            placeholder="Ingrese el teléfono celular"
                            type="text"
                            label="Teléfono"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setCellPhone(e.target.value)
                            }}
                            disabled={!editable}
                            value={cellphone}
                        />
                    </Stack>
                    <br />
                    <br />
                    <Stack justifyContent="center">
                        {editable ? (
                            <Button size="medium" variant="contained" onClick={() => submit()}>
                            <Typography>GUARDAR INFORMACIÓN</Typography>
                        </Button>
                        ) : (
                            <Button size="medium" variant="contained" onClick={() => handlerEdit()}>
                                <Typography>EDITAR INFORMACIÓN</Typography>
                            </Button>
                        )}
                        
                    </Stack>
                </Box>

            </DialogContent>
        </Dialog>
    )
}

export default VerClientProvider