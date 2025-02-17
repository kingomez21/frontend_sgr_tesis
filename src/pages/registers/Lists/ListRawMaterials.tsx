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
                                    onClick={() => navigate(`editar-materiaprima/${value.id}`)}
                                >
                                    <ListItemText
                                        primary={`
                                                ID: ${value.id} TIPO DE MATERIA PRIMA: ${value.idMaterialType.name.toUpperCase()} PESO EN Kg: ${value.kgQuantity}
                                                PRECIO POR Kg: ${value.materialPricePerKg}
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

export default ListRawMaterials