import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import authService from '../../services/authService';
import "./Profile.css";
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const ProfileAluno = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [showTeams, setShowTeams] = useState(false);

  const toggleTeamsVisibility = () => {
    setShowTeams(!showTeams);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const data = await authService.getEquipeData("eduardo.costa@ges.inatel.br");
          setProfileData(data);
        }
      } catch (err) {
        setError('Failed to fetch profile data.');
      }
    };
    fetchData();

    return () => {
      setProfileData(null);
    };
  }, [user]);

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
        <h2>Profile</h2>
        <ul className="profile-info">
          <li className="name">
            <span className="label">Nome:</span>
            <span className="value">{profileData.name}</span>
          </li>
          <li className="email">
            <span className="label">Email:</span>
            <span className="value">{profileData.email}</span>
          </li>
          <li className="matricula">
            <span className="label">Matrícula:</span>
            <span className="value">{profileData.matricula}</span>
          </li>
          <li className="teams" onClick={toggleTeamsVisibility}>
            <span className="label">Equipes Atuais:</span>
            <span className="value">
              {showTeams
                ? profileData.equipesAtuais.map((equipe, index) => (
                    <div key={index}>{equipe}</div>
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
        </ul>
      </div>
    </div>
  );
};

export default ProfileAluno;
