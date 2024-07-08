import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useInventoryContext } from "./Icontext";
import ListLoteSell from "./ListLoteSell";
import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import ViewLoteSell from "./ViewLoteSell";

const optionsFuse = {
    includeScore: true,
    keys: ['id', 'material.name', 'products', 'sold', 'total']
}

const ViewListLoteSell = () => {

    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const {dataLoteSell} = useInventoryContext()

    const fuse = new Fuse(dataLoteSell, optionsFuse)
    
    const dataSearh = useMemo(() => {
        if (search === null || search === "") return dataLoteSell
        return fuse.search(search).map((value) => value.item)
    }, [search])

    return (
        <Dialog open fullScreen>
            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2} justifyContent="space-between">
                    <Stack direction="row">
                        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                        <Typography>LISTADO DE LOTE DE VENTA</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Typography>CANTIDAD: {dataLoteSell.length} </Typography>
                        <Typography>VENDIDOS: {dataLoteSell.filter((value) => value.sold === true).length}</Typography>
                        <Typography>SIN VENDER: {dataLoteSell.filter((value) => value.sold !== true).length} </Typography>
                    </Stack>
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
                        placeholder="Buscar lote"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton ><SearchIcon /></IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    &nbsp;&nbsp;
                    <ListLoteSell data={dataSearh} viewStyle={true} />
                </Box>

            </DialogContent>
            <Routes>
                <Route path="/lote/:id" element={<ViewLoteSell />} />
            </Routes>
        </Dialog>
    )
}

export default ViewListLoteSell