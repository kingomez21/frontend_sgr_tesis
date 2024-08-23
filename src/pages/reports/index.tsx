import { Box, Grid, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useContextUserAuth } from "../../store"
import { getPermission } from "../../hooks/getPermission"
import dayjs from "dayjs"
import { gql, useQuery } from "@apollo/client"
import PieGraphics from "./graphics/PieGraphics"
import BarGraphics from "./graphics/BarGraphics"
import { Bar, Rectangle } from "recharts"

const Reports = () => {

    const setTitle = useContextUserAuth((state) => state.setTitle)
    const isOk = getPermission("modulo reporte")

    const [dateInit, setDateInit] = useState(dayjs().subtract((new Date().getDate() - 1), "d").format("YYYY-MM-DDThh:mm"))
    const [dateEnd, setDateEnd] = useState(dayjs().format("YYYY-MM-DDThh:mm"))
    
    useEffect(() => {
        setTitle("GESTION DE REPORTES")
    },)
    return (
        isOk ? (
            <Box marginLeft={5} marginRight={5} paddingBottom={2}>
                <Stack direction="row" justifyContent="flex-end">
                    <Stack direction="row" spacing={2}>
                        <TextField
                            type="datetime-local"
                            value={dateInit}
                            onChange={(e) => setDateInit(e.target.value)}
                        />
                        <TextField
                            type="datetime-local"
                            value={dateEnd}
                            onChange={(e) => setDateEnd(e.target.value)}
                        />
                    </Stack>
                </Stack>
                <br />
                <Grid container columns={{xs: 6, sm: 12, md: 12}} spacing={2}>

                    <Grid item xs={6} >
                        <ViewEmployes />
                    </Grid>

                    <Grid item xs={6} >
                        <ViewSpendOrSell dateInit={dayjs(dateInit).format("YYYY-MM-DD HH:mm:ss[TZ]")} dateEnd={dayjs(dateEnd).format("YYYY-MM-DD HH:mm:ss[TZ]")} />
                    </Grid>

                    <Grid item xs={6} sm={12} md={12}>
                        <ViewMaterialTypeSold dateInit={dayjs(dateInit).format("YYYY-MM-DD HH:mm:ss[TZ]")} dateEnd={dayjs(dateEnd).format("YYYY-MM-DD HH:mm:ss[TZ]")} />
                    </Grid>

                    <Grid item xs={6} sm={12} md={12}>
                        <ViewClassificationMaterialType dateInit={dayjs(dateInit).format("YYYY-MM-DD HH:mm:ss[TZ]")} dateEnd={dayjs(dateEnd).format("YYYY-MM-DD HH:mm:ss[TZ]")} />
                    </Grid>

                    <Grid item xs={6} sm={6} md={6}>
                        <ViewClassificationProcedureType dateInit={dayjs(dateInit).format("YYYY-MM-DD HH:mm:ss[TZ]")} dateEnd={dayjs(dateEnd).format("YYYY-MM-DD HH:mm:ss[TZ]")} />
                    </Grid>
                    
                    <Grid item xs={6} >
                        <ViewTypesProviders />
                    </Grid>

                    <Grid item xs={6} >
                        <ViewTypeClients />
                    </Grid>

                    <Grid item xs={6} >
                        <ViewRawMaterialPerType dateInit={dayjs(dateInit).format("YYYY-MM-DD HH:mm:ss[TZ]")} dateEnd={dayjs(dateEnd).format("YYYY-MM-DD HH:mm:ss[TZ]")} />
                    </Grid>

                    <Grid item xs={6} sm={12} md={12}>
                        <ViewUserClassificationSoldOrNotSold dateInit={dayjs(dateInit).format("YYYY-MM-DD HH:mm:ss[TZ]")} dateEnd={dayjs(dateEnd).format("YYYY-MM-DD HH:mm:ss[TZ]")} />
                    </Grid>

                </Grid>

            </Box>
        ) :
            <Typography>No tiene permisos</Typography>
    )
}

