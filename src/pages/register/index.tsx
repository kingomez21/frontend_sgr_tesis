import { Box, Stack } from "@mui/material"
import RegisterForm  from "./FormRegister"

const Register = () => {

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