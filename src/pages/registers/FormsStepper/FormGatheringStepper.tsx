import { Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import useRegisterContext from "../context/useRegisterContext"
import { useState } from "react"
import { gql, useQuery } from "@apollo/client"

const GET_PAY_TYPE = gql`
query getAllPayType{
  getAllPayType {
    id
    platformName
  }
}`

const FormGatheringStepper = () => {

    const { dataRegisterGathering, setRegisterGathering } = useRegisterContext()
    const [formData, setFormData] = useState({
        gatheringRoute: '1',
        payMethod: '1',
        materialQuantity: '',
        moneySpent: ''
    })

    const data = useQuery(GET_PAY_TYPE)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setRegisterGathering(formData)
        console.log(dataRegisterGathering)
    };

    return (
        <Box>
            <br />
            <Typography marginLeft={4}>FORMULARIO DE CREACIÓN DE RECOLECCIÓN</Typography>
            <br />
            <Box marginLeft={4} marginRight={4}>
                <form>
                    <Stack direction="row" spacing={2}>
                        <FormControl
                            required
                            fullWidth
                        >
                            <InputLabel>Seleccione el tipo de pago</InputLabel>
                            <Select
                                label="Seleccione el tipo de pago"
                                name="payMethod"
                                onChange={handleChange}
                                value={formData.payMethod}
                            >
                                {data.loading ? <MenuItem disabled> Cargando.. </MenuItem> : (
                                    data?.data.getAllPayType?.map((v) => (
                                        <MenuItem
                                            key={v.id}
                                            value={v.id}
                                        >
                                            {v.platformName}
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
                            placeholder="Ingrese la cantidad de material"
                            type="number"
                            label="Cantidad de material"
                            name="materialQuantity"
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            placeholder="Ingrese el dinero gastado"
                            type="number"
                            label="Dinero gastado"
                            name="moneySpent"
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

export default FormGatheringStepper