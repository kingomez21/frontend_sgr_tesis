import { Backdrop, CircularProgress, Typography } from "@mui/material"

type props = {
    open: boolean
}

const Progress = ({open}: props) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress />
            <Typography>
                Validando informacion...
            </Typography>

        </Backdrop>
    )
}

export default Progress