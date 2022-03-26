import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthContext";

export default function UserInfo(props) {
    const auth = useContext(AuthContext)
    const [employee, setEmployee] = useState('')
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
            return fetch(`http://localhost:8080/api/v1/accounts/${props.username}`, requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        return response.json()
                    }
                    throw new Error(response.status)
                })
                .then(result => {
                    setEmployee(result)
                })
                .catch(error => console.log('error', error))
        } else {
            auth.logout()
        }
    }, [])
}