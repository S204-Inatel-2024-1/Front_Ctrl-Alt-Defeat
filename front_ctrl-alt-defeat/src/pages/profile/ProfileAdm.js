import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ProfileAdm.css";

const ProfileAdm = () => {
  const navigate = useNavigate();
  const [globalPhase, setGlobalPhase] = useState('Fetin@inatel.br');
  const [globalDate, setGlobalDate] = useState('teste');

  useEffect(() => {
    const storedPhase = localStorage.getItem('globalPhase');
    const storedDate = localStorage.getItem('globalDate');
    if (storedPhase) setGlobalPhase(storedPhase);
    if (storedDate) setGlobalDate(storedDate);
  }, []);

  const handlePhaseChange = (e) => {
    const phase = e.target.value;
    setGlobalPhase(phase);
    localStorage.setItem('globalPhase', phase);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setGlobalDate(date);
    localStorage.setItem('globalDate', date);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div id="profile-adm" className="profile-adm-container">
      <h2>Administrador</h2>
      <button className="profile-adm-button" onClick={() => handleNavigate('/EditarEquipeAdm')}>Cadastrar Equipes</button>
      <button className="profile-adm-button" onClick={() => handleNavigate('/EditarStatusEquipes')}>Editar Status das Equipes</button>
      <button className="profile-adm-button" onClick={() => handleNavigate('/adicionar-remover-membro')}>Adicionar/remover membro da equipe</button>
      <button className="profile-adm-button" onClick={() => handleNavigate('/TodasEquipes')}>Ver Equipes</button>
      <div className="global-settings">
        <div className="form-group">
          <label htmlFor="globalPhase">Fase FETIN:</label>
          <input
            type="text"
            id="globalPhase"
            value={globalPhase}
            onChange={handlePhaseChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="globalDate">Data de entrega:</label>
          <input
            type="date"
            id="globalDate"
            value={globalDate}
            onChange={handleDateChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileAdm;
