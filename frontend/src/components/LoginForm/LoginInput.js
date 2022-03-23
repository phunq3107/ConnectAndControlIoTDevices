import styles from './loginForm.module.css'
function LoginInput({ label, ...inputProps }) {
    return (
        <div className={styles.loginInput}>
            <label>{label}</label>
            <input {...inputProps} />
        </div>
    )
}
export default LoginInput