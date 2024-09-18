import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useInventoryContext } from "./Icontext";
import ListClassifications from "./ListClassifications";
import SearchIcon from '@mui/icons-material/Search';
import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import ViewClassification from "./ViewClassification";
import CreateLote from "./CreateLote";

type props = {
    title: string
    type: number
}

const optionsFuse = {
    includeScore: true,
    keys: ['id', 'idRawMaterial.materialName', 'idUserInfo.idPerson.firstName', 'idUserInfo.idPerson.lastName', 'totalWeight']
}

const ViewListCompletedClassificated = ({ title, type }: props) => {

    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const { dataClassifications, dataClassicationsStock } = useInventoryContext()

    const fuseCls = new Fuse(dataClassifications, optionsFuse)
    const fuseStock = new Fuse(dataClassicationsStock, optionsFuse)

    const dataClsSearh = useMemo(() => {
        if (search === null || search === "") return dataClassifications
        return fuseCls.search(search).map((value) => value.item)
    }, [search])

    const dataStockSearh = useMemo(() => {
        if (search === null || search === "") return dataClassicationsStock
        return fuseStock.search(search).map((value) => value.item)
    }, [search])

    const quantityFuntions = () => {
        if (type === 1) return (
            <Stack direction="row" spacing={2}>
                <Typography>CANTIDAD: {dataClassifications.length} </Typography>
                <Typography>VENDIDOS: {dataClassifications.filter((value) => value.idLoteSell?.sold === true).length}</Typography>
                <Typography>SIN VENDER: {dataClassifications.filter((value) => value.idLoteSell?.sold !== true || value.idLoteSell === null).length} </Typography>
            </Stack>
        )

        if (type === 2) return (
            <Stack direction="row">
                <Typography sx={{ marginTop: 0.7 }}>CANTIDAD: {dataClassicationsStock.length} </Typography>
                &nbsp;&nbsp;&nbsp;
                <Button onClick={() => navigate('crear-lote')} variant="contained" >CREAR LOTE DE VENTA</Button>
            </Stack>
        )
    }

    const viewListData = () => {
        if (type === 1) return (
            <ListClassifications data={dataClsSearh} viewStyle={true} />
        )

        if (type === 2) return (
            <ListClassifications data={dataStockSearh} viewStyle={true} />
        )
    }

    return (
        <Dialog open fullScreen>
            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2} justifyContent="space-between">
                    <Stack direction="row">
                        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                        <Typography>{title}</Typography>
                    </Stack>
                    {quantityFuntions()}
                </Stack>
            </DialogTitle>
            <DialogContent>
                <br />
                <Box marginLeft={4} marginRight={4}>
                    <TextField
                        label="Buscador"
                        sx={{ width: "49%", marginLeft: "0.5%" }}
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar producto"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton ><SearchIcon /></IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    &nbsp;&nbsp;
                    {viewListData()}
                </Box>

            </DialogContent>
            <Routes>    
                <Route path="/clasificacion/:id" element={<ViewClassification />} />
                <Route path="/crear-lote" element={<CreateLote />} />
            </Routes>
        </Dialog>
    )
}

export default ViewListCompletedClassificated