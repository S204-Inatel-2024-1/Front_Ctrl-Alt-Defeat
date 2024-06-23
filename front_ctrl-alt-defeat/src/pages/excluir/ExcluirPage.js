import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './ExcluirPage.css';

const ExcluirPage = () => {
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
    if (!email) {
      setError('Por favor, insira um email para buscar.');
      return;
    }

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
      if (err.message === 'Usuário não encontrado') {
        setError('Usuário não encontrado no sistema. Verifique o email e tente novamente.');
      } else {
        setError('Erro ao buscar os dados. Verifique o email e o tipo de usuário selecionado e tente novamente.');
      }
    }
  };

  const handleDelete = async () => {
    try {
      await authService.deleteUser(email, userType);
      alert('Usuário excluído com sucesso!');
      setUserData(null);
      setEmail('');
      window.location.reload(); // Atualiza a página
    } catch (err) {
      console.error('Failed to delete user:', err);
      setError('Erro ao excluir o usuário. Tente novamente.');
    }
  };

  const handleClearError = () => {
    setError('');
    setEmail('');
    setUserData(null);
    window.location.reload(); // Atualiza a página
  };

  return (
    <div id="excluir-page" className="excluir-page-container">
      <div className="excluir-page-header">
        <h2>Excluir Aluno/Orientador</h2>
      </div>
      <div className="form-group">
        <label htmlFor="userType">Tipo de Usuário:</label>
        <select id="userType" value={userType} onChange={handleUserTypeChange}>
          <option value="aluno">Aluno</option>
          <option value="orientador">Orientador</option>
        </select>
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
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={handleClearError}>OK</button>
        </div>
      )}
      {userData && (
        <div className="user-data">
          <p>Nome: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {userType === 'aluno' ? (
            <>
              <p>Matrícula: {userData.matricula}</p>
              <p>Equipes Atuais: {userData.equipesAtuais?.join(', ')}</p>
            </>
          ) : (
            <p>Equipes Orientadas: {userData.equipesOrientadas?.join(', ')}</p>
          )}
          <button className="delete-button" onClick={handleDelete}>Excluir</button>
        </div>
      )}
    </div>
  );
};

export default ExcluirPage;
