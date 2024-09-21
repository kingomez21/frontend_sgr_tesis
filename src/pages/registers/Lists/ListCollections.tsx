import { Grid, List, ListItem, ListItemButton, ListItemText, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"
import DataLoading from "../../../components/DataLoading"
import { Collections } from "../RegisterTypes"

type props = {
    data: Collections[]
    viewStyle?: boolean
}

const ListCollections = ({ data, viewStyle }: props) => {

    const navigate = useNavigate()

    return (
        <Stack direction="row" justifyContent="center" sx={{p:2}}>
            {data?.length > 0 ? (
                <List component={Grid} container sx={{ overflow: 'auto', maxHeight: 500 }}>
                    {

                        data?.map((value) => (
                            <ListItem
                                item
                                key={value.id}
                                component={Grid}
                                xs={12}
                                md={6}
                                sx={viewStyle || viewStyle !== undefined ? {
                                    "& > .MuiButtonBase-root": {
                                        border: 1,
                                        borderRadius: 1,
                                        borderColor: "divider",
                                        margin: "1%"
                                    },
                                } : {}}
                                disablePadding

                            >
                                <ListItemButton
                                    onClick={() => navigate(`editar-recoleccion/${value.id}`)}
                                >
                                    <ListItemText
                                        primary={`
                                                La recolección de : ${value.idRoute.initPlace} - ${value.idRoute.destinyPlace} 
                                                Se tiene una cantidad de: ${value.materialsQuantity} y se gastó un total de: ${value.spentMoney}
                                                pagado por: ${value.idPayType.platformName}
                                            `}
                                        secondary={`FECHA: `}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            ) : (
                <Stack justifyContent="center" alignContent="center">
                    <DataLoading />
                </Stack>
            )}
        </Stack>
    )
}

export default ListCollections