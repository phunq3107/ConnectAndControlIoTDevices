import styles from "./measuredInfo.module.css"
import { getCurrentDay, getCurrentStage } from "../../services/datahandler"
import { BsFillSunFill } from "react-icons/bs"
import { FaEgg, FaRegCalendarAlt } from "react-icons/fa"
function MeasuredInfo({ incubatorInfo }) {
    if (incubatorInfo)
        return (
            <div className={styles.container}>
                <div className={styles.measuredItem}>
                    <span className={styles.title}>Nhiệt độ hiện tại</span>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>{incubatorInfo.currentTemperature}<sup>o</sup>C</span>
                        <BsFillSunFill className={styles.sunIcon} />
                    </div>
                    <span className={styles.subTitle}>Upper {incubatorInfo.upperThreshold}<sup>o</sup>C - Lower {incubatorInfo.lowerThreshold}<sup>o</sup>C</span>
                </div>
                <div className={styles.measuredItem}>
                    <span className={styles.title}>Số trứng</span>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>{incubatorInfo.noEggs ? incubatorInfo.noEggs + " trứng" : "Không xác định"}</span>
                        <FaEgg className={styles.eggIcon} />
                    </div>
                    <span className={styles.subTitle}>{incubatorInfo.hatchedEgg ? "Có trứng nở" : "Chưa có trứng nở"}</span>
                </div>
                <div className={styles.measuredItem}>
                    <span className={styles.title}>Số ngày hoạt động</span>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>
                            {
                                incubatorInfo.startTime ?
                                    getCurrentDay(incubatorInfo.startTime) :
                                    "Không xác định"
                            }
                            <FaRegCalendarAlt className={styles.calendarIcon} />
                        </span>
                    </div>
                    <span className={styles.subTitle}>
                        {
                            incubatorInfo.startTime ?
                                getCurrentStage(incubatorInfo.startTime, incubatorInfo.threshold) + " - " + incubatorInfo.threshold.name :
                                null
                        }
                    </span>
                </div>
            </div>
        )
    else return null
}
export default MeasuredInfo