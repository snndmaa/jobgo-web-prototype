import { ActionTypes } from "../actions/types";
import AxiosConfig from "../../AxiosConfig";

// Define the shape of the state
interface JobState {
    jobs: any[];
}

// Define the shape of actions
interface JobAction {
    type: string;
    payload?: any;
}

// Initial state for the reducer
const initialState: JobState = {
    jobs: [],
};

const jobReducer = (state: JobState = initialState, action: JobAction): JobState => {
    switch (action.type) {
        case ActionTypes.ALL_JOBS:
            return {
                ...state,
                jobs: action.payload, // Jobs are set via dispatched action payload
            };
        default:
            return state;
    }
};

export const fetchAllJobs = async (dispatch: React.Dispatch<JobAction>) => {
    try {
        const res = await AxiosConfig.get('jobs/');
        dispatch({ type: ActionTypes.ALL_JOBS, payload: res.data });
    } catch (err) {
        console.error("Failed to fetch jobs:", err);
    }
};

export default jobReducer;
