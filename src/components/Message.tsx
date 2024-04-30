import { Alert, Snackbar } from "@mui/material"

const Message = (band: boolean) => {
    

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        //setOpen(false);
    }

    return (
        <Snackbar
                open={band}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Informacion Guardada Exitosamente
                </Alert>
        </Snackbar>
    )
}

export default Message