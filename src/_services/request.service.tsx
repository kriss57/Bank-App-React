import Axios from "./caller.service";

interface loginForm {
  email: string;
  password: string;
}
interface updateForm {
  firstName: string;
  lastName: string;
}

let login = (formData: loginForm) => {
  return Axios.post("/user/login", formData);
};

let getUser = () => {
  return Axios.post("/user/profile");
};

let updateUser = (formData: updateForm) => {
  return Axios.put("/user/profile", formData);
};

export const requestService = { login, getUser, updateUser };
