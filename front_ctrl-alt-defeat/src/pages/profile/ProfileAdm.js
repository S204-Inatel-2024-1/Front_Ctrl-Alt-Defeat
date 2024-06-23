import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import authService from '../../services/authService';
import "./ProfileAdm.css";

const ProfileAdm = () => {
  const navigate = useNavigate();
  const [globalPhase, setGlobalPhase] = useState('');
  const [globalDate, setGlobalDate] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const data = await authService.getGlobalSettings();
        setGlobalPhase(data.faseAtual);
        setGlobalDate(formatDateForInput(data.prazoEntrega));
      } catch (error) {
        console.error('Failed to fetch global settings:', error);
      }
    };
    
    fetchGlobalSettings();
  }, []);

  const handlePhaseChange = (e) => {
    setGlobalPhase(e.target.value);
  };

  const handleDateChange = (e) => {
    setGlobalDate(e.target.value);
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

  const formatDate = (dateString) => {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, 'dd/MM/yyyy HH:mm');
  };

  const formatDateForInput = (dateString) => {
    const parsedDate = parseISO(dateString);
    return parsedDate.toISOString().slice(0, 16);
  };

  const handlePhaseUpdate = async () => {
    try {
      await authService.updateGlobalSettings({ newFase: globalPhase, newPrazo: formatDate(globalDate) });
      alert('Fase atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar a fase:', error);
      alert('Falha ao atualizar a fase. Tente novamente.');
    }
  };

  const handleDateUpdate = async () => {
    try {
      await authService.updateGlobalSettings({ newFase: globalPhase, newPrazo: formatDate(globalDate) });
      alert('Data de entrega atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar a data de entrega:', error);
      alert('Falha ao atualizar a data de entrega. Tente novamente.');
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
      <button className="profile-adm-button" onClick={() => handleNavigate('/ExcluirPage')}>Adicionar/remover membro da equipe</button>
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
          <button onClick={handlePhaseUpdate}>Atualizar Fase</button>
        </div>
        <div className="form-group">
          <label htmlFor="globalDate">Data e Hora de Entrega:</label>
          <input
            type="datetime-local"
            id="globalDate"
            value={globalDate}
            onChange={handleDateChange}
          />
          <button className="small-button" onClick={handleDateUpdate}>Atualizar Data e Hora</button>
        </div>
      </div>

      <div className="file-upload-container">
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
  );
};

export default ProfileAdm;
