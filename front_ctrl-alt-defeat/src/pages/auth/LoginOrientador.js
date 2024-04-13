import "./Auth.css"

// Components
import Message from "../../components/Message"
import { useEffect, useState } from "react"

// Hooks
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

// Redux
import { login, reset } from "../../slices/authSlice"


const LoginOrientador = () => {
    const [emailOrientador, setEmail] = useState("")
    const [passwordOrientador, setPassword] = useState("")

    const dispatch = useDispatch()

    const { loading, msg } = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()

        const user = {
            emailOrientador,
            passwordOrientador
        }

        dispatch(login({ userData: user, route: "orientador" }))
    }

    // Limpando todos os estados auth
    useEffect(() => {
        dispatch(reset())
    }, dispatch)

    return (
        <div id="login">
            <h2>
                Entre como Orientador
            </h2>
            <p className="subtitle">Faca login para cadastrar um projeto</p>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={emailOrientador || ""} />
                <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={passwordOrientador || ""} />
                {!loading && <input type="submit" value="Entrar" />}
                {loading && <input type="submit" value="Aguarde..." disabled />}
                {msg && <Message msg={msg} type="error" />}
            </form>
            <p>
                Nao se cadastrou ainda? <Link to="/RegisterOrientador">Clique aqui</Link>
            </p>
        </div>
    )
}

export default LoginOrientador