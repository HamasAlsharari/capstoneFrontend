import sendRequest from "./sendRequest";

export async function addProfile(userId, formData) {
    const response = await sendRequest(`/users/${userId}/add-profile/`, "POST", formData);
    return response;
}

export async function updateProfile(userId, formData) {
    const response = await sendRequest(`/users/${userId}/update-profile/`, "PUT", formData);
    return response;
}

