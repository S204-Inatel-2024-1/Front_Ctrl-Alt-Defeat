import React from 'react';
import './App.css'; // Importing the global CSS

// Router
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Hooks
import { useAuth } from './hooks/useAuth';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from "./pages/home/Home";
import LoginAluno from './pages/auth/LoginAluno';
import RegisterAluno from './pages/auth/RegisterAluno';
import RegisterOrientador from './pages/auth/RegisterOrientador';
import LoginOrientador from './pages/auth/LoginOrientador';
import LoginAdm from './pages/auth/LoginAdm';
import RegisterAdm from './pages/auth/RegisterAdm';
import ProfileAluno from './pages/profile/ProfileAluno';
import EquipeDetalhes from './pages/equipe/Equipe';
import ProfileOrientador from './pages/profile/ProfileOrientador';
import EditarEquipe from './pages/equipe/EditarEquipe';
import ProfileAdm from './pages/profile/ProfileAdm';
import EditarEquipeAdm from './pages/equipe/EditarEquipeAdm';
import TodasEquipes from './pages/equipe/TodasEquipes';
import EditarStatusEquipes from './pages/equipe/EditarStatusEquipes';
import ExcluirPage from './pages/excluir/ExcluirPage';
import AlterarSenha from './pages/senhas/AlterarSenha';
import CurrentPageComponent  from "./components/CurrentPageComponent";

import { NavigationProvider } from './components/Navegacao';

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavigationProvider>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={!auth ? <Home /> : <Navigate to="" />} />
              <Route path='/loginAluno' element={!auth ? <LoginAluno /> : <Navigate to="/loginAluno" />} />
              <Route path='/RegisterAluno' element={!auth ? <RegisterAluno /> : <Navigate to="/" />} />
              <Route path='/LoginOrientador' element={!auth ? <LoginOrientador /> : <Navigate to="/" />} />
              <Route path='/RegisterOrientador' element={!auth ? <RegisterOrientador /> : <Navigate to="/" />} />
              <Route path='/LoginAdm' element={!auth ? <LoginAdm /> : <Navigate to="/" />} />
              <Route path='/RegisterAdm' element={!auth ? <RegisterAdm /> : <Navigate to="/" />} />
              <Route path='/ProfileAluno/:email' element={<ProfileAluno />} /> {/* Dynamic route */}
              <Route path='/equipe/:equipeId' element={<EquipeDetalhes />} /> {/* Dynamic route */}
              <Route path='/ProfileOrientador/:email' element={<ProfileOrientador />} />
              <Route path='/equipe/:equipeId/editar' element={<EditarEquipe />} />
              <Route path='/ProfileAdm/:email' element={<ProfileAdm />} />
              <Route path='/EditarEquipeAdm' element={<EditarEquipeAdm />} />
              <Route path='/TodasEquipes' element={<TodasEquipes />} />
              <Route path='/EditarStatusEquipes' element={<EditarStatusEquipes />} />
              <Route path='/ExcluirPage' element={<ExcluirPage />} />
              <Route path='/AlterarSenha' element={<AlterarSenha />} />
            </Routes>
            <CurrentPageComponent />
          </div>
          <Footer />
        </NavigationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
