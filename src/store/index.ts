import { applyMiddleware, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import { UserState } from "../types";
import { rootReducer } from './reducers';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers =
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export interface RootState {
    user: UserState
}

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
