import axios from 'axios';

const API_URL = "http://localhost:8000/api/auth/";

export const AuthService = {
    login: (username, password) => {
        return axios.post(API_URL + "signin", {
            username, password
        })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("token", JSON.stringify(response.data.accessToken));
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            })
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    register: (username, email, password) => {
        return axios.post(API_URL + "signup", {
            username,
            password,
            email
        })
    },

    updateUser: (id, token, body) => {
        return axios.put(`http://localhost:8000/api/users/${id}`, body, {
            headers: {
                "x-access-token": token
            }
        }).then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data
        }).catch(e => {
            console.log(e)
            return e
        })
    },

    resetPassword: (token, body) => {
        return axios.post(API_URL + "reset-password", body, {
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": token
            }
        }).then((res) => {
            return res
        }).catch(error => {
            return error.response
        })
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
};
