import { createContext } from "react";
const AuthContext = createContext()
const loginAPI = "http://localhost:8080/login"
function AuthProvider({ children }) {
    const login = (username, password) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        return fetch(`${loginAPI}?username=${username}&password=${password}`, requestOptions)
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
    const checkLoggedin = (user) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.access_token}`);


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(`${loginAPI}`, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                throw Error(response.status)
            })
            .then(result => {
                localStorage.setItem("user", JSON.stringify(result))
                console.log(result)
                return result
            })
            .catch(error => console.log('error', error));
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
        checkLoggedin
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthProvider }