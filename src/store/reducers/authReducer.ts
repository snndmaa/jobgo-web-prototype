import { ActionTypes } from "../actions/types";

// Define state shape
interface AuthState {
    isAuthenticated: boolean;
    user: any | null;  // Replace 'any' with a specific type if you know the user structure
    token: string | null;
    refreshToken: string | null;
    isLoading: boolean;
}

// Define action shape
interface AuthAction {
    type: string;
    payload?: {
        user: any;
        token: string;
        refreshToken: string;
    };
}

// Initial state
const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
    isLoading: true
};

const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            if (action.payload) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("refreshToken", action.payload.refreshToken);

                return {
                    ...state,
                    isAuthenticated: true,
                    user: action.payload.user,
                    token: action.payload.token,
                    refreshToken: action.payload.refreshToken,
                    isLoading: false
                };
            }
            return state;

        case ActionTypes.LOGOUT:
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                refreshToken: null,
                isLoading: false
            };

        default:
            return state;
    }
};

export default authReducer;
