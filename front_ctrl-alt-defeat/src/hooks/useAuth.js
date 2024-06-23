import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

export const useAuth = () => {
    const {user} = useSelector((state) => state.auth)

    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // console.log("AUTH ANTES DA VERIFICACAO DE USUARIO:", auth);
        // console.log("RESPOSTA DO BACKEND PARA A AUTENTICACAO:", user);
        if(user){
            setAuth(true)
            // console.log("AUTH CASO TENHA UM USUARIO:", auth);

        }else{
            setAuth(false)
            // console.log("AUTH CASO NAO TENHA UM USUARIO:", auth);
        }

        setLoading(false)
    }, [user])

    return {auth, loading}
}