import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import './AlterarSenha.css'
import { logout, reset } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';

const AlterarSenha = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [token, setToken] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.forgotPassword({ email });
      if(res.msg === "Email enviado com sucesso!"){
        setPopupMessage(res.msg);
        setShowPopup(true);
      }else {
        setPopupMessage(res.msg);
        setShowPopup(true);
      }
    } catch (err) {
       setPopupMessage('Erro ao solicitar redefinição de senha.');
       setShowPopup(true);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.resetPassword({ email, token, newPassword, confirmPass });
      if(res.msg === "Senha resetada com sucesso!"){
        dispatch(logout());
        dispatch(reset());
        navigate('/');
      }else {
        setPopupMessage(res.msg);
        setShowPopup(true);
      }
    } catch (err) {
        setPopupMessage('Erro ao redefinir senha.');
        setShowPopup(true)
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage('');
  };

  return (
    <div className="alterar-senha-container">
      <h2>Alterar Senha</h2>
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

export default AlterarSenha;
