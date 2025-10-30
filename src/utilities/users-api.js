import sendRequest from "./sendRequest";
const url = "/profiles"

export async function signup(formData) {
    try {
        const response = await sendRequest(`${url}/signup/`, "POST", formData)
        localStorage.setItem('token', response.access);
        return response.user
    } catch (err) {
        localStorage.removeItem('token');
        return null;
    }
}

export function login() {

}

export function logout() {
    localStorage.removeItem('token');
}