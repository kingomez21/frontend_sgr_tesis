import { Box, Button, Paper, Stack, Typography } from "@mui/material"
import RefreshIcon from '@mui/icons-material/Refresh';
import { useContextUserAuth } from "../../store"
import { useEffect } from "react"
import { getPermission } from "../../hooks/getPermission"
import { InventoryProvider, useInventoryContext } from "./Icontext"
import { Route, Routes, useNavigate } from "react-router-dom"
import ListClassifications from "./ListClassifications"
import ListLoteSell from "./ListLoteSell";
import ViewListCompletedClassificated from "./ViewListCompletedClassificated";
import ViewListLoteSell from "./ViewListLoteSell";
import ViewClassification from "./ViewClassification";
import ViewLoteSell from "./ViewLoteSell";

const Inventory = () => {

    const setTitle = useContextUserAuth((state) => state.setTitle)
    const isOk = getPermission("modulo inventario")
    

    useEffect(() => {
        setTitle("GESTION DE INVENTARIO")

    })

    return (
        isOk ? (
            <InventoryProvider >
                <Box>
                    <Stack marginLeft={5} marginRight={5}>
                        <InfoCounts text="LISTADO DE PRODUCTOS CLASIFICADOS" type={1} navigation="listado-productos-clasificados" refresh={true} />
                        &nbsp;&nbsp;
                        <Paper>
                            <SeccionClassified />
                        </Paper>
                    </Stack>
                    <br /><br />
                    <Stack marginLeft={5} marginRight={5}>
                        <InfoCounts text="LISTADO DE PRODUCTOS EN STOCK" type={2} navigation="listado-productos-stock" refresh={false} />
                        &nbsp;&nbsp;
                        <Paper>
                            <SeccionStock />
                        </Paper>
                    </Stack>
                    <br /><br />
                    <Stack marginLeft={5} marginRight={5}>
                        <InfoCounts text="LISTADO DE LOTE DE VENTA" type={3} navigation="listado-lotes" refresh={false} />
                        &nbsp;&nbsp;
                        <Paper>
                            <SeccionLoteSell />
                        </Paper>
                    </Stack>
                </Box>
                <Routes>
                    <Route path="/listado-productos-clasificados/*" element={<ViewListCompletedClassificated type={1} title="LISTADO DE PRODUCTOS CLASIFICADOS" />} />
                    <Route path="/listado-productos-stock/*" element={<ViewListCompletedClassificated type={2} title="LISTADO DE PRODUCTOS EN STOCK" />} />
                    <Route path="/listado-lotes/*" element={<ViewListLoteSell />} />
                    <Route path="/clasificacion/:id" element={<ViewClassification />} />
                    <Route path="/lote/:id" element={<ViewLoteSell />} />
                </Routes>
            </InventoryProvider>
        ) : (
            <Typography>No tiene permisos</Typography>
        )
    )
}

type InfoCountsTypes = {
    text: string
    navigation: string
    refresh?: boolean
    type: number
}

const InfoCounts = ({ text, navigation, refresh, type }: InfoCountsTypes) => {

    const navigate = useNavigate()
    const {setUpdated, dataClassifications, dataClassicationsStock, dataLoteSell} = useInventoryContext()

    const quantity = () => {
        if (type === 1) return dataClassifications.length
        if (type === 2) return dataClassicationsStock.length
        if (type === 3) return dataLoteSell.length
    }

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
        >
            <Typography>{text}</Typography>
            {refresh === true ? <Button size="large" startIcon={<RefreshIcon />} onClick={() => setUpdated("algo")} >ACTUALIZAR</Button>: <></>}
            <Stack direction="row">
                
                <Typography sx={{marginTop: 0.7}}>CANTIDAD: {quantity()} </Typography>
                &nbsp;&nbsp;&nbsp;
                <Button variant="contained" onClick={() => navigate(navigation)}>VER LISTADO COMPLETO</Button>
            </Stack>
        </Stack>
    )
}

const SeccionClassified = () => {
    const {dataClassifications} = useInventoryContext()

    return (
        <>
            <ListClassifications data={dataClassifications.slice(0, 4)} />
        </>
    )
}

const SeccionStock = () => {
    const {dataClassicationsStock} = useInventoryContext()
    
    return (
        <ListClassifications data={dataClassicationsStock.slice(0, 4)} />
    )
}

const SeccionLoteSell = () => {
    const {dataLoteSell} = useInventoryContext()
    return (
        <ListLoteSell data={dataLoteSell.slice(0,4)} />
    )
}

export default Inventory