import styles from './light.module.css'
import LightChart from './LightChart'
import LightConTrol from './LightControl'
function LightInfo({ light, incubatorKey }) {
    if (light)
        return (
            <div className={styles.container}>
                <LightConTrol light={light} incubatorKey={incubatorKey} />
                <LightChart light={light}/>
            </div>
        )
    else return null
}
export default LightInfo