import sendRequest from "./sendRequest";
const url = "/categories/"

export function index() {
    return sendRequest(url)
}

export function show(id) {
    return sendRequest(`${url}${id}/`)
}

export function create(formData) {
    return sendRequest(url, "POST", formData)
}

export function update(id, formData) {
    return sendRequest(`${url}${id}/`, "PUT", formData)
}

export function deleteCategory(id) {
    return sendRequest(`${url}${id}/`, "DELETE")
}

