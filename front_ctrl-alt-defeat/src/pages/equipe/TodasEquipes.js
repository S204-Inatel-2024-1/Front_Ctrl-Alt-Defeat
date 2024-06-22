import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './TodasEquipes.css';

const TodasEquipes = () => {
  const [equipes, setEquipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEquipe, setSelectedEquipe] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");
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

  const handleDelete = (equipe) => {
    setSelectedEquipe(equipe);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await authService.deleteEquipe(selectedEquipe.number);
      if (response.msg === "Equipe deletada com sucesso!") {
        setDeleteMessage(response.msg);
        setDeleteMessage("");
        setShowPopup(false);
        setEquipes(equipes.filter(e => e.number !== selectedEquipe.number));
      }
    } catch (error) {
      console.error('Failed to delete the equipe:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEquipes = equipes.filter(equipe =>
    equipe.number.includes(searchTerm)
  );

  return (
    <div id="todas-equipes">
      <h2>Todas as Equipes: {filteredEquipes.length}</h2>
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
              <button className="delete-button" onClick={() => handleDelete(equipe)}>Excluir</button>
            </div>
          ))
        ) : (
          <p>Nenhuma equipe encontrada</p>
        )}
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Certeza que deseja excluir essa equipe?</p>
            <button className="confirm-button" onClick={confirmDelete}>Sim</button>
            <button className="cancel-button" onClick={() => setShowPopup(false)}>Não</button>
          </div>
        </div>
      )}
      {deleteMessage && (
        <div className="delete-message">
          {deleteMessage}
        </div>
      )}
    </div>
  );
};

export default TodasEquipes;
