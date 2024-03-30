import { api, requestConfig } from "../utils/config"

const register = async (data) => {
    const config = requestConfig("POST", data)
    try {
        const res = await fetch(api + "/register/aluno", config).then((res) => res.json()).catch((err) => err)

        if (res) {
            localStorage.setItem("user", JSON.stringify(res))
        }
        return res
    } catch (err) {
        console.log('Error in Register: ', err);
    }
}

// Logout do Usuario
const logout = () => {
    localStorage.removeItem("user")
}

const authService = {
    register,
    logout,
}

export default authService
