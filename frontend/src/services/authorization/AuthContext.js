import { createContext } from "react";
const AuthContext = createContext()
function AuthProvider({ children }) {
    const login = (username, password) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        return fetch(`http://localhost:8080/login?username=${username}&password=${password}`, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                throw Error(response.status)
            })
            .then(result => {
                localStorage.setItem("user", JSON.stringify(result))
                return result
            })
            .catch(error => {
                console.log(error)
                alert("Sai tai khoan")
            });
    }
    const logout = () => {
        localStorage.removeItem("user")
    }
    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem("user"))
    }

    const value = {
        login,
        logout,
        getCurrentUser,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthProvider }