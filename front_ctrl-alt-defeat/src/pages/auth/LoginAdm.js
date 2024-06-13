import "./Auth.css"

// Components
import Message from "../../components/Message"
import { useEffect, useState } from "react"

// Hooks
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

// Redux
import { login, reset } from "../../slices/authSlice"


const LoginAdm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, msg, user } = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()

        const user = {
            email,
            password
        }

        dispatch(login({ userData: user, route: "admin" }))
    }

    // Limpando todos os estados auth
    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    useEffect(() => {
        console.log("Usuario: ", user)
        if (user) {
            console.log("User do LoginAluno: ", email)
            navigate(`/ProfileAdm/${user}`); // Redireciona para o perfil do aluno com o email
        }
    }, [user, navigate]);

    return (
        <div id="login">
            <h2>
                Entre como Administrador
            </h2>
            <p className="subtitle">Faça login para administrar a feira</p>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email || ""} />
                <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password || ""} />
                {!loading && <input type="submit" value="Entrar" />}
                {loading && <input type="submit" value="Aguarde..." disabled />}
                {msg && <Message msg={msg} type="error" />}
            </form>
            <p>
                Nao se cadastrou ainda? <Link to="/RegisterAdm">Clique aqui</Link>
            </p>
        </div>
    )
}

export default LoginAdm