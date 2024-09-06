import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom"
//import { useState } from "react";
//import { useContextUserAuth } from "../../store";
//import { gql, useMutation } from "@apollo/client";
//import Message from "../../components/Message";

const FormRoute = () => {

    const navigate = useNavigate()
    //const data = useContextUserAuth((state) => state.data)
    //const [createClient,] = useMutation(CREATE_CLIENT)

    /*const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const submit = () => {
        handleOpen()
        const dataForm: inputClient = {
            idTypeClient: `${typeClient}`,
            idCompany: data.idCompany ? data.idCompany.id : "1",
            fullName,
            nit,
            address,
            place,
            cellphone,
            email
           
        }
        //console.log(dataForm)
        createClient({
            variables: {
                input: dataForm
            }
        })
        .then( (data) => {
            setMsg(data.data.createClient.message)
            setTimeout( () => handleClose(), 6000)
        } )
        .catch( () => {
            setStatusErr(true)
            setMsg("Ocurrio un error inesperado")
            setTimeout( () => handleClose(), 6000)
        } )
        
    } */

    return (
        <Dialog open fullScreen>
            {/*<Message band={open} message={msg} status={statusErr ? false : true} /> */}
            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography>CREACIÓN DE REGISTRO</Typography>
                </Stack>
                <Typography marginLeft={4}>FORMULARIO DE CREACIÓN DE RUTA</Typography>
            </DialogTitle>
            <DialogContent>
                <br />
                <Box marginLeft={4} marginRight={4}>

                    <Stack direction="row" spacing={2}>
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione la cita de la ruta</InputLabel>
                            <Select   
                            >
                            </Select>
                        </FormControl>
                    </Stack>

                    <br />
                    <br />

                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Ingrese el punto de partida de la ruta"
                            type="text"
                            label="Lugar de inicio"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            placeholder="Ingrese el destino de la ruta"
                            type="text"
                            label="Lugar de destino"
                            variant="outlined"
                            fullWidth
                        />
                    </Stack>
                    <br />
                    <br />
                    <Stack justifyContent="space-between" direction="row">
                        <Button fullWidth size="medium" variant="contained" >
                            <Typography>GUARDAR RUTA</Typography>
                        </Button>
                    </Stack>
                </Box>

            </DialogContent>
        </Dialog>
    )
}

export default FormRoute