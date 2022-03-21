import { useState } from 'react'
import styles from './loginForm.module.css'
import logo from './../../assets/logo.png'
function LoginForm() {
    console.log(styles)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/login?username=${username}&password=${password}`, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                throw Error(response.status)
            })
            .then(result => {
                localStorage.setItem("accessToken", result.access_token)
            })
            .catch(error => {
                console.log(error)
                alert("Sai tai khoan")
            });
    }
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
const LoginInput = ({ label, ...inputProps }) => (
    <div className={styles.loginInput}>
        <label>{label}</label>
        <input {...inputProps} />
    </div>
)
export default LoginForm