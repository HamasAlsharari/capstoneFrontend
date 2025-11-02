import sendRequest from "./sendRequest";

export function addProfile(userId, formData) {
  return sendRequest(`/users/${userId}/add-profile/`, "POST", formData);
}

export function updateProfile(userId, formData) {
  return sendRequest(`/users/${userId}/update-profile/`, "PUT", formData);
}


