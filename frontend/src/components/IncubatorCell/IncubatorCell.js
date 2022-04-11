import styles from './incubatorCell.module.css'
import { Link } from 'react-router-dom'
import { IoIosEgg, IoIosSunny } from 'react-icons/io'
import { FaLightbulb, FaRegCalendarAlt, FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { MdOutlineAutofpsSelect, MdOutlineSensors } from 'react-icons/md'
import { getCurrentDay, getCurrentStage } from '../../services/datahandler'
function IncubatorCell({ incubator }) {
    console.log(incubator)
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>
                {incubator.name}
                {incubator.threshold ? " - " + incubator.threshold.name : null}
            </h3>
            <div className={styles.content}>
                <div>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>
                            Số trứng
                        </span>
                    </div>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>
                            Số ngày hoạt động
                        </span>
                    </div>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>
                            Nhiệt độ hiện tại
                        </span>
                    </div>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>
                            Tình trạng đèn
                        </span>
                    </div>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>
                            Chế độ tự động
                        </span>
                    </div>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>
                            Số thiết bị
                        </span>
                    </div>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>
                            Ngưỡng nhiệt độ
                        </span>
                    </div>
                </div>
                <div>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>
                            <IoIosEgg style={{ color: "#ffd79a" }} />{'\u00A0\u00A0'}
                            {incubator.noEggs ? incubator.noEggs + " trứng" : "Không xác định"}
                        </span>
                    </div>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>
                            <FaRegCalendarAlt />{'\u00A0\u00A0'}
                            {getCurrentDay(incubator.startTime)}
                        </span>
                    </div>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>
                            <IoIosSunny style={{ color: "orange", fontSize: "20px" }} />{'\u00A0\u00A0'}
                            {incubator.currentTemperature}<sup>o</sup>C
                        </span>
                    </div>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>
                            <FaLightbulb style={{ color: "#ffd633" }} />{'\u00A0\u00A0'}
                            {incubator.lightState === true ? "BẬT" : "TẮT"}
                        </span>
                    </div>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>
                            <MdOutlineAutofpsSelect style={{ color: "#2693e6" }} />{'\u00A0\u00A0'}
                            {incubator.enableAutomation === true ? "BẬT" : "TẮT"}
                        </span>
                    </div>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>
                            <MdOutlineSensors />{'\u00A0\u00A0'}
                            {incubator.noFeeds}
                        </span>
                    </div>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>
                            <FaArrowUp style={{ color: "#ef3038" }} />{'\u00A0\u00A0'}{incubator.upperThreshold}<sup>o</sup>C{'\u00A0\u00A0'}
                            <FaArrowDown style={{ color: "#4169e1" }} />{'\u00A0\u00A0'} {incubator.lowerThreshold}<sup>o</sup>C
                        </span>
                    </div>
                </div>
                <div>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>
                            <span className={styles.subTitle}>{incubator.hatchedEgg ? " Có trứng nở" : "Chưa có trứng nở"}</span>
                        </span>
                    </div>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>
                            <span className={styles.subTitle}>{getCurrentStage(incubator.startTime, incubator.threshold)}</span>
                        </span>
                    </div>
                </div>
            </div>
            <Link
                key={incubator.key}
                to="/incubator"
                state={{ incubatorKey: incubator.key }}
            >
                <button className={styles.viewButton}>Xem chi tiết</button>
            </Link>
        </div>
    )
}
export default IncubatorCell