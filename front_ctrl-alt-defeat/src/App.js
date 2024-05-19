import './App.css';

// Router
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Hooks
import { useAuth } from './hooks/useAuth';

//Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from "./pages/home/Home"
import LoginAluno from './pages/auth/LoginAluno';
import RegisterAluno from './pages/auth/RegisterAluno';
import RegisterOrientador from './pages/auth/RegisterOrientador';
import LoginOrientador from './pages/auth/LoginOrientador';
import LoginAdm from './pages/auth/LoginAdm';
import RegisterAdm from './pages/auth/RegisterAdm';
import ProfileAluno from './pages/profile/ProfileAluno'


function App() {
  const { auth, loading } = useAuth()

  if (loading) {
    return <p>Carregando...</p>
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route
              path=''
              element={!auth ? <Home /> : <Navigate to="" />}
            />
            <Route
              path="/LoginAluno"
              element={auth ? <Navigate to="/ProfileAluno" /> : <LoginAluno />}
            />
            <Route 
              path="/RegisterAluno"
              element={!auth ? <RegisterAluno /> : <Navigate to="/" />}
            />
            <Route
              path='/LoginOrientador'
              element={!auth ? <LoginOrientador/> : <Navigate to="/" />}
            />
            <Route
              path='/RegisterOrientador'
              element={!auth ? <RegisterOrientador/> : <Navigate to="/" />}
            />
            <Route
              path='/LoginAdm'
              element={!auth ? <LoginAdm/> : <Navigate to="/" />}
            />
            <Route
              path='/RegisterAdm'
              element={!auth ? <RegisterAdm/> : <Navigate to="/" />}
            />
            <Route 
              path='/ProfileAluno' 
              element={<ProfileAluno />} 
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;
