import * as TYPES from './types';

const initialState = {
    user: false,
    ads: [],
    tags: [], 
    ui: {
        fetching: false
    }
};

export function user(state = initialState.user, action) {
    switch(action.type) {
        case TYPES.USER_LOGIN:
            return true

        case TYPES.USER_LOGOUT:
            return false

        default:
            return state;
    }
}

export function ads(state = initialState.ads, action) {
    switch(action.type) {
        case TYPES.FETCH_ADS_SUCCESS:
            return action.ads;

        case TYPES.FETCH_ADS_FAILURE:
            return action.error;

        default:
            return state;
    }
}

export function ui(state = initialState.ui, action) {
    switch(action.type) {
        case TYPES.FETCH_ADS:
          return  {
                ...state, 
                fetching: true
            };
        case TYPES.FETCH_ADS_SUCCESS:
            return {
                ...state,
                fetching: false
            }
        default:
            return state
    }
}

export function tags(state = initialState.tags, action) {
    switch(action.type) {
        case TYPES.FETCH_TAGS_SUCCESS:
            return action.tags;

        case TYPES.FETCH_TAGS_FAILURE:
            return action;

        default:
            return state;
    }
}
