import Chart from "./Chart"
import styles from './chart.module.css'
import createCharts from "./CreateCharts"
function Charts({ tempData, soundData, threshold }) {
    if (tempData && soundData) {
        const charts = createCharts(tempData, threshold, soundData)
        return (
            <div className={styles.container}>
                {charts.map(chart =>
                    <Chart
                        key={chart.title}
                        title={chart.title}
                        data={chart.data}
                        Ydomain={chart.domain}
                        XdataKey={chart.XdataKey}
                        YdataKey={chart.YdataKey}
                        threshold={chart.threshold ? chart.threshold : null}
                        ticks = {chart.ticks}
                    />
                )}
            </div>
        )
    }
    else return null
}
export default Charts