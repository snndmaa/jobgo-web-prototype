import React, { createContext, ReactNode, useReducer } from "react";
import authReducer from "../store/reducers/authReducer";
import { ActionTypes, IActionTypes } from "../store/actions/types";
import history from "../history";
import moment from "moment";
import { JwtPayload, jwtDecode } from "jwt-decode"; // This line remains as is

const jwtToken = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");
// const user = JSON.parse(localStorage.getItem("user") || '{}');

const excluded_routes = ['/login', '/register', '/jobs'];

interface IJwtPayload extends JwtPayload {
    user?: any;
}

let decoded: IJwtPayload = {};

if (jwtToken) {
    decoded = jwtDecode<IJwtPayload>(jwtToken); // Ensure jwtToken is valid
    if (moment.unix(decoded.exp!).format() < moment().format()) {
        localStorage.clear();
        if (!excluded_routes.includes(history.location.pathname)) history.push('/');
    }
} else {
    if (!excluded_routes.includes(history.location.pathname)) history.push('/');
}

interface initialState {
    isAuthenticated: boolean,
    user: any,
    token: string | null,
    refreshToken: string | null,
    isLoading: false,
}

const initialInfo: initialState = {
    isAuthenticated: !!decoded.user,
    user: decoded.user,
    token: jwtToken,
    refreshToken: refreshToken,
    isLoading: false,
};

export const AuthContext = createContext<{ state: initialState, authDispatch: React.Dispatch<any>, ActionTypes: IActionTypes }>({
    state: initialInfo,
    authDispatch: () => null,
    ActionTypes: ActionTypes
});

type contextProps = {
    children: ReactNode
}

export const AuthContextProvider = (props: contextProps) => {
    const [state, authDispatch] = useReducer(authReducer, initialInfo);

    return (
        <AuthContext.Provider value={{
            state, authDispatch, ActionTypes
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}
