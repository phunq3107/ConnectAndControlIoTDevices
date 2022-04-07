import styles from "./measuredInfo.module.css"
function MeasuredInfo({incubatorInfo}) {
    if (incubatorInfo)
        return (
            <div className={styles.container}>
                <div className={styles.measuredItem}>
                    <span className={styles.title}>Nhiệt độ hiện tại</span>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>{incubatorInfo.currentTemperature}<sup>o</sup>C</span>
                    </div>
                    <span className={styles.subTitle}>Upper {incubatorInfo.upperThreshold}<sup>o</sup>C - Lower {incubatorInfo.lowerThreshold}<sup>o</sup>C</span>
                </div>
                <div className={styles.measuredItem}>
                    <span className={styles.title}>Số trứng</span>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>20 trứng</span>
                    </div>
                    <span className={styles.subTitle}>{incubatorInfo.hatchedEgg ? "Có trứng nở" : "Chưa có trứng nở"}</span>
                </div>
                <div className={styles.measuredItem}>
                    <span className={styles.title}>Số ngày hoạt động</span>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>10 ngày</span>
                    </div>
                    <span className={styles.subTitle}></span>
                </div>
            </div>
        )
    else return null
}
export default MeasuredInfo