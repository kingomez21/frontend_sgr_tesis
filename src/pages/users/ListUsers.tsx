import { Button, Grid, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import Fuse from "fuse.js"
import { useMemo } from "react"
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
    search: string
}

const optionsFuse = {
    includeScore: true,
    keys: ['id', 'idPerson.firstName', 'idPerson.lastName']
}

const ListUsers = ({data, idCompany, search}: props) => {

    const navigate = useNavigate()

    const fuse = new Fuse(data, optionsFuse)

    const dataSearch = useMemo(() => {
        if (search === null || search === "") return data
        return fuse.search(search).map((value)=> value.item)
    }, [search])

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
            <Stack direction="row" >
                <List component={Grid} container sx={{ overflow: 'auto', maxHeight: 400 }}>
                    {
                        dataSearch?.length > 0 ? (

                            dataSearch?.map((value) => (
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

                        ) : (
                            <Stack direction="row" justifyContent="center" >
                                <Typography>No hay usuarios disponibles</Typography>
                            </Stack>
                        )
                        
                    }
                </List>
            </Stack>
        </>
    )
}

export default ListUsers