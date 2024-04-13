import "./Auth.css"

// Components
import {Link} from 'react-router-dom'
import Message from "../../components/Message"

// Hooks
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux" 

// Redux
import { register, reset } from "../../slices/authSlice"

const RegisterAluno = () => {

  const [nameAluno, setName] = useState("")
  const [emailAluno, setEmail] = useState("")
  const [matricula, setMatricula] = useState("")
  const [passwordAluno, setpassword] = useState ("")
  const [confirmPass, setconfirmPassword] = useState("")

  const dispatch = useDispatch()

  // Pegando estado e o contexto (Redux)
  const {loading, msg} = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      nameAluno,
      emailAluno,
      matricula,
      passwordAluno,
      confirmPass
    }


    dispatch(register({ userData: user, route: "aluno" }))
  }

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div id="register">
      <h2>Ctrl+Alt+Defeat</h2>
      <p className="subtitle"> Cadastre-se para participar da maior feira de tecnologia de Minas Gerais</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome Completo" onChange={(e) => setName(e.target.value)} value={nameAluno || ""}/>
        <input type="email" placeholder="Email da instituicao" onChange={(e) => setEmail(e.target.value)} value={emailAluno || ""}/>
        <input type="number" placeholder="Matricula" onChange={(e) => setMatricula(e.target.value)} value={matricula || ""}/>
        <input type="password" placeholder="Senha" onChange={(e) => setpassword(e.target.value)} value={passwordAluno || ""}/>
        <input type="password" placeholder="Confirme a senha" onChange={(e) => setconfirmPassword(e.target.value)} value={confirmPass || ""}/>
        {!loading && <input type="submit" value="Cadastrar"/>}
        {loading && <input type="submit" value="Aguarde..." disabled/>}
        {msg && <Message msg={msg} type="error"/>}
      </form>
      <p>
        Ja esta cadastrado? <Link to="/LoginAluno">Entre na plataforma</Link>
      </p>
    </div>
  )
}

export default RegisterAluno