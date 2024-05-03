import './Navbar.css'

// Components
import { NavLink, Link } from 'react-router-dom'
import { BsSearch, BsHouseDoorFill, BsBackpack2, BsAward, BsFillCameraFill, BsAwardFill } from 'react-icons/bs'

// hooks
import { useAuth } from '../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Redux
import { logout, reset } from '../slices/authSlice'


const Navbar = () => {
  const { auth } = useAuth()
  const { user } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout()) // Limpo o usuario do sistema
    dispatch(reset()) // Garantia a mais de que o usuario foi removido

    navigate("/")
  }

  return (
    <nav id="nav">
      <Link to="/">
        FETIN
      </Link>
      <form id="search-form">
        <BsSearch />
        <input type='text' placeholder='Pesquisar' />
      </form>
      <ul id='nav-links'>
        {!auth ? (
          <>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsFillCameraFill />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/LoginAluno">
                <BsBackpack2 />
              </NavLink>
            </li>
            <li>
              <NavLink to="/LoginOrientador">
                <BsAward />
              </NavLink>
            </li>
            <li>
              <NavLink to="/LoginAdm">
                <BsAwardFill />
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to='/LoginAluno'> Logar como aluno</NavLink>
            </li>
            <li>
              <NavLink to='/RegisterAluno'> Cadastrar aluno </NavLink>
            </li>
            <li>
              <NavLink to='/LoginOrientador'> Logar como orientador</NavLink>
            </li>
            <li>
              <NavLink to='/RegisterOrientador'> Registrar orientador</NavLink>
            </li>
            <li>
              <NavLink to='/LoginAdm'> Logar como orientador</NavLink>
            </li>
            <li>
              <NavLink to='/RegisterAdm'> Registrar orientador</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar