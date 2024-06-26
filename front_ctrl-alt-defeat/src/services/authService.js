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

// Forgot Password
const forgotPassword = async (data) => {
  const config = requestConfig("POST", data);
  try {
    const res = await fetch(api + "forgot/password", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (err) {
    console.error('Error in forgotPassword:', err);
  }
};

// Reset Password
const resetPassword = async (data) => {
  const config = requestConfig("POST", data);
  try {
    const res = await fetch(api + "password/reset", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (err) {
    console.error('Error in resetPassword:', err);
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

const removeAlunoFromEquipe = async (email, equipeId) => {
  const config = requestConfig("DELETE", { email, number: equipeId });

  try {
    const res = await fetch(api + "delete/user/aluno", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (err) {
    console.error('Error in removeAlunoFromEquipe:', err);
  }
};

const addAlunoToEquipe = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "add/aluno/equipe", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (err) {
    console.error('Error in addAlunoToEquipe:', err);
  }
};

const deleteEquipe = async (number) => {
  const config = requestConfig("DELETE", { number });

  try {
    const res = await fetch(api + "delete/equipe", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (err) {
    console.error('Error in deleteEquipe:', err);
  }
};

const updateGlobalSettings = async (data) => {
  const config = requestConfig("PUT", data);
  try {
    const res = await fetch(api + "set/fase/atual", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (err) {
    console.error('Error in updateGlobalSettings: ', err);
  }
};

const getGlobalSettings = async () => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "get/fase/atual", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (err) {
    console.error('Error in getGlobalSettings:', err);
  }
};

const authService = {
  register,
  logout,
  login,
  forgotPassword,
  resetPassword,
  getEquipeData,
  getEquipe,
  getEquipeOrientadorData,
  updateEquipeData,
  registerEquipe,
  getEquipes,
  updateEquipeStatus,
  uploadExcelFile,
  deleteUser,
  deleteEquipe,
  updateGlobalSettings,
  getGlobalSettings,
  removeAlunoFromEquipe,
  addAlunoToEquipe
};

export default authService;
