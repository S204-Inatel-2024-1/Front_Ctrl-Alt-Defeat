import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { BsHouseDoorFill, BsBackpack2, BsAward, BsFillCameraFill, BsAwardFill, BsArrowLeft } from 'react-icons/bs';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../slices/authSlice';
import { useNavigation } from '../components/Navegacao';

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const handleLogout = () => {
    navigate("");
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <nav id="nav">
      <button onClick={goBack} className="back-button">
        <BsArrowLeft />
      </button>
      <img src="/Fetin.png" alt="FETIN Logo" className="nav-logo nav-logo-position" />
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
          </>
        ) : (
          <>
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
