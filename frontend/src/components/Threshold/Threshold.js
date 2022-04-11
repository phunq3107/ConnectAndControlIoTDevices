import styles from './threshold.module.css'
import { useState } from 'react'
function Threshold({ thresholds, createNewSession }) {
    const [selectedThreshold, setSelectedThreshold] = useState(thresholds[0])
    const [numEggs, setNumEggs] = useState('')
    const handleChangeSelection = (e) => {
        setSelectedThreshold(thresholds.find(threshold => threshold.name === e.target.value))
    }
    const renderTableHeader = (headers) => {
        return (
            <tr>
                {
                    headers.map((header, index) => {
                        return <th key={index}>{header}</th>
                    })
                }
            </tr>
        )

    }
    const renderTableData = (data) => {
        return data.map((datum, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{datum.days}</td>
                    <td>{datum.upper}<sup>o</sup>C</td>
                    <td>{datum.lower}<sup>o</sup>C</td>
                </tr>
            )
        })
    }
    const handleNewSession = (e,sessionId, numEggs) => {
        const id = thresholds.find(threshold => threshold.id === sessionId).id
        const noEgg = parseInt(numEggs)
        if (id && parseInt(numEggs) > 0) {
            createNewSession(id, noEgg)
            setNumEggs('')
        }
        else {
            e.preventDefault()
            alert('Số trứng không hợp lệ')
        }
    }
    if (thresholds) {
        const tableData = [
            {
                days: selectedThreshold.numberDayOfStage1,
                upper: selectedThreshold.upperStage1,
                lower: selectedThreshold.lowerStage1
            },
            {
                days: selectedThreshold.numberDayOfStage2,
                upper: selectedThreshold.upperStage2,
                lower: selectedThreshold.lowerStage2
            },
            {
                days: "Đến khi trứng nở",
                upper: selectedThreshold.upperStage3,
                lower: selectedThreshold.lowerStage3
            }
        ]
        return (
            <div className={styles.container}>
                <h2 className={styles.title}>Thiết lập chu kì ấp trứng mới</h2>
                <form>
                    <div className={styles.content}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="numEggs">Số trứng</label>
                            <input required type="number" id="numEggs" value={numEggs} onChange={(e) => { setNumEggs(e.target.value) }} />
                        </div>
                        <div className={styles.selector}>
                            <label htmlFor="threshold">Loại trứng</label>
                            <div className={styles.selectBox}>
                                <select id="threshold" onChange={handleChangeSelection} value={selectedThreshold.name}>
                                    {
                                        thresholds.map((threshold) =>
                                            <option
                                                key={threshold.id}
                                                value={threshold.name}
                                            >
                                                {threshold.name}
                                            </option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <table className={styles.stages}>
                        <tbody>
                            {renderTableHeader(['GIAI ĐOẠN', 'SỐ NGÀY', 'NGƯỠNG NHIỆT TRÊN', 'NGƯỠNG NHIỆT DƯỚI'])}
                            {renderTableData(tableData)}
                        </tbody>
                    </table>
                    <div className={styles.buttonContainer}>
                        <button onClick={(e) => handleNewSession(e,selectedThreshold.id, numEggs)}>Xác nhận</button>
                    </div>
                </form>
            </div>
        )
    }
    else return null
}
export default Threshold