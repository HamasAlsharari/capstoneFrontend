import sendRequest from "./sendRequest";

const url = "/expenses/";

export async function index() {
  return sendRequest(url);
}

export async function show(id) {
  return sendRequest(`${url}${id}/`);
}

export async function create(expenseData) {
    return sendRequest(url, "POST", expenseData);
}

export async function update(formData, expenseId) {
  return sendRequest(`${url}${expenseId}/`, "PUT", formData);
}

export async function deleteExpense(expenseId) {
  return sendRequest(`${url}${expenseId}/`, "DELETE");
}