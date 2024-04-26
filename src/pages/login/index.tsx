import { Box, Stack} from "@mui/material"
import FormLogin from './FormLogin'

const Login = () => {
    return (
        <>
            <Stack 
                direction="row"  
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    height={600}
                    width={400}
                    alignItems="center"
                    //gap={8}
                    marginTop={12}
                    p={2}
                    //sx={{ border: '2px solid grey' }}
                >
                    <FormLogin />
                </Box>
            </Stack>
        </>
    )
}

export default Login