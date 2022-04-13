import styles from './sidebar.module.css'
import MenuItem from './MenuItem'
export default function AdminSidebar() {
    const items = [
        {
            title: "Trang chủ",
            link: "/admin"
        },
        {
            title: "Danh sách nhân viên",
            link: "/admin/employees"
        },
        {
            title: "Thêm nhân viên",
            link: "/admin/add"
        },
        {
            title: "Nhật ký hoạt động",
            link: "/admin/log"
        },
        {
            title: "Thông tin cá nhân",
            link: "/admin/info"
        },
        {
            title: "Đăng xuất",
            link: "/"
        }
    ]
    return (
        <div className={styles.adminsidebar}>
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
