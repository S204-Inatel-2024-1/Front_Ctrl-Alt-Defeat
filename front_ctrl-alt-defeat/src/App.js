import React, { useState } from 'react';
import './App.css'; // Importe o arquivo CSS

const Login = () => {
  const [aba, setAba] = useState('equipe');
  const [equipe, setEquipe] = useState([]);
  const [faculdade, setFaculdade] = useState('');
  const [email, setEmail] = useState('');
  const [emailOrientador, setEmailOrientador] = useState('');
  const [senhaOrientador, setSenhaOrientador] = useState('');

  const mudarAba = (aba) => {
    setAba(aba);
    if (aba === 'equipe') {
      setEquipe([]);
    } else if (aba === 'orientador') {
      setEmailOrientador('');
      setSenhaOrientador('');
    }
  };

  const mudarEquipe = (indice, valor) => {
    const novaEquipe = [...equipe];
    const [email, matricula] = valor.split(',');
    if (/^\S+@\S+\.\S+$/.test(email) && /^\d+$/.test(matricula)) {
      novaEquipe[indice] = valor;
      setEquipe(novaEquipe);
    }
  };

  const mudarOrientador = (e) => {
    if (e.target.name === 'email') {
      setEmailOrientador(e.target.value);
    } else if (e.target.name === 'senha') {
      setSenhaOrientador(e.target.value);
    }
  };

  const adicionarMembro = () => {
    if (equipe.length < 4) {
      setEquipe([...equipe, '']);
    }
  };

  const removerMembro = (indice) => {
    const novaEquipe = [...equipe];
    novaEquipe.splice(indice, 1);
    setEquipe(novaEquipe);
  };

  return (
    <div className="login-container"> {/* Adicione a classe CSS ao container */}
      <button className={`tab-btn ${aba === 'equipe' ? 'active' : ''}`} onClick={() => mudarAba('equipe')}>Equipe</button>
      <button className={`tab-btn ${aba === 'orientador' ? 'active' : ''}`} onClick={() => mudarAba('orientador')}>Orientador</button>
      {aba === 'equipe' && (
        <div>
          <input
            type="text"
            placeholder="Faculdade"
            value={faculdade}
            onChange={(e) => setFaculdade(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email de Matrícula"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {equipe.map((membro, indice) => (
            <div key={indice}>
              <input
                type="text"
                placeholder={`Email do Membro da Equipe ${indice + 1}`}
                value={equipe[indice] ? equipe[indice].split(',')[0] : ''}
                onChange={(e) =>
                  mudarEquipe(indice, `${e.target.value},${equipe[indice] ? equipe[indice].split(',')[1] : ''}`)
                }
              />
              {indice > 0 && (
                <button onClick={() => removerMembro(indice)}>Remover</button>
              )}
              <input
                type="text"
                placeholder={`Matrícula do Membro da Equipe ${indice + 1}`}
                value={equipe[indice] ? equipe[indice].split(',')[1] : ''}
                onChange={(e) =>
                  mudarEquipe(indice, `${equipe[indice] ? equipe[indice].split(',')[0] : ''},${e.target.value}`)
                }
              />
            </div>
          ))}
          <button className="add-btn" onClick={adicionarMembro} disabled={equipe.length === 4}>Adicionar Membro</button>
        </div>
      )}
      {aba === 'orientador' && (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={emailOrientador}
            name="email"
            onChange={mudarOrientador}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senhaOrientador}
            name="senha"
            onChange={mudarOrientador}
          />
        </div>
      )}
    </div>
  );
};

export default Login;
