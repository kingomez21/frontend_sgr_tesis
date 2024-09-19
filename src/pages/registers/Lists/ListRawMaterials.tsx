import { Grid, List, ListItem, ListItemButton, ListItemText, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"
import DataLoading from "../../../components/DataLoading"
import { dataRawMaterial } from "../RegisterTypes"

type dataProps = {
    data: dataRawMaterial[]
    viewStyle?: boolean
}

const ListRawMaterials = ({data, viewStyle}: dataProps) => {

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
                                    onClick={() => navigate(`recoleccion/${value.id}`)}
                                >
                                    <ListItemText
                                        primary={`
                                                ID: ${value.id} Tipo de materia prima: ${value.idMaterialType.name} Peso en Kg: ${value.kgQuantity}
                                                Precio por Kg: ${value.materialPricePerKg}
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

export default ListRawMaterials