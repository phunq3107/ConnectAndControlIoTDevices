import styles from './updateItem.module.css'
function UpdateItem({ label, handleEdit, ...inputProps }) {
    return (
        <div className={styles.updateItem}>
            <label>{label}</label>
            <div>
                <input {...inputProps} />
                {
                    label !== "Tên tài khoản" ?
                        <button
                            className={styles.editButton}
                            onClick={(e) => handleEdit(e, label)}
                        >
                            Chỉnh sửa</button> :
                        null
                }
            </div>
        </div>
    )
}
export default UpdateItem