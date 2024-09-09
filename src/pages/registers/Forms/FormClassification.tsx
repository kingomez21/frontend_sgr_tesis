import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom"
import useRegisterContext from "../context/useRegisterContext";

const FormClassification = () => {

    const navigate = useNavigate()
    const {dataUsers, dataProcedureType} = useRegisterContext()

    return (
        <Dialog open fullScreen>
            <DialogTitle>
                <Stack direction="row" spacing={2} padding={2} margin={2}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
                    <Typography>CREACIÓN DE REGISTRO</Typography>
                </Stack>
                <Typography marginLeft={4}>FORMULARIO DE CREACIÓN DE CLASIFICACIÓN</Typography>
            </DialogTitle>
            <DialogContent>
                <br />
                <Box marginLeft={4} marginRight={4}>

                    <Stack direction="row" spacing={2}>
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione la materia prima a clasificar</InputLabel>
                            <Select
                            >
                            </Select>
                        </FormControl>
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione el empleado encargado de la clasificacion</InputLabel>
                            <Select
                                label="Seleccione el empleado encargado de la clasificacion"
                            >

                                {dataUsers?.map((v) => (
                                    <MenuItem
                                        key={v.id}
                                        value={v.id}
                                    >
                                        {v.idPerson.identityNumber} - {v.idPerson.firstName} {v.idPerson.lastName}
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Stack>

                    <br />
                    <br />

                    <Stack direction="row" spacing={2}>
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione el tipo de procedimiento</InputLabel>
                            <Select
                                label="Seleccione el tipo de procedimiento"
                            >
                            {dataProcedureType?.map((v) => (
                                    <MenuItem
                                        key={v.id}
                                        value={v.id}
                                    >
                                        {v.id} - {v.procedureName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            placeholder="Ingrese el peso total del material"
                            type="number"
                            label="Peso total de la materia prima"
                            variant="outlined"
                            fullWidth
                        />
                    </Stack>
                    <br />
                    <br />
                    <Stack justifyContent="center" direction="row">
                        <Button fullWidth size="medium" variant="contained" onClick={() => navigate('crear-ruta')}>
                            <Typography>GUARDAR CLASIFICACIÓN</Typography>
                        </Button>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default FormClassification