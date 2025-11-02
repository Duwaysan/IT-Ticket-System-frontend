import sendRequest from "./sendRequest";
const url = "/tickets/"

export function profileTickets(profileId) {
    return sendRequest(`/profiles/${profileId}${url}`);
}

export async function index() {
    return sendRequest(url)
}
export function show(ticketId) {
    return sendRequest(`${url}${ticketId}/`);
}

export function create(formData, profileId) {
    return sendRequest(`/profiles/${profileId}${url}`, "POST", formData)
}

export async function update(formData, ticketId) {
    return sendRequest(`${url}${ticketId}/`, "PUT", formData)
}

export async function deleteTicket(ticketId) {
    return sendRequest(`${url}${ticketId}/`, "DELETE")
}