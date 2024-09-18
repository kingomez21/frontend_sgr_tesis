import { Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import useRegisterContext from "../context/useRegisterContext"

const FormClassificationStepper = () => {

    const { dataRegisterClassification, setRegisterClassification, dataUsers, dataProcedureType } = useRegisterContext()
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
                            <InputLabel>Seleccione el empleado encargado de la clasificacion</InputLabel>
                            <Select
                                label="Seleccione el empleado encargado de la clasificacion"
                                name="userInfo"
                                onChange={handleChange}
                                value={formData.userInfo}
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
                                name="procedureType"
                                onChange={handleChange}
                                value={formData.procedureType}
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