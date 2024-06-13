import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './TodasEquipes.css';

const TodasEquipes = () => {
  const [equipes, setEquipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipes = async () => {
      const data = await authService.getEquipes();
      setEquipes(data);
    };

    fetchEquipes();
  }, []);

  const handleEdit = (equipeId) => {
    navigate(`/equipe/${equipeId}/editar`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEquipes = equipes.filter(equipe =>
    equipe.number.includes(searchTerm)
  );

  return (
    <div id="todas-equipes">
      <h2>Todas as Equipes</h2>
      <input 
        type="text" 
        placeholder="Pesquisar por número do projeto..." 
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="equipes-container">
        {filteredEquipes.length > 0 ? (
          filteredEquipes.map((equipe) => (
            <div key={equipe._id} className="equipe-card">
              <h3>{equipe.name}</h3>
              <p><strong>Projeto:</strong> {equipe.number}</p>
              <p><strong>Orientador:</strong> {equipe.nameOrientador} ({equipe.emailOrientador})</p>
              <p><strong>Status:</strong> {equipe.status}</p>
              <p><strong>Descrição:</strong> {equipe.description}</p>
              <div className="members">
                <strong>Membros:</strong>
                {equipe.members.map((member, index) => (
                  <p key={index}>{member.name} ({member.email}, {member.matricula})</p>
                ))}
              </div>
              <button onClick={() => handleEdit(equipe.number)}>Editar</button>
            </div>
          ))
        ) : (
          <p>Nenhuma equipe encontrada</p>
        )}
      </div>
    </div>
  );
};

export default TodasEquipes;
