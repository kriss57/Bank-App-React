// Token service //

let saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

let logout = () => {
  localStorage.removeItem("token");
};

let checkToken = () => {
  let token = localStorage.getItem("token");
  return !!token;
};

let getToken = () => {
  return localStorage.getItem("token");
};
export const tokenService = { saveToken, logout, checkToken, getToken };
