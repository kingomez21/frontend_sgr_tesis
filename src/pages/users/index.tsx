import { Box, Button, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material"
import RefreshIcon from '@mui/icons-material/Refresh';
import ListProviderClient, { ClientProvider } from "./ListProviderClient"
import ListUsers, { dataUser } from "./ListUsers"
import { useContextUserAuth } from "../../store"
import { useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import FormClient from "./FormClient"
import FormProvider from "./FormProvider"
import VerClientProvider from "./VerClientProvider"
import VerUsers from "./VerUsers"
import AsignPermission from "./AsignPermission"
import { DocumentNode, gql, useQuery } from "@apollo/client"
import SearchIcon from '@mui/icons-material/Search';
import Fuse from "fuse.js";
import GetPermission from "../../hooks/GetPermission";

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

    const navigate = useNavigate()
    const setTitle = useContextUserAuth((state) => state.setTitle)
    const data = useContextUserAuth((state) => state.data)

    const isOk = GetPermission("modulo usuario")

    useEffect(() => {
        setTitle("GESTION DE USUARIOS")
    })

    return (
        isOk ? (
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
                }} query={GET_COUNTS_USERS} variables={{ variables: { company: data !== null ? data.idCompany.id : "1" } }} />
                <Stack marginLeft={5} marginRight={5}>
                    <Paper sx={{ marginTop: 2 }}>
                        <DataListUsers idCompany={data !== null ? data.idCompany.id : "1"} />
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
        ) :

            (<Typography>No tienes permisos</Typography>)

    )
}

const GET_DATA_CLIENTS_PROVIDER = gql`
query getAllDataClientProvider($idCompany: String){
    getAllDataClientProvider(idCompany: $idCompany){
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

const optionsFuse = {
    includeScore: true,
    keys: ['identity', 'fullName', 'description', 'nit']
};

const DataLisClientProvider = () => {

    const token = useContextUserAuth((state) => state.token)
    const dataUser = useContextUserAuth((state) => state.data)
    const { data, loading, refetch } = useQuery(GET_DATA_CLIENTS_PROVIDER, {
        variables: {
            idCompany: `${dataUser.idCompany.id}`
        },
        context: {
            headers: {
                "Authorization": `JWT ${token}` 
            }
        }
    })
    const [search, setSearch] = useState("")

    const fuse = new Fuse(loading ? [] : data.getAllDataClientProvider, optionsFuse)

    /*const dataSearch = useMemo(() => {
        if (loading) return []
        if (search === null || search === "") return data.getAllDataClientProvider
        return fuse.search(search).map((value) => value.item)
    }, [search])*/

    return (
        <>
            <Stack direction="row" justifyContent="space-between">
                <TextField
                    label="Buscador"
                    sx={{ width: "50%", marginLeft: "1%" }}
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar proveedores o clientes"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton ><SearchIcon /></IconButton>
                          </InputAdornment>
                        ),
                      }}
                />
                <Button size="large" startIcon={<RefreshIcon />} onClick={() => refetch()} ></Button>
            </Stack>
            &nbsp;
            {loading ? <Typography>Cargando....</Typography> : <ListProviderClient data={(search === null || search === "") ? loading ? [] : data.getAllDataClientProvider : fuse.search<ClientProvider>(search).map(({item}) => item)} search={search} />}
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
    idCompany: string
}

const optionsFuse2 = {
    includeScore: true,
    keys: ['id', 'idPerson.firstName', 'idPerson.lastName']
}

const DataListUsers = ({ idCompany }: propsListUsers) => {

    const token = useContextUserAuth((state) => state.token)
    const { data, loading, refetch } = useQuery(GET_ALL_USERS_PER_COMPANY, {
        variables: {
            company: idCompany
        },
        context: {
            headers: {
                "Authorization": `JWT ${token}` 
            }
        }
    })
    const [search, setSearch] = useState("")

    const fuse = new Fuse(loading ? [] : data.getAllUsers, optionsFuse2)
    
    /*const dataSearch = useMemo(() => {
        if (loading) return []
        if (search === null || search === "") return data.getAllUsers
        return fuse.search(search).map((value)=> value.item)
    }, [search])*/

    return (
        <>
            <Stack direction="row" justifyContent="space-between">
            <TextField
                    label="Buscador"
                    sx={{ width: "50%", marginLeft: "1%" }}
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar usuario"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton ><SearchIcon /></IconButton>
                          </InputAdornment>
                        ),
                      }}
                />
                <Button size="large" startIcon={<RefreshIcon />} onClick={() => refetch()} ></Button>
            </Stack>
            &nbsp;
            {loading ? <Typography>Cargando...</Typography> : <ListUsers data={(search === null || search === "") ? loading ? [] : data.getAllUsers : fuse.search<dataUser>(search).map(({item})=> item) } idCompany={idCompany} search={search} />}
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
    query: DocumentNode
    variables?
}

const ListCounts = ({ title, counts, query, variables }: propsListCounts) => {

    const { data, loading, refetch } = useQuery(query, variables)

    useEffect(() => {
        refetch()
    },)

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