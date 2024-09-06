import { Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import useRegisterContext from "./context/useRegisterContext"
import { useState } from "react"
import { gql, useQuery } from "@apollo/client"

const GET_MATERIAL_TYPE = gql`
query getAllMaterialType {
    getAllMaterialType {
      id
      name
    }
  }`


const FormRawMaterialStepper = () => {
    const { dataRegisterRawMaterial, setRegisterRawMaterial } = useRegisterContext()
    const [formData, setFormData] = useState({
        rawMaterialGathering: '1',
        materialType: '1',
        kgQuantity: '',
        pricePerKg: ''
    })

    const data = useQuery(GET_MATERIAL_TYPE)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setRegisterRawMaterial(formData)
        console.log(dataRegisterRawMaterial)
    };
    

    return (
        <Box>
            <br />
            <Typography marginLeft={4}>FORMULARIO DE CREACIÓN DE MATERIA PRIMA</Typography>
            <br />

            <Box marginLeft={4} marginRight={4}>
                <form>
                    <Stack direction="row" spacing={2}>
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione el tipo de material</InputLabel>
                            <Select
                                label="Seleccione el tipo de material"
                                name="materialType"
                                onChange={handleChange}
                                value={formData.materialType}
                            >
                                {data.loading ? <MenuItem disabled> Cargando.. </MenuItem> : (
                                data?.data.getAllMaterialType?.map((v) => (
                                    <MenuItem
                                        key={v.id}
                                        value={v.id}
                                    >
                                        {v.name}
                                    </MenuItem>
                                ))
                            )}
                            </Select>
                        </FormControl>
                    </Stack>

                    <br />
                    <br />

                    <Stack direction="row" spacing={2}>
                        <TextField
                            placeholder="Ingrese la cantidad de kilogramos del material"
                            type="text"
                            label="Kilogramos del material"
                            name="materialQuantity"
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            placeholder="Ingrese el precio por Kg del material"
                            type="text"
                            label="Precio por Kg"
                            name="pricePerKg"
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

export default FormRawMaterialStepper