import { Alert, Snackbar } from "@mui/material"

type props = {
    band: boolean
    message: string
    status: boolean
}

const Message = ({ band, message, status }: props) => {

    const handleClose = (event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
    }

    return (
        <Snackbar
            open={band}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={status ? "success": "error"}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Message