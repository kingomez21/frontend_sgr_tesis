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
                                                LA RECOLECCIÓN DE: ${value.idRoute.initPlace.toUpperCase()} - ${value.idRoute.destinyPlace.toUpperCase()} 
                                                SE TIENE UNA CANTIDAD DE: ${value.materialsQuantity} Y SE GASTÓ UN TOTAL DE: ${value.spentMoney}
                                                PAGADO POR: ${value.idPayType.platformName.toUpperCase()}
                                            `}
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