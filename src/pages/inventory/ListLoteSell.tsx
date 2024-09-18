import { Grid, List, ListItem, ListItemButton, ListItemText, Stack } from "@mui/material"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { LoteSellType } from "./Itypes";
import { useNavigate } from "react-router-dom";
import DataLoading from "../../components/DataLoading";

type props = {
    data: LoteSellType[]
    viewStyle?: boolean
}
const ListLoteSell = ({ data, viewStyle }: props) => {

    const navigate = useNavigate()

    const actions = (vendido: boolean) => {
        return (
            vendido ? <CheckCircleOutlineIcon htmlColor="green" /> : <WatchLaterIcon htmlColor="gray" />
        )
    }

    return (
        <Stack direction="row" justifyContent="center" sx={{ p: 2 }}>
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
                                secondaryAction={actions(value.sold)}
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
                                    onClick={() => navigate(`lote/${value.id}`)}
                                >
                                    <ListItemText
                                        primary={`
                                                LOTE #: ${value.id} TIPO: ${value.material.name.toUpperCase()} - CANTIDAD: ${value.products} - TOTAL: ${value.total} KG  
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

export default ListLoteSell