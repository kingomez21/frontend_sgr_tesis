import { Grid, List, ListItem, ListItemButton, ListItemText, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"
import DataLoading from "../../../components/DataLoading"
import { Appointments } from "../RegisterTypes"

type props = {
    data: Appointments[]
    viewStyle?: boolean
}

const ListAppointments = ({ data, viewStyle }: props) => {

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
                                    onClick={() => navigate(`cita/${value.id}`)}
                                >
                                    <ListItemText
                                        primary={`
                                                PROVEEDOR: ${value.idProvider.fullName.toUpperCase()} 
                                                - CITA: ${value.meetDate} - LUGAR: ${value.meetPlace.toUpperCase()}
                                            `}
                                        secondary={`FECHA: ${value.meetDate}`}
                                    //secondary={value.idLoteSell.sold ? <CheckCircleOutlineIcon htmlColor="green"/> : <WatchLaterIcon /> }
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

export default ListAppointments