import { Box, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import { useContextUserAuth } from "../../store"
import { useEffect, useState } from "react"
import { getPermission } from "../../hooks/getPermission"
import HistoryProvider from "./context/HistoryProvider"
import SearchIcon from '@mui/icons-material/Search';
import useHistoryContext from "./context/useHistoryContext"
import ListClassificationsHistory from "./ListClassificationsHistory"
import Fuse from "fuse.js"
import { Route, Routes } from "react-router-dom"
import ViewHistoryClassifications from "./ViewHistoryClassifications"

const History = () => {
    const setTitle = useContextUserAuth((state) => state.setTitle)
    const isOk = getPermission("modulo historial")

    useEffect(() => {
        setTitle("GESTION DE HISTORIAL")
    })

    return (
        isOk ? (
            <HistoryProvider>
                <Box marginLeft={5} marginRight={5}>
                    <ViewListClassification />
                </Box>
                <Routes>
                    <Route path="/clasificacion-historial/:id" element={<ViewHistoryClassifications />} />
                </Routes>
            </HistoryProvider>
        ) : (
            <Typography>No tiene permisos</Typography>
        )
    )
}

const optionsFuse = {
    includeScore: true,
    keys: ['id', 'idRawMaterial.materialName', 'idUserInfo.idPerson.firstName', 'idUserInfo.idPerson.lastName', 'totalWeight']
}

const ViewListClassification = () => {

    const {dataClassifications} = useHistoryContext()
    const [search, setSearch] = useState("")

    const fuse = new Fuse(dataClassifications, optionsFuse)

    return (
        <>
            <Stack direction="row" justifyContent="space-between" paddingBottom={3}>
                <TextField
                    label="Buscador"
                    sx={{ width: "49%" }}
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar producto clasificado"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton ><SearchIcon /></IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Typography>CANTIDAD: {dataClassifications.length}</Typography>
            </Stack>
            <ListClassificationsHistory data={(search === null || search === "") ? dataClassifications : fuse.search(search).map((value) => value.item) } />
        </>
    )
}

export default History