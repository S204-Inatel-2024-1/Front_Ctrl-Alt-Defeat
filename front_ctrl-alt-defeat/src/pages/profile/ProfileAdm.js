import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./ProfileAdm.css";

const ProfileAdm = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div id="profile-adm" className="profile-adm-container">
      <h2>Administrador</h2>
      <button className="profile-adm-button" onClick={() => handleNavigate('/EditarEquipeAdm')}>Cadastrar Equipes</button>
      <button className="profile-adm-button" onClick={() => handleNavigate('/editar-status-equipes')}>Editar status das equipes</button>
      <button className="profile-adm-button" onClick={() => handleNavigate('/adicionar-remover-membro')}>Adicionar/remover membro da equipe</button>
      <button className="profile-adm-button" onClick={() => handleNavigate('/TodasEquipes')}>Ver Equipes</button>
    </div>
  );
};

export default ProfileAdm;
