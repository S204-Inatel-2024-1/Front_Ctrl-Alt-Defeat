import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import authService from '../../services/authService';
import { useParams, Navigate } from "react-router-dom";

const ProfileAluno = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [profileData, setProfileData] = useState(null);

  // useEffect(() => {
  //   dispatch(getUserDetails(id)); // Fetch user data on component mount
  // }, [id]); // Trigger on id change (optional)

  useEffect(() => {
    const fetchData = async () => {
        if (user) {
            const data = await authService.getEquipeData("eduardo.costa@ges.inatel.br"); // Use getEquipeData do authService
            setProfileData(data);
        }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!profileData) {
    return <div>Failed to fetch profile data.</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <ul>
        <li>Nome: {profileData.name}</li>
        <li>Email: {profileData.email}</li>
        <li>Matrícula: {profileData.matricula}</li>
        <li>Equipes Atuais: {profileData.equipesAtuais ? profileData.equipesAtuais.join(', ') : 'Sem equipes'}</li>
        <li>Acesso: {profileData.acesso}</li>
      </ul>
    </div>
  );
};

export default ProfileAluno;