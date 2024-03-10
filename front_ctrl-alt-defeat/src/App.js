import React, { useState, useEffect, useSyncExternalStore } from "react";
import "./App.css";

const url = "http://localhost:3000/TeamMembers";
const url2 = "http://localhost:3002/Coordenator"

function Login() {
  const [aba, setAba] = useState("equipe");
  const [equipe, setEquipe] = useState([]);
  const [orientadores, setCoord] = useState([]);

  // Estado para os campos do novo membro da equipe
  const [name, setNovoNome] = useState("");
  const [matricula, setNovaMatricula] = useState("");
  const [email, setNovoEmail] = useState("");

  const [nomeOrientador, setNomeOrientador] = useState("");
  const [emailOrientador, setEmailOrientador] = useState("");
  const [senhaOrientador, setSenhaOrientador] = useState("");

  // Resgatando dados da equipe
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      const data = await res.json();
      setEquipe(data);
    }
    fetchData();
  }, []);

  //Resgatando dados do orientador
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url2);
      const data = await res.json();
      setCoord(data);
    }
    fetchData();
  }, []);

  // Adicionando membros na equipe
  const handleSubmit = async (e) => {
    e.preventDefault();

    const member = {
      name,
      matricula,
      email,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    });

    //carregamento dinamico
    const addedMember = await res.json();
    setEquipe((prevMembers) => [...prevMembers, addedMember]);

    // Limpa os campos do novo membro após a submissão
    setNovoNome("");
    setNovaMatricula("");
    setNovoEmail("");
  };

  // Adicionando orientador
  const handleSubmitOrientador = async (e) => {
    e.preventDefault();

    const coord = {
      nomeOrientador,
      emailOrientador,
      senhaOrientador
    }

    const res = await fetch(url2, {
      method: "POST",
      headers:{
        "Content-Type":"applications/json"
      },
      body: JSON.stringify(coord)
    })

    const addedOrientadores = await res.json()
    setCoord((prevOrientadores) => [...prevOrientadores, addedOrientadores])

    setNomeOrientador("")
    setEmailOrientador("")
    setSenhaOrientador("")
  }


  const mudarAba = (novaAba) => {
    setAba(novaAba);
  };

  // const adicionarMembro = () => {
  //   if (equipe.length < 4) {
  //     setEquipe([...equipe, { name: "", matricula: "", email: "" }]);
  //   }
  // };

  const removerOrientador = async (indice) => {
    const novoOrientadores = orientadores.filter((_, i) => i !== indice);
    setCoord(novoOrientadores);
    const membroRemovido = orientadores[indice];
    try {
      await fetch(`${url2}/${membroRemovido.id}`, {
        method: "DELETE",
      });
      console.log("Membro removido do servidor JSON");
    } catch (error) {
      console.error("Erro ao remover membro do servidor JSON:", error);
    }
  };

  const removerMembro = async (indice) => {
    const novaEquipe = equipe.filter((_, i) => i !== indice);
    setEquipe(novaEquipe);
    const membroRemovido = equipe[indice];
    try {
      await fetch(`${url}/${membroRemovido.id}`, {
        method: "DELETE",
      });
      console.log("Membro removido do servidor JSON");
    } catch (error) {
      console.error("Erro ao remover membro do servidor JSON:", error);
    }
  };

  // const validarMatricula = (valor) => /^\d*$/.test(valor);

  const validarEmail = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

  const validarSenha = (valor) => valor.length >= 6;

  // const cadastrarEquipe = () => {
  //   console.log("Dados dos Membros da Equipe: ");
  //   console.log(equipe);
  // };

  const cadastrarOrientador = () => {
    if (validarEmail(emailOrientador) && validarSenha(senhaOrientador)) {
      console.log("Dados do orientador: ");
      console.log("Nome: ", nomeOrientador);
      console.log("Email: ", emailOrientador);
      console.log("Senha: ", senhaOrientador);
    } else {
      console.log("Email ou Senha Inválidos!");
    }
  };

  return (
    <div className="login-container">
      <div className="tab-btn">
        <button
          className={aba === "equipe" ? "active" : ""}
          onClick={() => mudarAba("equipe")}
        >
          Equipe
        </button>
        <button
          className={aba === "orientador" ? "active" : ""}
          onClick={() => mudarAba("orientador")}
        >
          Orientador
        </button>
      </div>
      {aba === "equipe" && (
        <div className={`equipe-section ${aba === "equipe" ? "active" : ""}`}>
          <table>
            {/* Cabeçalho da tabela */}
            <thead>
              <tr className="membro-list th">
                <th>Nome</th>
                <th>Email</th>
                <th>Matrícula</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeamento dos membros */}
              {equipe.map((membro, indice) => (
                <tr className="membro-list td" key={membro.id}>
                  <td>{membro.name}</td>
                  <td>{membro.email}</td>
                  <td>{membro.matricula}</td>
                  <td>
                    {/* Botão de remover */}
                    {indice >= 0 && (
                      <button className="remove-btn" onClick={() => removerMembro(indice)}>Remover</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Formulário de adicionar membro */}
          {equipe.length < 4 && (
            <form onSubmit={handleSubmit}>
              <div className="membro-equipe">
                <div className="input-wrapper">
                  <label>
                    <input
                      type="text"
                      value={name}
                      placeholder="Nome"
                      name="name"
                      onChange={(e) => setNovoNome(e.target.value)}
                    />
                  </label>
                </div>
                <div className="input-wrapper">
                  <label>
                    <input
                      type="email"
                      value={email}
                      placeholder="Email"
                      name="email"
                      onChange={(e) => setNovoEmail(e.target.value)}
                    />
                  </label>
                </div>
                <div className="input-wrapper">
                  <label>
                    <input
                      type="number"
                      value={matricula}
                      placeholder="Matricula"
                      name="matricula"
                      onChange={(e) => setNovaMatricula(e.target.value)}
                    />
                  </label>
                </div>

              </div>
              {/* Botão de cadastrar */}
              <button className="cadastrar-btn" disabled={equipe.length === 4}>Cadastrar</button>
            </form>
          )}
        </div>
      )}

      {aba === "orientador" && (
        <div className={`orientador-section ${aba === "orientador" ? "active" : ""}`}>
          <table>
            {/* Cabeçalho da tabela */}
            <thead>
              <tr className="membro-list th">
                <th>Nome</th>
                <th>Email</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeamento dos membros */}
              {orientadores.map((orientador, indice) => (
                <tr className="membro-list td" key={orientador.id}>
                  <td>{orientador.nomeOrientador}</td>
                  <td>{orientador.emailOrientador}</td>
                  <td>
                    {/* Botão de remover */}
                    {indice >= 0 && (
                      <button className="remove-btn" onClick={() => removerOrientador(indice)}>Remover</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orientadores.length < 1 && (
            <div>
              <form onSubmit={handleSubmitOrientador}>
                <input
                  type="text"
                  placeholder="Nome"
                  value={nomeOrientador}
                  onChange={(e) => setNomeOrientador(e.target.value)}
                />
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
                <button className="cadastrar-btn" onClick={cadastrarOrientador}>
                  Cadastrar
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
