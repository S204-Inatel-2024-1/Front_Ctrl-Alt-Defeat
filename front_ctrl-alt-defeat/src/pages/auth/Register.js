import "./Auth.css"

// Components
import {Link} from 'react-router-dom'

// Hooks
import { useState, useEffect } from "react"

const Register = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div id="register">
      <h2>Ctrl+Alt+Defeat</h2>
      <p className="subtitle"> Cadastre-se para participar da maior feira de tecnologia de Minas Gerais</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome Completo"/>
        <input type="email" placeholder="Email da instituicao"/>
        <input type="password" placeholder="Senha"/>
        <input type="password" placeholder="Confirme a senha"/>
        <input type="submit" placeholder="Cadastrar"/>
      </form>
      <p>
        Ja esta cadastrado? <Link to="/login">Entre na plataforma</Link>
      </p>
    </div>
  )
}

export default Register