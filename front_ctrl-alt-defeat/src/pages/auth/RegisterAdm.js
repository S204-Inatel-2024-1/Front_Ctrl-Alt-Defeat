import React from 'react'
import "./Auth.css"

// Components
import { Link } from "react-router-dom"
import Message from "../../components/Message"

// Hooks
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux" 

// Redux
import { register, reset } from "../../slices/authSlice"

const RegisterAdm = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState ("")
    const [confirmPass, setconfirmPassword] = useState("")

    const dispatch = useDispatch()

    const { loading, msg } = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()

        const userAdm = {
            name,
            email,
            password,
            confirmPass
          }

          dispatch(register({ userData: userAdm, route: "admin" }))
    }

    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    return (
        <div id="register">
            <h2>Registro Admin</h2>
            <p className='subtitle'> Cadastre-se</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome Completo" onChange={(e) => setName(e.target.value)} value={name || ""} />
                <input type="email" placeholder="Email da instituicao" onChange={(e) => setEmail(e.target.value)} value={email || ""} />
                <input type="password" placeholder="Senha" onChange={(e) => setpassword(e.target.value)} value={password|| ""} />
                <input type="password" placeholder="Confirme a senha" onChange={(e) => setconfirmPassword(e.target.value)} value={confirmPass || ""} />
                {!loading && <input type="submit" value="Cadastrar"/>}
                {loading && <input type="submit" value="Aguarde..." disabled/>}
                {msg && <Message msg={msg} type="error" />}
            </form>
            <p>
                Já está cadastrado? <Link to="/LoginAdm">Entre na plataforma</Link>
            </p>
        </div>
    )
}

export default RegisterAdm