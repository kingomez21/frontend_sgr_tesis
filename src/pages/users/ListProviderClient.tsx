import { gql, useMutation } from "@apollo/client"
import { Button, Grid, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Message from "../../components/Message"

export type ClientProvider = {
    id: number
    identity: number
    idType: string
    idCompany: string
    fullName: string
    nit: string
    address: string
    place: string
    isActive: boolean
    description: string
}

type props = {
    data: ClientProvider[]
    search?: string
}

const DELETE_P_C = gql`
mutation deletePC($idPC: String, $status: String, $typePC: String){
    dlPC: deleteProviderClient(idPC: $idPC, status: $status, typePC: $typePC){
      message
    }
  }

`

const ListProviderClient = ({ data }: props) => {

    const navigate = useNavigate()
    const [deletePC] = useMutation(DELETE_P_C)

    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState("")
    const [statusErr, setStatusErr] = useState(false)


    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const delete_p_c = (idPC: string, typePC: string) => {
        handleOpen()
        deletePC({
            variables: {
                idPC,
                typePC,
                status: "false"
            }
        })
            .then((data) => {
                setMsg(data.data.dlPC.message)
                setTimeout(() => handleClose(), 6000)
            })
            .catch(() => {
                setStatusErr(true)
                setMsg("Ocurrio un error inesperado")
                setTimeout(() => handleClose(), 6000)
            })
    }

    const actions = (idPC: string, typePC: string) => {
        return (
            <>
                <Stack alignItems="center" >
                    <Button size="small" variant="contained" color="error" onClick={() => delete_p_c(idPC, typePC)}>
                        <Typography>Eliminar</Typography>
                    </Button>
                </Stack>
            </>
        )
    }

    return (
        <>
            <Stack direction="row">
                <Message band={open} message={msg} status={statusErr ? false : true} />
                <List component={Grid} container sx={{ overflow: 'auto', maxHeight: 400 }} >
                    {
                        data?.length > 0 ? (

                            data?.map((value) => (
                                <ListItem
                                    item
                                    key={value.id}
                                    component={Grid}
                                    xs={12}
                                    md={6}
                                    secondaryAction={actions("" + value.identity, value.description)}
                                    disablePadding
                                >
                                    <ListItemButton
                                        onClick={() => navigate(`${value.description}/${value.identity}`)}
                                    >
                                        <ListItemText primary={`${value.fullName}`} secondary={`${value.description} - ${value.isActive ? "ACTIVO" : "INACTIVO"}`} />
                                    </ListItemButton>
                                </ListItem>
                            ))

                        ) : (
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Typography>No hay clientes o proveedores disponibles</Typography>
                            </Stack>
                        )
                    }
                </List>
            </Stack>
        </>
    )
}

export default ListProviderClient