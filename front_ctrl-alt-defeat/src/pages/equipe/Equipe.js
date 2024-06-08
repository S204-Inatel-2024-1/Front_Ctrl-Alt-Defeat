import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import authService from '../../services/authService';
import "./Equipe.css";

const EquipeDetalhes = () => {
  const { equipeId } = useParams();
  const [equipeData, setEquipeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipeData = async () => {
      try {
        const data = await authService.getEquipe(equipeId);
        setEquipeData(data);
      } catch (err) {
        setError('Failed to fetch equipe data.');
      }
    };
    fetchEquipeData();
  }, [equipeId]);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!equipeData) {
    return <div>Loading equipe data...</div>;
  }

  return (
    <div id="equipe-detalhes">
      <div className="equipe-header">
        <h2>Equipe número: {equipeData.number}</h2>
        <h3>{equipeData.name}</h3>
      </div>
      <ul className="equipe-info">
        <li className="orientador">
          <span className="label">Orientador:</span>
          <span className="value">{equipeData.nomeOrientador}</span>
          <span className="email">{equipeData.emailOrientador}</span>
        </li>
        <li className="description">
          <span className="label">Description:</span>
          <span className="value">{equipeData.description}</span>
        </li>
        <li className="status">
          <span className="label">Status:</span>
          <span className="value">{equipeData.status}</span>
        </li>
        {equipeData.members.length > 0 ? (
          equipeData.members.map((membro, index) => (
            <li key={index} className="membro">
              <span className="label">Membro {index + 1}:</span>
              <span className="value">{membro.name}</span>
              <span className="email">{membro.email}</span>
              <span className="matricula">Matrícula: {membro.matricula}</span>
            </li>
          ))
        ) : (
          <li className="no-members">
            <span className="label">Nenhum membro encontrado</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default EquipeDetalhes;
