import React, { useState, useEffect } from "react";
import "./App.css";

const url = "http://localhost:3000/TeamMembers"

function Login() {
  const [aba, setAba] = useState("equipe");
  const [equipe, setEquipe] = useState([]);
  const [name, setName] = useState("");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("")
 
  const [nomeOrientador, setNomeOrientador] = useState("");
  const [emailOrientador, setEmailOrientador] = useState("");
  const [senhaOrientador, setSenhaOrientador] = useState("");

  // Resgatando dados
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url)

      // Transformando json em objeto
      const data = await res.json()

      setEquipe(data);
    }

    fetchData();
  }, []);

  // Adicionando membros na equipe
  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(equipe),
    })

    // Carregamento dinamico - implementando no arquivo json
    const addedMember = await res.json()
    setEquipe((prevMembers) => [...prevMembers, addedMember])

    setEquipe({ name: "", matricula: "", email: "" })
  }

  const mudarAba = (novaAba) => {
    setAba(novaAba);
  };

  const mudarMembro = (indice, campo, valor) => {
    const novaEquipe = equipe.map((membro, i) =>
      i === indice ? { ...membro, [campo]: valor } : membro
    );
    setEquipe(novaEquipe);
  };

  const adicionarMembro = () => {
    if (equipe.length < 4) {
      setEquipe([...equipe, { name: "", matricula: "", email: "" }]);
    }
  };

  const removerMembro = (indice) => {
    const novaEquipe = equipe.filter((_, i) => i !== indice);
    setEquipe(novaEquipe);
  };

  const validarMatricula = (valor) => /^\d*$/.test(valor);

  const validarEmail = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

  const validarSenha = (valor) => valor.length >= 6;

  const cadastrarEquipe = () => {
    console.log("Dados dos Membros da Equipe: ");
    console.log(equipe);
  };

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
          {equipe.map((membro, indice) => (
            <div key={indice} className="membro-equipe">
              <input
                type="text"
                placeholder={`Nome do Membro ${indice + 1}`}
                value={membro.name}
                onChange={(e) => mudarMembro(indice, "name", e.target.value)}
              />
              <input
                type="email"
                placeholder={`Email do Membro ${indice + 1}`}
                value={membro.email}
                onChange={(e) => mudarMembro(indice, "email", e.target.value)}
              />
              <input
                type="number"
                placeholder={`Matrícula do Membro ${indice + 1}`}
                value={membro.matricula}
                onChange={(e) =>
                  validarMatricula(e.target.value) &&
                  mudarMembro(indice, "matricula", e.target.value)
                }
              />
              <div className="remove-btn">
                {indice > 0 && (
                  <button onClick={() => removerMembro(indice)}>Remover</button>
                )}
              </div>
            </div>
          ))}
          <button
            className="add-btn"
            onClick={adicionarMembro}
            onSubmit={handleSubmit}
            disabled={equipe.length === 4}>
            Adicionar Membro
          </button>
          <button className="cadastrar-btn" onClick={cadastrarEquipe}>
            Cadastrar
          </button>
        </div>
      )}
      {aba === "orientador" && (
        <div
          className={`orientador-section ${aba === "orientador" ? "active" : ""
            }`}
        >
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
        </div>
      )}
      {aba === "orientador" && (
        <button className="cadastrar-btn" onClick={cadastrarOrientador}>
          Cadastrar
        </button>
      )}
    </div>
  );
};

export default Login;
