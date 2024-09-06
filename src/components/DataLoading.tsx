import { CircularProgress, Stack } from "@mui/material"

const DataLoading = () => {
    return (
        <Stack direction="row" justifyContent="center" alignContent="center" alignItems="center">
            <CircularProgress size={40} />
        </Stack>
    )
}

export default DataLoading