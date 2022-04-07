import styles from './light.module.css'
import Switch from 'react-switch'

function LightConTrol({incubatorInfo, handleLightState, handleAutomation}) {
    if (incubatorInfo) {
        return (
            <div className={styles.lightControl}>
                <h3 className={styles.title}>Điều khiển đèn</h3>
                <div>
                    <div>Tình trạng đèn {incubatorInfo.lightState ? "BẬT" : "TẮT"} </div>
                    <div>
                        <div>Điều khiển đèn tự động</div>
                        <Switch onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={50}
                            onChange={handleAutomation}
                            checked={incubatorInfo.enableAutomation}
                        />
                    </div>
                    <div>
                        <div>Điều khiển đèn thủ công</div>
                        <Switch onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={50}
                            onChange={handleLightState}
                            checked={incubatorInfo.lightState}
                            disabled={incubatorInfo.enableAutomation}
                        />
                    </div>

                </div>
            </div>
        )
    }
    else return null
}
export default LightConTrol