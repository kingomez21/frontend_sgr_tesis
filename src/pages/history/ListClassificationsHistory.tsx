import { Grid, List, ListItem, ListItemButton, ListItemText, Paper, Stack, Typography } from "@mui/material"
import { ClassificationsType } from "../inventory/Itypes"
import { useNavigate } from "react-router-dom"

type props = {
    data: ClassificationsType[]
}

const ListClassificationsHistory = ({data}: props) => {
    const navigate = useNavigate()
    return (
        <Paper>
            <List component={Grid} container sx={{overflow: 'auto', maxHeight: 500}}>
                    {
                        data?.length > 0 ? (
                            data?.map((value) => (
                                <ListItem
                                    item
                                    key={value.id}
                                    component={Grid}
                                    xs={12} 
                                    md={6}
                                    sx={{
                                        "& > .MuiButtonBase-root": {
                                            border: 1,
                                            borderRadius: 1,
                                            borderColor: "divider",
                                            margin: "1%"
                                        },
                                    }}
                                    disablePadding
                                    
                                >
                                    <ListItemButton
                                        onClick={() => navigate(`clasificacion-historial/${value.id}`)}
                                    >
                                        <ListItemText 
                                            primary={`
                                                #${value.id} - ${value.idRawMaterial.idMaterialType.name.toUpperCase()} - ${value.totalWeight} KG 
                                                CLASIFICADO POR: ${value.idUserInfo.idPerson.firstName.toUpperCase()} ${value.idUserInfo.idPerson.lastName.toUpperCase()}
                                            `} 
                                            secondary={`FECHA: ${new Date(value.createdAt).toLocaleDateString()}`}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))

                        ) : (
                            <Stack direction="column" justifyContent="center" >
                                <Typography>No hay productos disponibles</Typography>
                            </Stack>
                        )
                        
                    }
                </List>
        </Paper>
    )
}

export default ListClassificationsHistory