import { Backdrop, CircularProgress, Typography } from "@mui/material"

type props = {
    open: boolean
    message?: string
}

const Progress = ({open, message}: props) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress />
            <Typography>
                {message ? message : "Validando informacion...."}
            </Typography>

        </Backdrop>
    )
}

export default Progress