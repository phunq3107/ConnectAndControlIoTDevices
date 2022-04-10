import styles from './light.module.css'
import { ResponsiveContainer, ScatterChart, XAxis, YAxis, Tooltip, Scatter } from 'recharts'

function LightChart({ lightData }) {
    if (lightData) {
        return (
            <div className={styles.content}>
                <h3 className={styles.title}>Biểu đồ đèn</h3>
                <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <ScatterChart>
                        <XAxis
                            dataKey="createdAt"
                            interval={0}
                            stroke="#2693e6"
                            allowDataOverflow={false}
                            allowDuplicatedCategory={false}
                            tickFormatter={value => value ? value.substring(11) : 0}
                            ticks={lightData.length > 0 ? [lightData[0].createdAt, lightData[lightData.length - 1].createdAt] : null}
                        />
                        <YAxis
                            dataKey="value"
                            ticks={[0, 1]}
                            stroke="#2693e6"
                            tickFormatter={(value) => value === 1 ? 'ON' : 'OFF'}
                        />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter data={lightData} fill="#2693e6" line shape={false} />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        )
    }
    else return null
}
export default LightChart