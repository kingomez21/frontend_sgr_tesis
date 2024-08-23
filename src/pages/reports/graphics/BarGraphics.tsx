import { Paper, Stack, Typography } from "@mui/material"
import { BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

type barProps = {
    data?
    title?
    children
}

const BarGraphics = ({data, title, children}: barProps) => {
    return (
        <Paper sx={{pb: 3}}>
            <br />
            <Stack direction="row" justifyContent="center">
                <Typography>{title}</Typography>
            </Stack>
            <ResponsiveContainer height={300}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {children}  
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    )
}

export default BarGraphics