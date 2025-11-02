import sendRequest from "./sendRequest";
const url = "/payment-methods/"

export function listPaymentMethods() {
    return sendRequest(url)
}

export function showPaymentMethod(id) {
    return sendRequest(`${url}${id}/`)
}

export function createPaymentMethod(formData) {
    return sendRequest(url, "POST", formData)
}

export function updatePaymentMethod(id, formData) {
    return sendRequest(`${url}${id}/`, "PUT", formData)
}

export function deletePaymentMethod(id) {
    return sendRequest(`${url}${id}/`, "DELETE")
}

export async function addPaymentMethodToExpense(expenseId, paymentMethodId) {
    return sendRequest(`/expenses/${expenseId}/add-pm/${paymentMethodId}/`, "POST");
}

export async function removePaymentMethodFromExpense(expenseId, paymentMethodId) {
    return sendRequest(`/expenses/${expenseId}/remove-pm/${paymentMethodId}/`, "POST");
}