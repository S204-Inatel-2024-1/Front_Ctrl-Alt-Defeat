import React, { useEffect, useState } from 'react';
import authService from '../../services/authService';
import './TodasEquipes.css';

const TodasEquipes = () => {
  const [equipes, setEquipes] = useState([]);

  useEffect(() => {
    const fetchEquipes = async () => {
      const data = await authService.getEquipes();
      console.log(data)
      setEquipes(data);
    };

    fetchEquipes();
  }, []);

  return (
    <div id="todas-equipes">
      <h2>Todas as Equipes</h2>
      <div className="equipes-container">
        {equipes.map((equipe) => (
          <div key={equipe._id} className="equipe-card">
            <h3>{equipe.name}</h3>
            <p><strong>Projeto:</strong> {equipe.number}</p>
            <p><strong>Orientador:</strong> {equipe.nameOrientador} ({equipe.emailOrientador})</p>
            <p><strong>Status:</strong> {equipe.status}</p>
            <p><strong>Descrição:</strong> {equipe.description}</p>
            <div className="members">
              <strong>Membros:</strong>
              {equipe.members.map((member, index) => (
                <p key={index}>{member.name} ({member.email}, {member.matricula})</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodasEquipes;
