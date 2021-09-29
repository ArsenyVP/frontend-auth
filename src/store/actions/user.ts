import { Dispatch } from 'react';
import axios from 'axios';
import { IUser, UserAction, UserActionTypes } from '../../types';

export const loginUser = (username: string, password: string) => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.LOGIN_USER });
            axios.post("http://localhost:8000/api/auth/signin", { username, password })
            .then((res) => {
                if (res.data.username) {
                    localStorage.setItem("token", JSON.stringify(res.data.accessToken));
                    localStorage.setItem("user", JSON.stringify(res.data));
                    dispatch({ type: UserActionTypes.LOGIN_USER_SUCCESS, payload: res.data })
                    console.log(res.data)

                    return res.data;
                }

                console.log(res)

            }).catch(e => {
                console.log({e});
                
                // const errorMessage = e.response.data.message);
                dispatch({ type: UserActionTypes.FETCH_ERROR, payload: e.response.data.message })

                return e.response.data.message
            })
    }
}

export const getUser = () => {
    return (dispatch: Dispatch<UserAction>) => {
        const user = JSON.parse(JSON.stringify(localStorage.getItem('user')));
        console.log(user);
        dispatch({ type: UserActionTypes.LOGIN_USER_SUCCESS, payload: JSON.parse(user) });
    }
}

export const logoutUser = () => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.LOGOUT_USER });
    }
}

export const updateUser = (id: string | undefined, token: string | undefined, body: object) => {
    return (dispatch: Dispatch<UserAction>) => {
        axios.put(`http://localhost:8000/api/users/${id}`, body, {
            headers: {
                "x-access-token": token
            }
        }).then(({ data }) => {
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({ type: UserActionTypes.LOGIN_USER_SUCCESS, payload: data })

            return data;
        }).catch(e => {
            console.log(e);
        })
    }
}
