import { Button, Grid, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"

type props = {
    data: any[]
}

const ListUsers = ({data}: props) => {

    const actions = () => {
        return (
            <Stack>
                <Button variant="contained">
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
                                secondaryAction={actions()}
                                disablePadding
                            >
                                <ListItemButton
        
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