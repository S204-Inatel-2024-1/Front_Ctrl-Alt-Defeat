import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import "./EditarEquipeAdm.css";

const EditarEquipeAdm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    nameOrientador: '',
    emailOrientador: '',
    members: [{ name: '', email: '', matricula: '' }]
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
        setSuccessMessage(response.msg);
        setTimeout(() => {
          navigate('/TodasEquipes');
        }, 2000);
      } else {
        setError(response.msg || 'Erro ao cadastrar equipe');
      }
    } catch (err) {
      setError('Failed to register equipe');
    }
  };

  return (
    <div id="editar-equipe-adm" className="editar-equipe-adm-container">
      <h2>Cadastrar Equipe</h2>
      {error && (
        <div className="error-popup">
          <p>{error}</p>
          <button onClick={() => setError('')}>Voltar</button>
        </div>
      )}
      {successMessage && (
        <div className="success-popup">
          <p>{successMessage}</p>
        </div>
      )}
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
        <div className="form-group">
          <label>Membros:</label>
          {formData.members.map((member, index) => (
            <div key={index} className="member-group">
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
              <button type="button" onClick={() => removeMember(index)}>Remover</button>
            </div>
          ))}
          {formData.members.length < 4 && (
            <button type="button" onClick={addMember}>Adicionar Membro</button>
          )}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default EditarEquipeAdm;
