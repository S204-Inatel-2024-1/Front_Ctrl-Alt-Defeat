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
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const { loading, msg } = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()

        const user = {
            email,
            password
        }

        dispatch(login({ userData: user, route: "orientador" }))
    }

    // Limpando todos os estados auth
    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    return (
        <div id="login">
            <h2>
                Entre como Orientador
            </h2>
            <p className="subtitle">Faca login para cadastrar um projeto</p>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email || ""} />
                <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password || ""} />
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