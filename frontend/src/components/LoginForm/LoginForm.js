import { useState } from 'react'
import styles from './loginForm.module.css'
import logo from './../../assets/logo.png'
import LoginInput from './LoginInput'
function LoginForm({handleLogin}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
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
                    <button onClick={() => handleLogin(username,password)}>Đăng nhập</button>
                </div>
            </div>
        </div>
    )
}
export default LoginForm