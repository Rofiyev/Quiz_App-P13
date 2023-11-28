export const getToken = () => {
  console.log(localStorage.getItem("access"));
  return localStorage.getItem("access");
};

export const setToken = ({ access, refresh }) => {
  window.localStorage.setItem("access", access);
  window.localStorage.setItem("refresh", refresh);
};

export const clearToken = () => window.localStorage.clear();
