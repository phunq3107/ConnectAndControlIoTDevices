import styles from './light.module.css'
import LightChart from './LightChart'
import LightConTrol from './LightControl'
function LightInfo({lightData, incubatorInfo, handleAutomation, handleLightState }) {
    if (lightData)
        return (
            <div className={styles.container}>
                <LightConTrol
                    incubatorInfo={incubatorInfo}
                    handleLightState={handleLightState}
                    handleAutomation={handleAutomation}
                />
                <LightChart
                    lightData={lightData}
                />
            </div>
        )
    else return null
}
export default LightInfo