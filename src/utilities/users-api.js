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
        console.log("login response: ",response);
        return response
    } catch (err) {
        localStorage.removeItem('token');
        return null;
    }
}

export function logout() {
    localStorage.removeItem('token');
}

export async function getUser() {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const response = await sendRequest(`${url}/token/refresh/`)
            localStorage.setItem('token', response.access);
            return response
        }
        return null;
    } catch (err) {
        console.log(err);
        return null;
    }

}
export async function getManagers() {
    try {
        const response = await sendRequest(`${url}/managers/`)
        return response;
    } catch (err) {
        console.log(err);
        return [];
    }
}