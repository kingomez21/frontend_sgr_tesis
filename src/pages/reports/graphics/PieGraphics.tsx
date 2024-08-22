import { Paper, Stack, Typography } from "@mui/material"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector } from "recharts"

type dataType = {
    name: string
    value: number
}

type pieProps = {
    data?: dataType[]
    title?: string
}

const PieGraphics = ({ data, title }: pieProps) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#1a1a92', '#289415'];
    return (
        <Paper sx={{p: 0, m: 0}}>
            <br />
            <Stack direction="row" justifyContent="center">
                <Typography>{title}</Typography>
            </Stack>
            
            <ResponsiveContainer height={300}>
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        label={renderActiveShape}
                        outerRadius={70}
                        dataKey="value"
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={15} />
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    )
}

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name} (${value})`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export default PieGraphics