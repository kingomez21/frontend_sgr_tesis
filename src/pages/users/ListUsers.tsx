import { Button, Grid, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

type person = {
    firstName: string
    lastName: string
}

type dataUser = {
    id: string
    idPerson: person
    isActive: boolean
}

type props = {
    data: dataUser[]
    idCompany: string
}

const ListUsers = ({data, idCompany}: props) => {

    const navigate = useNavigate()

    const actions = (idUser: string, namePerson: string) => {
        return (
            <Stack>
                <Button variant="contained" onClick={() => navigate(`permisos/${namePerson}/${idUser}`)}>
                    <Typography>Asignar permisos</Typography>
                </Button>
            </Stack>
        )
    }

    return (
        <>
            <Stack direction="row">
                <List component={Grid} container >
                    {
                        data.map((value) => (
                            <ListItem
                                item
                                key={value.id}
                                component={Grid}
                                xs={12} 
                                md={6}
                                secondaryAction={actions(value.id, `${value.idPerson.firstName.trim()} ${value.idPerson.lastName.trim()}`)}
                                disablePadding
                            >
                                <ListItemButton
                                    onClick={() => navigate(`empleado/${value.id}/${idCompany}`)}
                                >
                                    <ListItemText primary={`${value.idPerson.firstName} ${value.idPerson.lastName}`} secondary={value.isActive ? "Activo": "Despedido"} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Stack>
        </>
    )
}

export default ListUsers