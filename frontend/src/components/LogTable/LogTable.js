import { handleActionData, handleDescription, formatTimeData } from '../../services/datahandler'
import styles from './logTable.module.css'
function LogTable({ headers, data }) {

    return (
        <table className={styles.logTable}>
            <tbody>
                <tr>
                    {
                        headers.map((header, index) => {
                            return <th key={index}>{header}</th>
                        })
                    }
                </tr>
                {
                    data.map((datum, index) =>
                        <tr key={index}>
                            <td>{datum.id}</td>
                            <td>{datum.username}</td>
                            <td>{datum.action}</td>
                            <td>{datum.description}</td>
                            <td>{datum.timestamp}</td>
                        </tr>)

                }
            </tbody>
        </table>
    )
}
export default LogTable