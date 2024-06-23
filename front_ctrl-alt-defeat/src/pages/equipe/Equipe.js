import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authService from '../../services/authService';
import "./Equipe.css";

const EquipeDetalhes = () => {
  const { equipeId } = useParams();
  const [equipeData, setEquipeData] = useState(null);
  const [orientadorData, setOrientadorData] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchEquipeData = async () => {
      try {
        const data = await authService.getEquipe(equipeId);
        setEquipeData(data);
      } catch (err) {
        setError('Failed to fetch equipe data.');
      }
    };

    const fetchOrientadorData = async () => {
      try {
        const data = await authService.getEquipeOrientadorData(user);
        setOrientadorData(data);
      } catch (err) {
        setError('Failed to fetch orientador data.');
      }
    };

    fetchEquipeData();
    fetchOrientadorData();
  }, [equipeId, user]);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!equipeData || !orientadorData) {
    return <div>Loading data...</div>;
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
      {orientadorData.acesso === 'Orientador' && (
        <NavLink to={`/equipe/${equipeId}/editar`}>
          <button className="editar-button">Editar</button>
        </NavLink>
      )}
    </div>
  );
};

export default EquipeDetalhes;
