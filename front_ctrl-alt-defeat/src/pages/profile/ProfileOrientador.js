import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authService from '../../services/authService';
import "./Profile.css";
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { parseISO, format } from 'date-fns';
import { zonedTimeToUtc, format as formatTz } from 'date-fns-tz';

const ProfileOrientador = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [showTeams, setShowTeams] = useState(false);
  const [globalPhase, setGlobalPhase] = useState('');
  const [globalDate, setGlobalDate] = useState('');

  const toggleTeamsVisibility = () => {
    setShowTeams(!showTeams);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const data = await authService.getEquipeOrientadorData(user);
          setProfileData(data);
        }
      } catch (err) {
        setError('Failed to fetch profile data.');
      }
    };

    const fetchGlobalSettings = async () => {
      try {
        const data = await authService.getGlobalSettings();
        setGlobalPhase(data.faseAtual);
        setGlobalDate(formatDate(data.prazoEntrega));
      } catch (error) {
        console.error('Failed to fetch global settings:', error);
      }
    };

    fetchGlobalSettings();
    fetchData();

    return () => {
      setProfileData(null);
    };
  }, [user]);

  const formatDate = (dateString) => {
    const zonedDate = zonedTimeToUtc(parseISO(dateString), 'America/Sao_Paulo');
    return formatTz(zonedDate, 'yyyy-MM-dd\'T\'HH:mm', { timeZone: 'America/Sao_Paulo' });
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!profileData) {
    return <div>Failed to fetch profile data.</div>;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        <h2>Perfil Orientador</h2>
        <ul className="profile-info">
          <li className="name">
            <span className="label">Nome:</span>
            <span className="value">{profileData.name}</span>
          </li>
          <li className="email">
            <span className="label">Email:</span>
            <span className="value">{profileData.email}</span>
          </li>
          <li className="teams" onClick={toggleTeamsVisibility}>
            <span className="label">Equipes Orientadas:</span>
            <span className="value">
              {showTeams
                ? profileData.equipesOrientadas.map((equipe, index) => (
                    <div key={index}>
                      <NavLink to={`/equipe/${equipe}`}>
                        Equipe {equipe}
                      </NavLink>
                    </div>
                  ))
                : null}
            </span>
            {showTeams ? (
              <BsChevronUp className="arrow up" />
            ) : (
              <BsChevronDown className="arrow" />
            )}
          </li>
          <li className="acesso">
            <span className="label">Acesso:</span>
            <span className="value">{profileData.acesso}</span>
          </li>
          <li className="global-phase">
            <span className="label">Fase atual da FETIN:</span>
            <span className="value">{globalPhase}</span>
          </li>
          <li className="global-date">
            <span className="label">Data de Entrega:</span>
            <span className="value">{globalDate}</span>
          </li>
          <li className="tutorial-link">
            <span className="label">Formulários:</span>
            <span className="value">
              <NavLink to="https://siteseguro.inatel.br/PortalAcademico/WebLogin.aspx?ReturnUrl=%2fPortalacademico%2f">Formulário de Avaliações</NavLink>
            </span>
          </li>
          <li className="info-link">
            <span className="label">Manual:</span>
            <span className="value">
              <NavLink to="https://inatel.br/mestrado-doutorado/?utm_source=search&utm_medium=cpc&utm_campaign=2024-mestrado-doutorado&utm_content=AD-texto-institucional&gad_source=1&gclid=CjwKCAjw7NmzBhBLEiwAxrHQ-YaA8ENgnJXPpXoqoC-giMCRSNah67xN6ejz5FEDp6v3Dc5kPl13lhoCVywQAvD_BwE">Manual do Orientador</NavLink>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileOrientador;
