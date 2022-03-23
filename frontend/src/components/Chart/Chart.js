import styles from './chart.module.css'
import { LineChart, ResponsiveContainer, Tooltip, XAxis, Line, CartesianGrid, YAxis } from 'recharts'
function Chart({ title, data, XdataKey,YdataKey, grid }) {
    return (
        <div className={styles.chartContainer}>
            <h3 className={styles.title}>{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey={XdataKey} stroke="#5550bd" />
                    <YAxis dataKey={YdataKey} stroke="#5550bd"/>
                    {/*Todo: Add two threshhold lines (using <ReferenceLine/>) */}
                    <Line type="monotone" dataKey={YdataKey} stroke="#5550bd" />
                    <Tooltip />
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                </LineChart>
            </ResponsiveContainer>
        </div >
    )
}
export default Chart