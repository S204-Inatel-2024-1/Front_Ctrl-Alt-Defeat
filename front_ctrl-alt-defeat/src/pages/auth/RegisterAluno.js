import "./Auth.css"

// Components
import { Link,useNavigate } from 'react-router-dom'
import Message from "../../components/Message"

// Hooks
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

// Redux
import { register, reset } from "../../slices/authSlice"

const RegisterAluno = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [matricula, setMatricula] = useState("")
  const [password, setpassword] = useState("")
  const [confirmPass, setconfirmPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Pegando estado e o contexto (Redux)
  const { loading, msg, user } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      name,
      email,
      matricula,
      password,
      confirmPass
    }


    dispatch(register({ userData: user, route: "aluno" }))
  }

  useEffect(() => {
    if (user === email) {
      console.log("User do LoginAluno: ", user)
      navigate(`/ProfileAluno/${user}`); // Redireciona para o perfil do aluno com o email
    }
    else {
      navigate(`/RegisterAluno`)
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div id="register">
      <h2>Ctrl+Alt+Defeat</h2>
      <p className="subtitle"> Cadastre-se para participar da maior feira de tecnologia de Minas Gerais</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome Completo" onChange={(e) => setName(e.target.value)} value={name || ""} />
        <input type="email" placeholder="Email da instituicao" onChange={(e) => setEmail(e.target.value)} value={email || ""} />
        <input type="number" placeholder="Matricula" onChange={(e) => setMatricula(e.target.value)} value={matricula || ""} />
        <input type="password" placeholder="Senha" onChange={(e) => setpassword(e.target.value)} value={password || ""} />
        <input type="password" placeholder="Confirme a senha" onChange={(e) => setconfirmPassword(e.target.value)} value={confirmPass || ""} />
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {msg && <Message msg={msg} type="error" />}
      </form>
      <p>
        Ja esta cadastrado? <Link to="/LoginAluno">Entre na plataforma</Link>
      </p>
    </div>
  )
}

export default RegisterAluno