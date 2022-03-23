import styles from './sidebar.module.css'
import MenuItem from './MenuItem'
function Sidebar() {
    const items = [
        {
            title: "Trang chủ",
            link: "/employee"
        },
        {
            title: "Nhật ký hoạt động",
            link: "/"
        },
        {
            title: "Thông tin cá nhân",
            link: "/"
        },
        {
            title: "Đăng xuất",
            link: "/"
        }
    ]
    return (
        <div className={styles.sidebar}>
            <div className={styles.wrapper}>
                <div className={styles.menu}>
                    <h3 className={styles.title}>Menu</h3>
                    <ul className={styles.list}>
                        {items.map(item => <MenuItem key={item.title} title={item.title} link={item.link} />)}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Sidebar