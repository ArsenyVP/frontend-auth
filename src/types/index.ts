export interface IUser {
    id: string,
    email: string,
    username: string,
    accessToken: string,
    roles: string[]
}

export interface UserState {
    user: IUser | null,
    loading: boolean,
    error: null | string,
    message: null | string
}

export enum UserActionTypes {
    LOGIN_USER = "LOGIN_USER",
    REGISTER_USER = "REGISTER_USER",
    FETCH_ERROR = "FETCH_ERROR",
    LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
    REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS",
    LOGOUT_USER = "LOGOUT_USER"
}

interface LoginUserAction {
    type: UserActionTypes.LOGIN_USER,
}

interface RegisterUserAction {
    type: UserActionTypes.REGISTER_USER,
}

interface FetchErrorAction {
    type: UserActionTypes.FETCH_ERROR,
    payload: string
}

interface LoginUserSuccessAction {
    type: UserActionTypes.LOGIN_USER_SUCCESS,
    payload: IUser
}

interface RegisterUserSuccessAction {
    type: UserActionTypes.REGISTER_USER_SUCCESS,
    payload: string
}

interface LogoutUserAction {
    type: UserActionTypes.LOGOUT_USER
}

export type UserAction =
    LoginUserAction
    | LoginUserSuccessAction
    | RegisterUserAction
    | RegisterUserSuccessAction
    | FetchErrorAction
    | LogoutUserAction