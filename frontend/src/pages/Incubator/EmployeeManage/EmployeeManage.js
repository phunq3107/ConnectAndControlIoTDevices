import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../AuthContext"
import AdminNavbar from "../../../components/Navbar/AdminNavbar"
import AdminSidebar from "../../../components/Sidebar/AdminSidebar"
import styles from './EmployeeManage.module.css'

export default function EmployeeManage() {
    const auth = useContext(AuthContext)
    const [employees,setEmployees] = useState([])
    const [filteredEms, setFilteredEms] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user && user.access_token && user.role == 'ADMIN') {
            
            var myHeaders = new Headers()
            myHeaders.append("Authorization", `Bearer ${user.access_token}`)
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            }

            return fetch("http://localhost:8080/api/v1/accounts", requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        return response.json()
                    }
                    throw new Error(response.status)
                })
                .then(result => {
                    setEmployees(result)
                })
                .catch(error => console.log('error', error))
        } else {
            auth.logout()
        }
    }, [])

    useEffect(() => {
            if (searchInput) {
                const filteredData = employees.filter((item) => {
                    return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
                })
                setFilteredEms(filteredData)
            } else {
                setFilteredEms(employees)
            }
    }, [searchInput, filteredEms])


    return (
        <>
        <AdminNavbar/>
        <div className={styles.container}>
            <AdminSidebar></AdminSidebar>
            <div className={styles.emtable}>
                <div className={styles.searchbar}>
                    <input type='text' placeholder="Search..." onChange={(e) => setSearchInput(e.target.value)}></input>
                    <span className={styles.button}>
                        <Link to='/admin/create-form'>Create User</Link>
                    </span>
                </div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Group</th>
                    </tr>
                    {   
                        searchInput ? (
                            filteredEms.map(filteredEm => <tr>
                            <td>{filteredEm.username}</td>
                            <td>{filteredEm.fullname}</td>
                            <td>{filteredEm.groups}</td>
                        </tr>)
                        ) : (
                        employees.map(employee => <tr>
                            <td>{employee.username}</td>
                            <td>{employee.fullname}</td>
                            <td>{employee.groups}</td>
                        </tr>)
                        )
                    }
                </table>
            </div>
        </div>
        </>
    )
}