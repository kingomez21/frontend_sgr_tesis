import { Grid, List, ListItem, ListItemButton, ListItemText, Stack } from "@mui/material"
import { ClassificationsType, idLoteSellType } from "./Itypes"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { useNavigate } from "react-router-dom";
import DataLoading from "../../components/DataLoading";

type props = {
    data: ClassificationsType[]
    viewStyle?: boolean
}

const ListClassifications = ({ data, viewStyle }: props) => {

    const navigate = useNavigate()

    const actions = (vendido: idLoteSellType) => {
        return (
            vendido !== null ? vendido.sold ? <CheckCircleOutlineIcon htmlColor="green" /> : <WatchLaterIcon htmlColor="gray" /> : <WatchLaterIcon htmlColor="gray" />
        )
    }

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
                                secondaryAction={actions(value.idLoteSell)}
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
                                    onClick={() => navigate(`clasificacion/${value.id}`)}
                                >
                                    <ListItemText
                                        primary={`
                                                ${value.idRawMaterial.idMaterialType.name.toUpperCase()} - ${value.totalWeight} KG 
                                                CLASIFICADO POR: ${value.idUserInfo.idPerson.firstName.toUpperCase()} ${value.idUserInfo.idPerson.lastName.toUpperCase()}
                                            `}
                                        secondary={`FECHA: ${new Date(value.createdAt).toLocaleDateString()}`}
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

export default ListClassifications