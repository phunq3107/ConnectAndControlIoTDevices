import { LoginForm } from '../../components'
import { useEffect, useContext } from 'react'
import { AuthContext } from '../../services/authorization/AuthContext'
import { useNavigate } from 'react-router-dom'
import styles from './login.module.css'
function Login() {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogin = async (username, password) => {
        const user = await auth.login(username, password)
        navigate(`/${user.role.toLowerCase()}`)
    }

    useEffect(() => {
        const lastUser = auth.getCurrentUser()
        if (lastUser) {
            auth.checkLoggedin(lastUser).then(user => {
                console.log(user)
                if (user && user.access_token)
                    navigate(`/${user.role.toLowerCase()}`)
            })
        }
        else auth.logout()
    }, [])
    return (
        <div className={styles.container}>
            <LoginForm handleLogin={handleLogin} />
        </div>
    )
}
export default Login