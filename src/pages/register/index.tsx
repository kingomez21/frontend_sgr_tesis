import { Box, Stack } from "@mui/material"
import RegisterForm  from "./FormRegister"
import {useQuery, gql} from '@apollo/client'

const TEST_USER = gql`
    query Get_Persons{
        getPerson{
            id
            identityNumber
            firstName
            lastName
            gender
            birthday
            documentType
            createdAt
            updatedAt
        }
    }

`

const Register = () => {

    const {data, loading, error} = useQuery(TEST_USER)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    console.log(data)
    return (
        <Stack direction="row" justifyContent="center" alignItems="center">
            <Box 
                 height="auto"
                 width={800}
                 alignItems="center"
                 marginTop="2%"
                 p={2}
            >
                <RegisterForm />
            </Box>
        </Stack>
    )
}

export default Register