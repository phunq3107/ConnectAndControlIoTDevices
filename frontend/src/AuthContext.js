import { createContext,useState } from "react";
const AuthContext = createContext()
function AuthProvider({ children }) {
    const [incubators,setUserIncubators] = useState([]);
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
    const setIncubators = (incubator) => {
        setUserIncubators(incubator)
    }
    const getUserIncubators = () =>{
        return setUserIncubators
    }
    const value = {
        login,
        logout,
        getCurrentUser,
        setIncubators,
        getUserIncubators
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthProvider }