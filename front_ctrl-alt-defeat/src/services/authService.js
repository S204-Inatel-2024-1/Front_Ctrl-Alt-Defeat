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

    localStorage.setItem("user", JSON.stringify(res));

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

      console.log(res);

    return res;
  } catch (err) {
    console.log('Error in getEquipeData: ', err);
  }
};

// // Get user details
// const getUserDetails = async (id) => {
//     const config = requestConfig("GET");
  
//     try {
//       const res = await fetch(api + "/users/" + id, config)
//         .then((res) => res.json())
//         .catch((err) => err);
  
//       return res;
//     } catch (error) {
//       console.log(error);
//     }
// };

const authService = {
  register,
  logout,
  login,
  getEquipeData,
  // getUserDetails,
};

export default authService;
