import "./Auth.css"

// Components
import {Link} from 'react-router-dom'

// Hooks
import { useState } from "react"

const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState ("")
  const [confirmPassword, setconfirmPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      name,
      email,
      password,
      confirmPassword
    }

    console.log(user)
  }

  return (
    <div id="register">
      <h2>Ctrl+Alt+Defeat</h2>
      <p className="subtitle"> Cadastre-se para participar da maior feira de tecnologia de Minas Gerais</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome Completo" onChange={(e) => setName(e.target.value)} value={name || ""}/>
        <input type="email" placeholder="Email da instituicao" onChange={(e) => setEmail(e.target.value)} value={email || ""}/>
        <input type="password" placeholder="Senha" onChange={(e) => setpassword(e.target.value)} value={password || ""}/>
        <input type="password" placeholder="Confirme a senha" onChange={(e) => setconfirmPassword(e.target.value)} value={confirmPassword || ""}/>
        <input type="submit" placeholder="Cadastrar"/>
      </form>
      <p>
        Ja esta cadastrado? <Link to="/login">Entre na plataforma</Link>
      </p>
    </div>
  )
}

export default Register