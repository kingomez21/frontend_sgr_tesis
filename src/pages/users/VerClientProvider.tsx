import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const typesCP = [
    "---",
    "PERSONA NATURAL",
    "EMPRESA"
]

type dataProps = {
    id?: string
    type: any
    fullName: string
    address: string
    place: string
    nit?: string
    description: string
    email?: string
    cellphone?: string
}

type updateData = {
    type?: string
    fullName: string
    nit: string
    address: string
    place: string

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
    }
  }

`

const VerClientProvider = () => {

    const { id, type } = useParams()
    const {data, loading} = useQuery(type === "cliente" ? GET_ONE_CLIENT : GET_ONE_PROVIDER, {
        variables: {
            id: parseInt(id)
        }
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
    //const [email, setEmail] = useState(data.email)
    //const [cellphone, setCellPhone] = useState(data.cellphone)

    const handlerEdit = () => {
        setEditable(true)
    }

    const submit = () => {
        let dataForm: updateData = {
            //type,
            fullName,
            address,
            place,
            nit
            /*email,
            cellphone*/
        }
        console.log(dataForm)
        result({
            variables: {
                id: data.id,
                input: dataForm
            }
        })
        .then( (data) => {
            console.log(data.data.result.message)
        })
        .catch( (err) => console.log(err))
        .finally()
    }

    return (
        <Dialog open fullScreen>
            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography>INFORMACION DE {fullName.toUpperCase()}</Typography>
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
                                label="Seleccione el tipo de documento"
                                onChange={(e) => {
                                    const typeClient: any = e.target.value
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
                            label="Nombre Completo"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setFullName(e.target.value)
                            }}
                            disabled={!editable}
                            value={fullName}
                        />
                    </Stack>

                    <br />
                    <br />

                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Ingrese su direccion de residencia"
                            type="text"
                            label="Direccion"
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
                            label="Nit"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setNit(e.target.value)
                            }}
                            disabled={!editable}
                            value={nit}
                        />
                    </Stack>
                    {/*
                    <br />
                    <br />

                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Ingrese su email"
                            type="email"
                            label="Correo Electronico"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            disabled={!editable}
                            value={email}
                        />
                        <TextField
                            placeholder="Ingrese el telefono celular"
                            type="text"
                            label="Telefono"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setCellPhone(e.target.value)
                            }}
                            disabled={!editable}
                            value={cellphone}
                        />
                    </Stack>*/}
                    <br />
                    <br />
                    <Stack justifyContent="center">
                        {editable ? (
                            <Button size="medium" variant="contained" onClick={() => submit()}>
                            <Typography>GUARDAR INFORMACION</Typography>
                        </Button>
                        ) : (
                            <Button size="medium" variant="contained" onClick={() => handlerEdit()}>
                                <Typography>EDITAR INFORMACION</Typography>
                            </Button>
                        )}
                        
                    </Stack>
                </Box>

            </DialogContent>
        </Dialog>
    )
}

export default VerClientProvider