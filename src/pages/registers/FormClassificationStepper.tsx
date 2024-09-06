import { Box, FormControl, InputLabel, Select, Stack, TextField, Typography } from "@mui/material"
import useRegisterContext from "./context/useRegisterContext"
import { useState } from "react"

const FormClassificationStepper = () => {

    const { dataRegisterClassification, setRegisterClassification } = useRegisterContext()
    const [formData, setFormData] = useState({
        rawMaterialType: '1',
        userInfo: '1',
        procedureType: '1',
        totalWeight: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setRegisterClassification(formData)
        console.log(dataRegisterClassification)
    };

    return (
        <Box>
            <br />
            <Typography marginLeft={4}>FORMULARIO DE CREACIÓN DE CLASIFICACIÓN</Typography>
            <br />
            <Box marginLeft={4} marginRight={4}>
                <form>
                    <Stack direction="row" spacing={2}>
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione la información del usuario</InputLabel>
                            <Select
                            label="Seleccione la información del usuario"
                            name="userInfo"
                            onChange={handleChange}
                            value={formData.userInfo}
                            >
                                
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
                            name="procedureType"
                            onChange={handleChange}
                            value={formData.procedureType}
                            >
                            </Select>
                        </FormControl>
                        <TextField
                            placeholder="Ingrese el peso total del material"
                            type="number"
                            label="Peso total de la materia prima"
                            name="totalWeight"
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </Stack>
                    <br />
                </form>
            </Box>
        </Box>
    )
}

export default FormClassificationStepper