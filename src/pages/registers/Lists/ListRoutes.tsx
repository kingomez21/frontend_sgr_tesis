import { Grid, List, ListItem, ListItemButton, ListItemText, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"
import DataLoading from "../../../components/DataLoading"
import { Routes } from "../RegisterTypes"

type props = {
    data: Routes[]
    viewStyle?: boolean
}

const ListRoutes = ({ data, viewStyle }: props) => {

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
                                    onClick={() => navigate(`ruta/${value.id}`)}
                                >
                                    <ListItemText
                                        primary={`
                                                La ruta del : ${value.idDate.meetDate} 
                                                que va desde: ${value.initPlace.toUpperCase()} hasta: ${value.destinyPlace.toUpperCase()}
                                            `}
                                        secondary={`FECHA: ${value.idDate.meetDate}`}
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

export default ListRoutes