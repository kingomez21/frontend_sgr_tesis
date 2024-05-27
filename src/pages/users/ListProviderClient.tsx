import { Button, Grid, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"

type props = {
    data: any[]
}

const ListProviderClient = ({ data }: props) => {

    const actions = () => {
        return (
            <>
                <Stack alignItems="center" >
                    <Button size="small" variant="outlined" color="error">
                        <Typography>Eliminar</Typography>
                    </Button>
                </Stack>
            </>
        )
    }

    return (
        <>
            <Stack direction="row">
                <List component={Grid} container sx={{overflow: 'auto'}}>
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
                                    onClick={() => alert("abrio")}
                                >
                                    <ListItemText primary="cliente #1" secondary="Cliente" />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Stack>
        </>
    )
}

export default ListProviderClient