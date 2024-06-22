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

    console.log("Adm: ", res)

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

    return res;

  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error('Usuário não encontrado');
    }
    throw error;
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

    console.log("Dados do orientador: ", res);
    return res;

  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error('Usuário não encontrado');
    }
    throw error;
  }
};

const updateEquipeData = async (data) => {
  const config = requestConfig("PUT", data);

  try {
    const res = await fetch(api + "set/equipe/data", config)
      .then((res) => res.json())
      .catch((err) => err);

    console.log("Update Equipe Data: ", res)
    return res;
  } catch (err) {
    console.log('Error in updateEquipeData: ', err);
  }
};

const getEquipes = async () => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "get/equipes/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (err) {
    console.log('Error in getEquipes: ', err);
  }
};

const registerEquipe = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "auth/register/equipe", config)
      .then((res) => res.json())
      .catch((err) => err);

    console.log("Register Equipe: ", res)

    return res;
  } catch (err) {
    console.log('Error in registerEquipe: ', err);
  }
};

const updateEquipeStatus = async (number, newStatus) => {
  const config = requestConfig("PUT", {
    number,
    newStatus,
  });

  try {
    const res = await fetch(api + "set/equipe/status", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (err) {
    console.error('Error in updateEquipeStatus: ', err);
  }
};

const uploadExcelFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const config = {
    method: 'POST',
    body: formData,
  };

  try {
    const res = await fetch(api + "import/data/excel", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (err) {
    console.log('Error in uploadExcelFile: ', err);
  }
};

const deleteUser = async (email, userType) => {
  const config = requestConfig("DELETE", { email });

  try {
    const route = userType === 'orientador' ? 'delete/user/orientador' : 'delete/user/aluno';
    const res = await fetch(api + route, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (err) {
    console.error('Error in deleteUser:', err);
  }
};


const deleteEquipe = async (number) => {
  const config = requestConfig("DELETE", { number });
  console.log({number})

  try {
    const res = await fetch(api + "delete/equipe", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (err) {
    console.error('Error in deleteEquipe:', err);
  }
};

const authService = {
  register,
  logout,
  login,
  getEquipeData,
  getEquipe,
  getEquipeOrientadorData,
  updateEquipeData,
  registerEquipe,
  getEquipes,
  updateEquipeStatus,
  uploadExcelFile,
  deleteUser,
  deleteEquipe
};

export default authService;
