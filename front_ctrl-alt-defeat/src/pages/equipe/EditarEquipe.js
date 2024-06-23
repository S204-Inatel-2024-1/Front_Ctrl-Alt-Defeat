import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import "./EditarEquipe.css";

const EditarEquipe = () => {
  const { equipeId } = useParams();
  const navigate = useNavigate();
  const [equipeData, setEquipeData] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showAddMemberField, setShowAddMemberField] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [formData, setFormData] = useState({
    newName: '',
    newNameOrientador: '',
    newEmailOrientador: '',
    description: ''
  });

  useEffect(() => {
    const fetchEquipeData = async () => {
      try {
        const data = await authService.getEquipe(equipeId);
        setEquipeData(data);
        setFormData({
          newName: data.name,
          newNameOrientador: data.nameOrientador,
          newEmailOrientador: data.emailOrientador,
          description: data.description
        });
      } catch (err) {
        setError('Failed to fetch equipe data.');
      }
    };
    fetchEquipeData();
  }, [equipeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      number: equipeId,
      ...formData
    };
    try {
      const response = await authService.updateEquipeData(updatedData);
      if (response.msg === 'Informações de equipe salvas!') {
        navigate(`/equipe/${equipeId}`);
      } else {
        setPopupMessage(response.msg);
        setShowPopup(true);
      }
    } catch (err) {
      setPopupMessage('Failed to update equipe data.');
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage('');
  };

  const handleRemoveMember = async (email) => {
    try {
      const response = await authService.removeAlunoFromEquipe(email, equipeId);
      if (response.msg === 'Aluno Deletado com Sucesso.') {
        setEquipeData((prevData) => ({
          ...prevData,
          members: prevData.members.filter(member => member.email !== email)
        }));
      } else {
        setPopupMessage(response.msg || 'Failed to remove member.');
        setShowPopup(true);
      }
    } catch (err) {
      setPopupMessage('Failed to remove member.');
      setShowPopup(true);
    }
  };

  const handleAddMember = async () => {
    if (!newMemberEmail) {
      setPopupMessage('Por favor, insira um email.');
      setShowPopup(true);
      return;
    }

    try {
      const response = await authService.addAlunoToEquipe({
        email: newMemberEmail,
        number: equipeId
      });
      if (response.msg === 'Aluno Registrado com Sucesso.') {
        const updatedEquipeData = await authService.getEquipe(equipeId);
        setEquipeData(updatedEquipeData);
        setNewMemberEmail('');
        setShowAddMemberField(false);
      } else {
        setPopupMessage(response.msg);
        setShowPopup(true);
      }
    } catch (err) {
      setPopupMessage('Failed to add member.');
      setShowPopup(true);
    }
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!equipeData) {
    return <div>Loading equipe data...</div>;
  }

  return (
    <div id="editar-equipe">
      <h2>Editar Equipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome do Projeto:</label>
          <input
            type="text"
            name="newName"
            value={formData.newName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Nome do Orientador:</label>
          <input
            type="text"
            name="newNameOrientador"
            value={formData.newNameOrientador}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email do Orientador:</label>
          <input
            type="email"
            name="newEmailOrientador"
            value={formData.newEmailOrientador}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
      <h3>Membros da Equipe:</h3>
      <ul className="member-list">
        {equipeData.members.map((member) => (
          <li key={member.email}>
            <span>{member.name} ({member.email})</span>
            <button
              className="remove-button"
              onClick={() => handleRemoveMember(member.email)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      {showAddMemberField ? (
        <div className="add-member-form">
          <input
            type="email"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
            placeholder="Email do aluno"
          />
          <button onClick={handleAddMember}>Adicionar</button>
        </div>
      ) : (
        <button
          className="add-member-button"
          onClick={() => setShowAddMemberField(true)}
        >
          Adicionar
        </button>
      )}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <button className="close-button" onClick={closePopup}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarEquipe;
