import styles from './chart.module.css'
import { LineChart, ResponsiveContainer, Tooltip, XAxis, Line, CartesianGrid, YAxis, ReferenceLine } from 'recharts'
function Chart({ title, data, XdataKey, YdataKey, grid, Ydomain, threshold }) {
    console.log(threshold)
    return (
        <div className={styles.chartContainer}>
            <h3 className={styles.title}>{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis
                        dataKey={XdataKey}
                        stroke="#5550bd"
                        tickFormatter={value => value ? value.substring(11) : 0}
                        ticks={data.length > 0 ? [data[0].createdAt, data[data.length-1].createdAt] : null}
                    />
                    <YAxis
                        dataKey={YdataKey}
                        stroke="#5550bd" 
                        domain={Ydomain? Ydomain : [0,'auto']}
                        />
                    { threshold && <ReferenceLine y={threshold.upper} stroke="red"/>}
                    { threshold && <ReferenceLine y={threshold.lower} stroke="green"/>}
                    <Line
                        type="monotone"
                        dataKey={YdataKey}
                        stroke="#5550bd" />
                    <Tooltip />
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                </LineChart>
            </ResponsiveContainer>
        </div >
    )
}
export default Chart