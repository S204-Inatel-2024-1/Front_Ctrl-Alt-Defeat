import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import "./EditarEquipe.css";

const EditarEquipeAdm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    nameOrientador: '',
    emailOrientador: '',
    members: [{ name: '', email: '', matricula: '' }]
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const members = [...formData.members];
    members[index][name] = value;
    setFormData((prevData) => ({ ...prevData, members }));
  };

  const addMember = () => {
    if (formData.members.length < 4) {
      setFormData((prevData) => ({
        ...prevData,
        members: [...prevData.members, { name: '', email: '', matricula: '' }]
      }));
    }
  };

  const removeMember = (index) => {
    const members = formData.members.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, members }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.registerEquipe(formData);
      if (response.msg === `Equipe ${formData.number} criada com sucesso!`) {
        navigate(`/TodasEquipes`);
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

  return (
    <div id="editar-equipe" className="editar-equipe-adm-container">
      <h2>Cadastrar Equipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Número do Projeto:</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Nome do Projeto:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Nome do Orientador:</label>
          <input
            type="text"
            name="nameOrientador"
            value={formData.nameOrientador}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email do Orientador:</label>
          <input
            type="email"
            name="emailOrientador"
            value={formData.emailOrientador}
            onChange={handleInputChange}
          />
        </div>
        <div className="member-list">
          <h3>Membros: </h3>
          {formData.members.map((member, index) => (
            <div key={index} className="member-list">
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={member.name}
                onChange={(e) => handleMemberChange(index, e)}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={member.email}
                onChange={(e) => handleMemberChange(index, e)}
              />
              <input
                type="text"
                name="matricula"
                placeholder="Matrícula"
                value={member.matricula}
                onChange={(e) => handleMemberChange(index, e)}
              />
              <div className="button">
                <button type="button" className="remove-button" onClick={() => removeMember(index)}>Remover</button>
              </div>
            </div>
          ))}
        </div>
        {formData.members.length < 4 && (
          <button type="button" className="add-member-button" onClick={addMember}>Adicionar Membro</button>
        )}
        <button type="submit">Enviar</button>
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

export default EditarEquipeAdm;
