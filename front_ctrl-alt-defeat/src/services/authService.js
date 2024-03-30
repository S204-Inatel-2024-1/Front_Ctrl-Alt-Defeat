import { api, requestConfig } from "../utils/config"

const register = async (data) => {
    const config = requestConfig("POST", data)
    try {
        const res = await fetch(api + "/register/aluno", config).then((res) => res.json()).catch((err) => err)

        if (res._id) {
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

// Entrando um usuario
const login = async (data) => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + "/login/aluno", config).then((res) => res.json()).catch((err) => err)

        if (res._id) {
            localStorage.setItem("user", JSON.stringify(res))
        }

        return res

    } catch (err) {
        console.log(err)
    }
}

const authService = {
    register,
    logout,
    login,
}

export default authService
