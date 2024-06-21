import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authService from '../../services/authService';
import "./EditarEquipe.css";

const EditarEquipe = () => {
  const { equipeId } = useParams();
  const navigate = useNavigate();
  const [equipeData, setEquipeData] = useState(null);
  const [error, setError] = useState(null);
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
        console.log("Informacoes do Orientador: ", data)
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
      await authService.updateEquipeData(updatedData);
      console.log(updatedData)
      navigate(`/equipe/${equipeId}`);
    } catch (err) {
      setError('Failed to update equipe data.');
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
            name="newNameProfessor"
            value={formData.newNameOrientador}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email do Orientador:</label>
          <input
            type="email"
            name="newEmailProfessor"
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
    </div>
  );
};

export default EditarEquipe;
