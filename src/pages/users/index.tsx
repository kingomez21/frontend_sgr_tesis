import { Box, Button, Paper, Stack, Typography } from "@mui/material"
import RefreshIcon from '@mui/icons-material/Refresh';
import ListProviderClient from "./ListProviderClient"
import ListUsers from "./ListUsers"
import { useContextUserAuth } from "../../store"
import { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import FormClient from "./FormClient"
import FormProvider from "./FormProvider"
import VerClientProvider from "./VerClientProvider"
import VerUsers from "./VerUsers"
import AsignPermission from "./AsignPermission"
import { gql, useQuery } from "@apollo/client"

const GET_COUNTS_CLIENTS_PROVIDERS = gql`
query getCounts{
    getCounts: getCountClient{
      totalCount
      countOne: countProvider
      countTwo: countClient
    }
  }

`

const GET_COUNTS_USERS = gql`
query getCountUsers($company: String){
    getCounts: getCountUsers(company: $company){
      totalCount
      countOne: isActive
      countTwo: isNotActive
    }
  }
`


const Users = () => {

    //const [getAllDataClientProvider,] = useLazyQuery(GET_DATA_CLIENTS_PROVIDER)
    //const [dataClientProvider, setDataClientProvider] = useState([])

    const navigate = useNavigate()
    const setTitle = useContextUserAuth((state) => state.setTitle)
    const data = useContextUserAuth((state) => state.data)

    useEffect(() => {
        setTitle("GESTION DE USUARIOS")
        /*getAllDataClientProvider()
        .then((data) => {
            setDataClientProvider(data.data.getAllDataClientProvider)
        })
        .catch((err) => console.log(err))
        .finally()*/
    }, [])

    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                marginTop={5}
            >
                <Button onClick={() => navigate('crear-cliente')} variant="contained" >
                    <Typography> CREAR CLIENTES </Typography>
                </Button>
                <Button onClick={() => navigate('crear-proveedor')} variant="contained" >
                    <Typography> CREAR PROVEEDOR </Typography>
                </Button>
            </Stack>
            <ListCounts title="LISTADO DE CLIENTES Y PROVEEDORES" counts={{
                totalCount: "CANTIDAD", 
                typeOne: "PROVEEDORES", 
                typeTwo: "CLIENTES"
            }} query={GET_COUNTS_CLIENTS_PROVIDERS} />
            <Stack marginLeft={5} marginRight={5}>
                <Paper sx={{ marginTop: 2 }}>
                    <DataLisClientProvider />
                </Paper>
            </Stack>
            <ListCounts title="LISTADO DE USUARIOS" counts={{
                totalCount: "CANTIDAD",
                typeOne: "ACTIVOS",
                typeTwo: "DESPEDIDOS"
            }} query={GET_COUNTS_USERS} variables={{variables: {company: data.idCompany ? data.idCompany.id : "1"}}}/>
            <Stack marginLeft={5} marginRight={5}>
                <Paper sx={{ marginTop: 2 }}>
                    <DataListUsers idCompany={data.idCompany ? data.idCompany.id : "1"} />
                </Paper>
            </Stack>
            <br />
            <br />
            <Routes>
                <Route path="/crear-cliente" element={<FormClient />} />
                <Route path="/crear-proveedor" element={<FormProvider />} />
                <Route path="/:type/:id" element={<VerClientProvider />} />
                <Route path="/empleado/:id/:company" element={<VerUsers />} />
                <Route path="/permisos/:namePerson/:id/*" element={<AsignPermission />} />
            </Routes>
        </Box>
    )
}

const GET_DATA_CLIENTS_PROVIDER = gql`
query getAllDataClientProvider{
    getAllDataClientProvider{
        id
        identity
        idType
        idCompany
        nit
        description
        fullName
        place
        address
        isActive
    }
  }

`

const DataLisClientProvider = () => {

    const { data, loading, refetch } = useQuery(GET_DATA_CLIENTS_PROVIDER)

    return (
        <>
            <Stack direction="row" justifyContent="end">
                <Button size="large" startIcon={<RefreshIcon />} onClick={() => refetch()} ></Button>
            </Stack>

            {loading ? <Typography>Cargando....</Typography> : <ListProviderClient data={data.getAllDataClientProvider} />}
        </>
    )
}

const GET_ALL_USERS_PER_COMPANY = gql`
query getAllUsers($company: String){
    getAllUsers(company: $company){
      id
      idPerson{
        firstName
        lastName
      }
      isActive
    }
  }

`

type propsListUsers = {
    idCompany: any
} 

const DataListUsers = ({idCompany}: propsListUsers) => {
    
    const {data, loading, refetch} = useQuery(GET_ALL_USERS_PER_COMPANY, {
        variables:{
            company: idCompany
        }
    })

    return (
        <>
            <Stack direction="row" justifyContent="end">
                <Button size="large" startIcon={<RefreshIcon />} onClick={() => refetch()} ></Button>
            </Stack>

            {loading ? <Typography>Cargando...</Typography> : <ListUsers data={data.getAllUsers} idCompany={idCompany}/>}
        </>
    )
}

type counters = {
    totalCount: string
    typeOne: string
    typeTwo: string
}

type propsListCounts = {
    title: string
    counts: counters
    query: any
    variables?: any
}

const ListCounts = ({title, counts, query, variables}: propsListCounts) => {

    const {data, loading, refetch} = useQuery(query, variables)

    useEffect(()=>{
        refetch()
    }, [])

    return (
        <Stack direction="row" justifyContent="space-between" marginLeft={5} marginRight={5} marginTop={5}>
            <Typography>
                {title}
            </Typography>
            <Stack
                direction="row"
                spacing={2}
            >

                <Typography>{counts.totalCount}: {loading ? "Cargando.." : data.getCounts.totalCount} </Typography>
                <Typography>{counts.typeOne}: {loading ? "Cargando.." : data.getCounts.countOne} </Typography>
                <Typography>{counts.typeTwo}: {loading ? "Cargando.." : data.getCounts.countTwo} </Typography>

            </Stack>
        </Stack>
    )
}

export default Users