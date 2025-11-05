import sendRequest from "./sendRequest";
const url = '/messages/'

export function ticketMessages(ticketId) {
    return sendRequest(`/tickets/${ticketId}${url}`)
}

export function create(formData, ticketId) {
    return sendRequest(`/tickets/${ticketId}${url}`, "POST", formData)
}

export async function deleteMessage(ticketId,messageId) {
    return sendRequest(`/tickets/${ticketId}${url}${messageId}/`, "DELETE")
}

export async function update(data, ticketId,messageId) {
    return sendRequest(`/tickets/${ticketId}${url}${messageId}/`, "PUT",data)
}