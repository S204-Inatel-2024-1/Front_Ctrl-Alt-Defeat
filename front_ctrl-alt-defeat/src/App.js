import React, { useState, useEffect } from 'react';
import './App.css'; // Importe o arquivo CSS

const Login = () => {
  const [aba, setAba] = useState('equipe');
  const [equipe, setEquipe] = useState([{ email: '', matricula: '' }]);
  const [emailOrientador, setEmailOrientador] = useState('');
  const [senhaOrientador, setSenhaOrientador] = useState('');

  useEffect(() => {
    if (aba === 'equipe' && equipe.length === 0) {
      setEquipe([{ email: '', matricula: '' }]); // Adiciona um membro por padrão se a aba é "equipe" e não há membros
    }
  }, [aba, equipe]);

  const mudarAba = (aba) => {
    setAba(aba);
  };

  const mudarMembro = (indice, campo, valor) => {
    const novaEquipe = equipe.map((membro, i) => {
      if (i === indice) {
        return { ...membro, [campo]: valor };
      }
      return membro;
    });
    setEquipe(novaEquipe);
  };

  const adicionarMembro = () => {
    if (equipe.length < 4) {
      setEquipe([...equipe, { email: '', matricula: '' }]);
    }
  };

  const removerMembro = (indice) => {
    const novaEquipe = [...equipe];
    novaEquipe.splice(indice, 1);
    setEquipe(novaEquipe);
  };

  const validarMatricula = (valor) => {
    return /^\d*$/.test(valor); // Verifica se a matrícula contém apenas números inteiros
  };

  const cadastrarEquipe = () => {
    console.log('Dados dos membros da equipe:');
    console.log(equipe);
  };

  const cadastrarOrientador = () => {
    console.log('Dados do orientador:');
    console.log('Email: ', emailOrientador);
    console.log('Senha: ', senhaOrientador);
  };

  return (
    <div className="login-container"> {/* Adicione a classe CSS ao container */}
      <button className={`tab-btn ${aba === 'equipe' ? 'active' : ''}`} onClick={() => mudarAba('equipe')}>Equipe</button>
      <button className={`tab-btn ${aba === 'orientador' ? 'active' : ''}`} onClick={() => mudarAba('orientador')}>Orientador</button>
      {aba === 'equipe' && (
        <div>
          {equipe.map((membro, indice) => (
            <div key={indice} className="membro-equipe">
              <input
                type="text"
                placeholder={`Email do Membro da Equipe ${indice + 1}`}
                value={membro.email}
                onChange={(e) =>
                  mudarMembro(indice, 'email', e.target.value)
                }
              />
              <input
                type="text"
                placeholder={`Matrícula do Membro da Equipe ${indice + 1}`}
                value={membro.matricula}
                onChange={(e) =>
                  validarMatricula(e.target.value) && mudarMembro(indice, 'matricula', e.target.value)
                }
              />
              {indice > 0 && (
                <button onClick={() => removerMembro(indice)}>Remover</button>
              )}
            </div>
          ))}
          <button className="add-btn" onClick={adicionarMembro} disabled={equipe.length === 4}>Adicionar Membro</button>
          <button className="cadastrar-btn" onClick={cadastrarEquipe}>Cadastrar</button>
        </div>
      )}
      {aba === 'orientador' && (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={emailOrientador}
            onChange={(e) => setEmailOrientador(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senhaOrientador}
            onChange={(e) => setSenhaOrientador(e.target.value)}
          />
          <button className="cadastrar-btn" onClick={cadastrarOrientador}>Cadastrar</button>
        </div>
      )}
    </div>
  );
};

export default Login;
