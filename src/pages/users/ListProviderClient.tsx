import { Button, Grid, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

type ClientProvider = {
    id: number
    identity: number
    idType: string
    idCompany: string
    fullName: string
    nit: string
    address: string
    place: string
    description: string
}

type props = {
    data: ClientProvider[]
}

const ListProviderClient = ({ data }: props) => {

    const navigate = useNavigate()

    const actions = () => {
        return (
            <>
                <Stack alignItems="center" >
                    <Button size="small" variant="contained" color="error">
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
                        data?.map((value) => (
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
                                    onClick={() => navigate(`${value.description}/${value.identity}`)}
                                >
                                    <ListItemText primary={`${value.fullName}`} secondary={`${value.description}`} />
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