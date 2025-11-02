import sendRequest from "./sendRequest";

export function ticketMessages(ticketId) {
    return sendRequest(`/tickets/${ticketId}/messages/`)
}