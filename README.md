README - Projeto de Gestão de Feira Acadêmica
Feira Acadêmica
Este projeto é um sistema de gerenciamento de feira acadêmica desenvolvido em React, onde diferentes tipos de usuários (Alunos, Orientadores e Administradores) podem se cadastrar, fazer login e realizar ações específicas relacionadas à feira.

Índice
Sobre o Projeto
Pré-requisitos
Instalação
Rodando o Projeto
Deploy no Vercel
Estrutura do Projeto
Funcionalidades
Contribuição
Licença
Sobre o Projeto
O projeto de gestão de feira acadêmica foi criado para facilitar o gerenciamento de projetos acadêmicos em uma feira. Ele permite que alunos, orientadores e administradores interajam no sistema de forma segura e organizada.

Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

Node.js
npm
Git
Instalação
Clone o repositório:

bash
Copiar código
git clone https://github.com/seu-usuario/seu-repositorio.git
Navegue até o diretório do projeto:

bash
Copiar código
cd seu-repositorio
Instale as dependências:

bash
Copiar código
npm install
Rodando o Projeto
Para iniciar o projeto em modo de desenvolvimento, use o comando:

bash
Copiar código
npm start
Abra http://localhost:3000 para visualizar no navegador.

Deploy no Vercel
Para fazer o deploy do projeto no Vercel, siga os passos abaixo:

Crie uma conta no Vercel.
Clique em "New Project" e importe o repositório GitHub.
Configure as configurações do projeto conforme necessário.
Clique em "Deploy".
Rodando em Produção
Para rodar o projeto em produção, você pode usar o comando:

bash
Copiar código
npm run build
Isso criará uma versão otimizada do projeto na pasta build. Em seguida, você pode hospedar essa pasta em qualquer serviço de hospedagem estática, como Vercel.

Estrutura do Projeto
A estrutura básica do projeto é a seguinte:

css
Copiar código
src/
  components/
    Message.js
  pages/
    auth/
      LoginAdm.js
      LoginAluno.js
      LoginOrientador.js
      RegisterAdm.js
      RegisterAluno.js
      RegisterOrientador.js
    profiles/
      ProfileAdm.js
      ProfileAluno.js
      ProfileOrientador.js
  slices/
    authSlice.js
  App.js
  index.js
  Auth.css
Funcionalidades
Autenticação
O projeto possui diferentes tipos de login:

Login para Administrador (LoginAdm.js)
Login para Aluno (LoginAluno.js)
Login para Orientador (LoginOrientador.js)
Registro
Os usuários podem se registrar como:

Administrador (RegisterAdm.js)
Aluno (RegisterAluno.js)
Orientador (RegisterOrientador.js)
Perfis
Cada tipo de usuário tem seu perfil específico:

Perfil do Administrador (ProfileAdm.js)
Perfil do Aluno (ProfileAluno.js)
Perfil do Orientador (ProfileOrientador.js)
Navegação e Controle
O projeto utiliza o contexto de navegação para gerenciar a navegação e logout automático quando necessário:

javascript
Copiar código
import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout, reset } from '../slices/authSlice';
import { useDispatch } from 'react-redux';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const historyRef = useRef([]);
    const dispatch = useDispatch();

    useEffect(() => {
        historyRef.current.push(location.pathname);
    }, [location]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
        window.location.reload();
    };

    const goBack = () => {
        if (historyRef.current.length > 1) {
            const previousPath = historyRef.current.pop();
            const nextPath = historyRef.current[historyRef.current.length - 1];
            const atualPath = useLocation()

            const profileRegex = /\/Profile(Aluno|Orientador|Adm)\/.*/;
            const loginRegex = /\/(?:Login|login)(Aluno|Orientador|Adm)$/;

            if (profileRegex.test(previousPath) && loginRegex.test(nextPath)) {
                handleLogout();
            } else if (profileRegex.test(atualPath.pathname)){
                navigate('/')
            }
            else {
                const previousPath = historyRef.current.pop();
                navigate(previousPath);
            }
        } else {
            handleLogout();
        }
    };

    return (
        <NavigationContext.Provider value={{ goBack }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    return useContext(NavigationContext);
};
Estilos
Os estilos do projeto são gerenciados através do arquivo Auth.css.

Contribuição
Para contribuir com o projeto, siga os passos abaixo:

Faça um fork do projeto.
Crie uma branch para sua feature (git checkout -b feature/fooBar).
Commit suas mudanças (git commit -m 'Add some fooBar').
Push para a branch (git push origin feature/fooBar).
Abra um Pull Request.
Licença
Distribuído sob a licença MIT. Veja LICENSE para mais informações.
