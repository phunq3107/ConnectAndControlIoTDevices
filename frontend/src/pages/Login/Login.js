import { LoginForm } from '../../components'
import { useEffect, useContext } from 'react'
import { AuthContext } from '../../services/authorization/AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogin = async (username, password) => {
        const user = await auth.login(username, password)
        navigate(`/${user.role.toLowerCase()}`)
    }

    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user) {
            navigate(`${user.role.toLowerCase()}`)
        }
    }, [])
    return (
        <>
            <LoginForm handleLogin={handleLogin} />
        </>
    )
}
export default Login