import "./Auth.css"

// Components
import Message from "../../components/Message"
import { useEffect, useState } from "react"

// Hooks
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

// Redux
import { login, reset } from "../../slices/authSlice"

const LoginAluno = () => {
  const [emailAluno, setEmail] = useState("")
  const [passwordAluno, setPassword] = useState("")

  const dispatch = useDispatch()

  const {loading, msg} = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()

    const user ={
      emailAluno,
      passwordAluno
    }

    dispatch(login({ userData: user, route: "aluno" }))
  }

  // Limpando todos os estados auth
  useEffect(() => {
    dispatch(reset())
  }, dispatch)

  return (
    <div id="login">
      <h2>
        Entre como Aluno
      </h2>
      <p className="subtitle">Faca login para cadastrar um projeto</p>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={emailAluno || ""} />
        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={passwordAluno || ""}/>
        {!loading && <input type="submit" value="Entrar"/>}
        {loading && <input type="submit" value="Aguarde..." disabled/>}
        {msg && <Message msg={msg} type="error"/>}
      </form>
      <p>
        Nao se cadastrou ainda? <Link to="/RegisterAluno">Clique aqui</Link>
      </p>
    </div>
  )
}

export default LoginAluno