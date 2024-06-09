import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <h2>Bem-vindo</h2>
      <button className="home-button" onClick={() => handleNavigate('/loginAluno')}>Login Aluno</button>
      <button className="home-button" onClick={() => handleNavigate('/loginOrientador')}>Login Orientador</button>
      <button className="home-button" onClick={() => handleNavigate('/loginAdm')}>Login Admin</button>
    </div>
  );
};

export default Home;