const GET_STATE_EMPLOYES = gql`
query GetStateEmployed($idCompany: String){
  state: getStateEmployed(idCompany: $idCompany){
    name
    value
  }
}

`

const ViewEmployes = () => {
    const dataUser = useContextUserAuth((state) => state.data)
    const data = useQuery(GET_STATE_EMPLOYES, {
        variables: {
            idCompany: `${dataUser.idCompany.id}`
        }
    })
    return (
        data.loading ? "Cargando.." : <PieGraphics data={data.data.state} title="ESTADO DE LOS EMPLEDOS"/>

    )
}

type ViewsType = {
    dateInit: string
    dateEnd: string
}

const GET_SPEND_OR_SELL = gql`
    query getSpendOrsell($idCompany: String, $dateInit: String, $dateEnd: String){
        getSpendOrSell(dateInit: $dateInit , dateEnd: $dateEnd, idCompany: $idCompany){
            name
            compra
            venta
    }
    }

`

const ViewSpendOrSell = ({dateInit, dateEnd}: ViewsType) => {

    const dataUser = useContextUserAuth((state) => state.data)
    const {data, loading} = useQuery(GET_SPEND_OR_SELL, {
        variables: {
            idCompany: `${dataUser.idCompany.id}`,
            dateInit,
            dateEnd
        }
    })


    return (
        loading ? (
            "Cargando.."
        ) : (
        <BarGraphics data={data.getSpendOrSell} title={"CANTIDAD POR TIPO DE PAGO DE COMPRA VS VENTA"}>
            <Bar dataKey="compra" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            <Bar dataKey="venta" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarGraphics>
        )
    )
}

const GET_MATERIAL_TYPE_SOLD = gql`
    query getMaterialTypeSold($idCompany: String, $dateInit: String, $dateEnd: String){
        getMaterialTypeSold(idCompany: $idCompany, dateInit: $dateInit, dateEnd: $dateEnd){
            name
            vendidos
            sinVender
        }
}   
`

const ViewMaterialTypeSold = ({dateInit, dateEnd}: ViewsType) => {
    const dataUser = useContextUserAuth((state) => state.data)
    const {data, loading} = useQuery(GET_MATERIAL_TYPE_SOLD, {
        variables: {
            idCompany: `${dataUser.idCompany.id}`,
            dateInit,
            dateEnd
        }
    })
    return (
        loading ? (
            "Cargando.."
        ) : (
            <BarGraphics data={data.getMaterialTypeSold} title={"CANTIDAD DE LOTES VENDIDOS VS SIN VENDER"}>
                <Bar dataKey="vendidos" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="sinVender" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarGraphics>
        )
    )
}

const GET_CLASSIFICATION_PROCEDURE_TYPE = gql`
query getClassificationProcedureType($idCompany: String, $dateInit: String, $dateEnd: String){
  count: getClassificationProcedureType(idCompany: $idCompany, dateInit: $dateInit, dateEnd: $dateEnd){
    name
    cantidad
  }
}

`

const ViewClassificationProcedureType = ({dateInit, dateEnd}: ViewsType) => {
    const dataUser = useContextUserAuth((state) => state.data)
    const {data, loading} = useQuery(GET_CLASSIFICATION_PROCEDURE_TYPE, {
        variables: {
            idCompany: `${dataUser.idCompany.id}`,
            dateInit,
            dateEnd
        }
    })
    return (
        loading ? (
            "Cargando..."
        ) : (
            <BarGraphics data={data.count} title={"CANTIDAD DE PRODUCTOS CLASIFICADOS POR TIPO DE PROCEDIMIENTO"}>
                <Bar dataKey="cantidad" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarGraphics>
        )
    )
}

const GET_TYPE_PROVIDERS =gql`
query getTypeProviders($idCompany: String){
  getTypeProviders(idCompany: $idCompany){
    name
    value
  }
}

`

