import { api, requestConfig } from "../utils/config";

const register = async (data, route) => {
  const config = requestConfig("POST", data);
  try {
    const res = await fetch(api + "auth/register/" + route, config)
      .then((res) => res.json())
      .catch((err) => err);

    localStorage.setItem("user", JSON.stringify(res));

    return res;
  } catch (err) {
    console.log('Error in Register: ', err);
  }
};

// Logout do Usuario
const logout = () => {
  localStorage.removeItem("user");
};

// Entrando um usuario
const login = async (data, route) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "auth/login/" + route, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (err) {
    console.log(err);
  }
};

const getEquipeData = async (email) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "get/aluno/data/" + email, config)
      .then((res) => res.json())
      .catch((err) => err);

    // console.log(res);

    return res;

  } catch (err) {
    console.log('Error in getEquipeData: ', err);
  }
};

const getEquipe = async (num) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "get/equipe/data/" + num, config)
      .then((res) => res.json())
      .catch((err) => err);

    console.log(res);

    return res;
  } catch (err) {
    console.log('Error in getEquipeData: ', err);
  }
};

const getEquipeOrientadorData = async (email) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "get/orientador/data/" + email, config)
      .then((res) => res.json())
      .catch((err) => err);

    console.log(res);

    return res;

  } catch (err) {
    console.log('Error in getEquipeOrientadorData: ', err);
  }
};

const authService = {
  register,
  logout,
  login,
  getEquipeData,
  getEquipe,
  getEquipeOrientadorData
  // getUserDetails,
};

export default authService;
