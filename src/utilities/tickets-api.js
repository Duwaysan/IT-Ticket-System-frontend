import sendRequest from "./sendRequest";
const url = "/tickets/"

export function profileTickets(profileId) {
    return sendRequest(`/profiles/${profileId}${url}`);

}
export function show(ticketId) {
    return sendRequest(`${url}${ticketId}/`);
}

export function create(formData, profileId) {
    return sendRequest(`/profiles/${profileId}${url}`, "POST", formData)
}