const ViewTypesProviders = () => {
    const dataUser = useContextUserAuth((state) => state.data)
    const {data, loading} = useQuery(GET_TYPE_PROVIDERS, {
        variables: {
            idCompany: `${dataUser.idCompany.id}`,
        }
    })
    return (
        loading ? (
            "Cargando.."
        ) : (
            <PieGraphics data={data.getTypeProviders} title="CANTIDAD POR TIPO DE PROVEEDOR" />
        )
    )
}

const GET_TYPE_CLIENTS = gql`
query getTypeClients($idCompany: String){
  getTypeClients(idCompany: $idCompany){
    name
    value
  }
}

`

const ViewTypeClients = () => {
    const dataUser = useContextUserAuth((state) => state.data)
    const {data, loading} = useQuery(GET_TYPE_CLIENTS, {
        variables: {
            idCompany: `${dataUser.idCompany.id}`,
        }
    })
    return (
        loading ? (
            "Cargando.."
        ) : (
            <PieGraphics data={data.getTypeClients} title="CANTIDAD POR TIPO DE CLIENTE" />
        )
    )
}


const GET_CLASSIFICATION_MATERIAL_TYPE = gql`
query getClassificationMaterialType($idCompany: String, $dateInit: String, $dateEnd: String){
  count: getClassificationMaterialType(idCompany: $idCompany, dateInit: $dateInit, dateEnd: $dateEnd){
    name
    cantidad
  }
}
`

const ViewClassificationMaterialType = ({dateInit, dateEnd}: ViewsType) => {

    const dataUser = useContextUserAuth((state) => state.data)
    const {data, loading} = useQuery(GET_CLASSIFICATION_MATERIAL_TYPE, {
        variables: {
            idCompany: `${dataUser.idCompany.id}`,
            dateInit,
            dateEnd
        }
    })
    return (
        loading ? (
            "Cargando..."
        ) : (
            <BarGraphics data={data.count} title={"CANTIDAD DE PRODUCTOS CLASIFICADOS POR TIPO DE MATERIAL"}>
                <Bar dataKey="cantidad" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarGraphics>
        )
    )
}

const GET_RAW_MATERIAL_PER_TYPE = gql`
query getRawMaterialType($idCompany: String, $dateInit: String, $dateEnd: String){
  count: getRawMaterialPerType(idCompany: $idCompany, dateInit: $dateInit, dateEnd: $dateEnd){
    name
    value
  }
}

`

const ViewRawMaterialPerType = ({dateInit, dateEnd}: ViewsType) => {
    const dataUser = useContextUserAuth((state) => state.data)
    const {data, loading} = useQuery(GET_RAW_MATERIAL_PER_TYPE, {
        variables: {
            idCompany: `${dataUser.idCompany.id}`,
            dateInit,
            dateEnd
        }
    })
    return (
        loading ? (
            "Cargando.."
        ) : (
            <PieGraphics data={data.count} title="CANTIDAD DE MATERIA PRIMA POR TIPO DE MATERIAL" />
        )
    )
}

const GET_USER_CLASSIFICATION_SOLD = gql`
query getClassificationUser($idCompany: String, $dateInit: String, $dateEnd: String){
  count: getClassificationUser(idCompany: $idCompany, dateInit: $dateInit, dateEnd: $dateEnd){
    name
    vendidos
    sinVender
  }
}
`

const ViewUserClassificationSoldOrNotSold = ({dateInit, dateEnd}: ViewsType) => {

    const dataUser = useContextUserAuth((state) => state.data)
    const {data, loading} = useQuery(GET_USER_CLASSIFICATION_SOLD, {
        variables: {
            idCompany: `${dataUser.idCompany.id}`,
            dateInit,
            dateEnd
        }
    })
    return (
        loading ? (
            "Cargando.."
        ) : (
            <BarGraphics data={data.count} title={"CANTIDAD DE CLASIFICACIONES POR EMPLEADO VENDIDOS VS SIN VENDER"}>
                <Bar dataKey="vendidos" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="sinVender" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarGraphics>
        )
    )
}

export default Reports