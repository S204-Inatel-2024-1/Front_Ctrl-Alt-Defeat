import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import "./ProfileAdm.css";

const ProfileAdm = () => {
  const navigate = useNavigate();
  const [globalPhase, setGlobalPhase] = useState('');
  const [globalDate, setGlobalDate] = useState('');
  const [file, setFile] = useState(null);

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Por favor, selecione um arquivo primeiro.');
      return;
    }
    try {
      await authService.uploadExcelFile(file);
      alert('Arquivo enviado com sucesso!');
      setFile(null);
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error);
      alert('Falha ao enviar o arquivo. Tente novamente.');
    }
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
          <label htmlFor="globalPhase">Fase atual da FETIN:</label>
          <input
            type="text"
            id="globalPhase"
            value={globalPhase}
            onChange={handlePhaseChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="globalDate">Data de Entrega:</label>
          <input
            type="date"
            id="globalDate"
            value={globalDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fileUpload">Enviar Arquivo com os dados das Equipes:</label>
          <input
            type="file"
            id="fileUpload"
            accept=".xlsx"
            onChange={handleFileChange}
          />
          <button onClick={handleFileUpload}>Enviar Arquivo</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdm;
