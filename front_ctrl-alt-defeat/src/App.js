import React, { useState, useEffect } from 'react';
import './App.css'; // Importe o arquivo CSS

const Login = () => {
  const [aba, setAba] = useState('equipe');
  const [equipe, setEquipe] = useState(['']);

  useEffect(() => {
    if (aba === 'equipe' && equipe.length === 0) {
      setEquipe(['']); // Adiciona um membro por padrão se a aba é "equipe" e não há membros
    }
  }, [aba, equipe]);

  const mudarAba = (aba) => {
    setAba(aba);
  };

  const mudarMembro = (indice, valor) => {
    const novaEquipe = [...equipe];
    novaEquipe[indice] = valor;
    setEquipe(novaEquipe);
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

  const validarMatricula = (valor) => {
    return /^\d*$/.test(valor); // Verifica se a matrícula contém apenas números inteiros
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
                value={equipe[indice] ? equipe[indice] : ''}
                onChange={(e) =>
                  mudarMembro(indice, e.target.value)
                }
              />
              <input
                type="text"
                placeholder={`Matrícula do Membro da Equipe ${indice + 1}`}
                value={equipe[indice] ? equipe[indice] : ''}
                onChange={(e) =>
                  validarMatricula(e.target.value) && mudarMembro(indice, e.target.value)
                }
              />
              {indice > 0 && (
                <button onClick={() => removerMembro(indice)}>Remover</button>
              )}
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
            name="email"
          />
          <input
            type="password"
            placeholder="Senha"
            name="senha"
          />
        </div>
      )}
    </div>
  );
};

export default Login;
