import styles from './searchBar.module.css'
import { FaSearch } from 'react-icons/fa'
import { useRef } from 'react'
function SearchBar({ term, searchKeyWord }) {
    const inputSearch = useRef("")
    function getSearchTerm() {
        searchKeyWord(inputSearch.current.value)
    }
    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Tìm kiếm"
                className={styles.inputSearch}
                ref={inputSearch}
                value={term}
                onChange={getSearchTerm}
            />
            <div className={styles.icon}>
                <FaSearch />
            </div>
        </div>
    )
}
export default SearchBar