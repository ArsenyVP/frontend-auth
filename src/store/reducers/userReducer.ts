import { UserAction, UserActionTypes, UserState } from "../../types"

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    message: null
}

export const userReducer = (state = initialState, action: UserAction) => {
    switch (action.type) {
        case UserActionTypes.LOGIN_USER:
            return {
                ...state, loading: true, user: null
            }
        case UserActionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state, loading: false, user: action.payload, error: null
            }
        case UserActionTypes.REGISTER_USER:
            return {
                ...state, loading: true
            }
        case UserActionTypes.REGISTER_USER_SUCCESS:
            return {
                ...state, loading: false, message: action.payload, error: null
            }
        case UserActionTypes.FETCH_ERROR:
            return {
                ...state, error: action.payload, loading: false
            }
        case UserActionTypes.LOGOUT_USER:
            return {
                ...state, loading: false, error: null, user: null
            }

        default:
            return state
    }
}
