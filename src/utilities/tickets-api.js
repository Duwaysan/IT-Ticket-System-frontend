import sendRequest from "./sendRequest";

export function profileTickets(profileId) {
    console.log("Fetching tickets for profile ID:", profileId);
    return sendRequest(`/profiles/${profileId}/tickets/`);

}