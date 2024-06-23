import React, { useState } from 'react';
import authService from '../../services/authService';
import './AlterarSenha.css'

const AlterarSenha = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.forgotPassword({ email });
      setMessage(res.message);
    } catch (err) {
      setError('Erro ao solicitar redefinição de senha.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.resetPassword({ email, token, newPassword, confirmPass });
      setMessage(res.message);
    } catch (err) {
      setError('Erro ao redefinir senha.');
    }
  };

  return (
    <div className="alterar-senha-container">
      <h2>Alterar Senha</h2>
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      <form onSubmit={handleForgotPassword} className="alterar-senha-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar Email para Redefinição</button>
      </form>

      <form onSubmit={handleResetPassword} className="alterar-senha-form">
        <div className="form-group">
          <label htmlFor="token">Token:</label>
          <input
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Nova Senha:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Confirmar Nova Senha:</label>
          <input
            type="password"
            id="newPassword"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />
        </div>
        <button type="submit">Redefinir Senha</button>
      </form>
    </div>
  );
};

export default AlterarSenha;
