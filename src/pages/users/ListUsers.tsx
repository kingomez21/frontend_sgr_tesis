import { Button, Grid, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

type props = {
    data: any[]
}

const ListUsers = ({data}: props) => {

    const navigate = useNavigate()

    const actions = (idUser: number) => {
        return (
            <Stack>
                <Button variant="contained" onClick={() => navigate(`permisos/${idUser}`)}>
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
                                secondaryAction={actions(value.id)}
                                disablePadding
                            >
                                <ListItemButton
                                    onClick={() => navigate(`empleado/${value.id}`)}
                                >
                                    <ListItemText primary="Usuario #1" secondary="Usuario" />
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