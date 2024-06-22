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
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <button className="close-button" onClick={closePopup}>Voltar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarEquipe;
