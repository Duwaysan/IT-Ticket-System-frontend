import sendRequest from "./sendRequest";
const url = "/users"

export async function signup(formData) {
    try {
        const response = await sendRequest(`${url}/signup/`, "POST", formData)
        localStorage.setItem('token', response.access);
        console.log(response, "signup response");
        return response.data
    } catch (err) {
        localStorage.removeItem('token');
        return null;
    }
}

export async function login(formData) {
    try {
        const response = await sendRequest(`${url}/login/`, "POST", formData)
        localStorage.setItem('token', response.access);
        // console.log(response, "login response");
        return response
    } catch (err) {
        localStorage.removeItem('token');
        return null;
    }
}

export function logout() {
    localStorage.removeItem('token');
}