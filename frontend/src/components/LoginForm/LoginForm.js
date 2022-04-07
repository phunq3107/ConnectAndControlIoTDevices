import { useState, useContext } from 'react'
import styles from './loginForm.module.css'
import logo from './../../assets/logo.png'
import { AuthContext } from '../../services/authorization/AuthContext'
import { useNavigate } from 'react-router-dom'
import LoginInput from './LoginInput'
function LoginForm() {
    const auth = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleLogin = async () => {
        const user = await auth.login(username, password)
        navigate(`/${user.role.toLowerCase()}`)
    }

  /*  useEffect(() => {
        const user = auth.getCurrentUser()
        if (user) {
            navigate(`${user.role.toLowerCase()}`)
        }
    }, [])*/
    return (
        <div id={styles.loginForm}>
            <img alt="logo" src={logo} className={styles.loginLogo} />
            <h2 id={styles.loginTitle}> Đăng nhập</h2>
            <div>
                <LoginInput
                    label="Username"
                    placeholder="Nhập tài khoản"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <LoginInput
                    label="Password"
                    placeholder="Nhập mật khẩu"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div id={styles.loginButton} className={styles.loginInput}>
                    <button onClick={handleLogin}>Đăng nhập</button>
                </div>
            </div>
        </div>
    )
}
export default LoginForm