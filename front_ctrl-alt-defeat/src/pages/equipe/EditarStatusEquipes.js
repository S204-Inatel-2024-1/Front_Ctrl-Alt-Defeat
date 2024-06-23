import React, { useState, useEffect } from 'react';
import authService from '../../services/authService';
import './EditarStatusEquipes.css';

const EditarStatusEquipes = () => {
  const [equipes, setEquipes] = useState([]);
  const [selectedEquipes, setSelectedEquipes] = useState([]);
  const [newStatus, setNewStatus] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchNumber, setSearchNumber] = useState('');

  useEffect(() => {
    const fetchEquipes = async () => {
      const data = await authService.getEquipes();
      setEquipes(data);
    };

    fetchEquipes();
  }, []);

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleEquipeSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedEquipes([...selectedEquipes, value]);
    } else {
      setSelectedEquipes(selectedEquipes.filter((number) => number !== value));
    }
  };

  const handleSelectAll = () => {
    if (selectedEquipes.length === equipes.length) {
      setSelectedEquipes([]);
    } else {
      setSelectedEquipes(equipes.map(equipe => equipe.number));
    }
  };

  const handleUpdateStatus = async () => {
    try {
      if (selectedEquipes.length === 0) {
        alert("Selecione ao menos uma equipe.");
        return;
      }

      for (const number of selectedEquipes) {
        await authService.updateEquipeStatus(number, newStatus);
      }

      alert("Status atualizado com sucesso!");
      setSelectedEquipes([]);
      setNewStatus('');
    } catch (err) {
      console.error('Failed to update equipe status:', err);
    }
  };

  const handleSearchStatus = (e) => {
    setSearchStatus(e.target.value);
  };

  const handleSearchNumber = (e) => {
    setSearchNumber(e.target.value);
  };

  const filteredEquipes = equipes.filter(equipe => 
    (searchStatus ? equipe.status === searchStatus : true) &&
    (searchNumber ? equipe.number.includes(searchNumber) : true)
  );

  return (
    <div id="editar-status-equipes" className="editar-status-equipes-container">
      <h2>Editar Status das Equipes</h2>
      <div className="status-update-section">
        <label htmlFor="status">Novo Status:</label>
        <select id="status" value={newStatus} onChange={handleStatusChange}>
          <option value="">Selecione</option>
          <option value="Fase 1">Fase 1</option>
          <option value="Fase 2">Fase 2</option>
          <option value="Fase 3">Fase 3</option>
          <option value="Fase 4">Fase 4</option>
          <option value="Fase 5">Fase 5</option>
        </select>
        <button onClick={handleUpdateStatus}>Atualizar Status</button>
      </div>
      <div className="search-section">
        <div>
          <label htmlFor="searchStatus">Pesquisar por Status:</label>
          <select id="searchStatus" value={searchStatus} onChange={handleSearchStatus}>
            <option value="">Todos</option>
            <option value="Fase 1">Fase 1</option>
            <option value="Fase 2">Fase 2</option>
            <option value="Fase 3">Fase 3</option>
            <option value="Fase 4">Fase 4</option>
            <option value="Fase 5">Fase 5</option>
          </select>
        </div>
        <div>
          <label htmlFor="searchNumber">Pesquisar por Número de Projeto:</label>
          <input
            type="text"
            id="searchNumber"
            value={searchNumber}
            onChange={handleSearchNumber}
            placeholder="Número do Projeto"
          />
        </div>
      </div>
      <div className="select-all-section">
        <button onClick={handleSelectAll}>
          {selectedEquipes.length === equipes.length ? 'Desmarcar Todas' : 'Selecionar Todas'}
        </button>
      </div>
      <div className="equipes-list">
        <h3>Selecione as equipes para atualizar o status:</h3>
        {filteredEquipes.map((equipe) => (
          <div key={equipe.number} className="equipe-item">
            <label>
              <input
                type="checkbox"
                value={equipe.number}
                onChange={handleEquipeSelection}
                checked={selectedEquipes.includes(equipe.number)}
              />
              {equipe.name} (Projeto {equipe.number}) - <strong>Status Atual:</strong> {equipe.status}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditarStatusEquipes;
