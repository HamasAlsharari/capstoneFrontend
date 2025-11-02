import sendRequest from "./sendRequest";

const url = "/users";

export async function signup(formData) {
  try {
    const response = await sendRequest(`${url}/signup/`, "POST", formData);
    localStorage.setItem("token", response.access);
    localStorage.setItem("refresh", response.refresh);
    return response.user;
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    return null;
  }
}

export async function login(formData) {
  try {
    const response = await sendRequest(`${url}/login/`, "POST", formData);
    localStorage.setItem("token", response.access);
    localStorage.setItem("refresh", response.refresh);
    return response.user;
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    return null;
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
}

export async function getUser() {
  try {
    const token = localStorage.getItem("token");
    const refresh = localStorage.getItem("refresh");
    if (token && refresh) {
      const response = await sendRequest(`${url}/token/refresh/`, "POST", { refresh });
      localStorage.setItem("token", response.access);
      return response.user;
    }
    return null;
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    return null;
  }
}