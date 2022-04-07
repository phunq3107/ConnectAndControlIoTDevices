import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../services/authorization/AuthContext'
import styles from './employeeHome.module.css'
import { Link } from 'react-router-dom'
function EmployeeHome() {
    const auth = useContext(AuthContext)
    const [incubators, setIncubators] = useState([])
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (!(user && user.access_token)) {
            auth.logout()
        }
        else {
            var myHeaders = new Headers()
            myHeaders.append("Authorization", `Bearer ${user.access_token}`)
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            }

            return fetch("http://localhost:8080/api/v1/groups", requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        return response.json()
                    }
                    throw new Error(response.status)
                })
                .then(result => {
                    setIncubators(result)
                })
                .catch(error => console.log('error', error))
        }
    }, [])
    if (incubators)
        return (
            <div className={styles.container}>
                {incubators.map(incubator => <Link key={incubator.key} to="/incubator" state={{ incubatorKey: incubator.key }}>{incubator.name}</Link>)}
            </div>
        )
    else return null
}
export default EmployeeHome