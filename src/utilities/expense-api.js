import sendRequest from "./sendRequest";

const url = "/expenses/";

export async function index() {
  return sendRequest(url);
}

export async function show(id) {
  return sendRequest(`${url}${id}/`);
}