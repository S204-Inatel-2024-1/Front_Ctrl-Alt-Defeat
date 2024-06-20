import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './ExcluirPage.css';

const ExcluirPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('aluno');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSearch = async () => {
    try {
      let res;
      if (userType === 'orientador') {
        res = await authService.getEquipeOrientadorData(email);
      } else {
        res = await authService.getEquipeData(email);
      }
      setUserData(res);
      setError('');
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      setError('Erro ao buscar os dados. Verifique o email e tente novamente.');
    }
  };

  const handleDelete = async () => {
    alert('Usuário excluído com sucesso!');
    setUserData(null);
    setEmail('');
  };

  const handleBack = () => {
    navigate('/ProfileAdm');
  };

  return (
    <div id="excluir-page" className="excluir-page-container">
      <h2>Excluir Aluno/Orientador</h2>
      <div className="form-group">
        <label>
          <input
            type="radio"
            name="userType"
            value="aluno"
            checked={userType === 'aluno'}
            onChange={handleUserTypeChange}
          />
          Aluno
        </label>
        <label>
          <input
            type="radio"
            name="userType"
            value="orientador"
            checked={userType === 'orientador'}
            onChange={handleUserTypeChange}
          />
          Orientador
        </label>
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {userData && (
        <div className="user-data">
          <p>Nome: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {userType === 'aluno' ? (
            <>
              <p>Matrícula: {userData.matricula}</p>
              <p>Equipes Atuais: {userData.equipesAtuais.join(', ')}</p>
            </>
          ) : (
            <p>Equipes Orientadas: {userData.equipesOrientadas.join(', ')}</p>
          )}
          <button className="delete-button" onClick={handleDelete}>Excluir</button>
        </div>
      )}
      <button className="back-button" onClick={handleBack}>Voltar</button>
    </div>
  );
};

export default ExcluirPage;
