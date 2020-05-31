import * as TYPES from './types';
import { getTags } from './selectors';

export const createAdAction = (adToCreate) => ({
    type: TYPES.CREATE_AD,
    adToCreate,
});
  
export const editAdAction = (adToEdit) => ({
    type: TYPES.EDIT_AD,
    adToEdit,
});

export const loginUser = success => ({
    type: TYPES.USER_LOGIN,
    success,
});

export const getUserFromStorage = () => {
    return function (dispatch, getState, API) {
        sessionStorage.getItem("UserLogged") ? dispatch(userLogin()) : dispatch(userLogout());
    }
};

export const fetchAdsReq = () => ({
    type: TYPES.FETCH_ADS
});

export const fetchAdsFailure = error => ({
    type: TYPES.FETCH_ADS_FAILURE,
    error
});

export const fetchAdsSuccess = ads => ({
    type: TYPES.FETCH_ADS_SUCCESS,
    ads
});

export const fetchAds = (query = "") => {
    async function action(dispatch, getState, API) {
        try {
            dispatch(fetchAdsReq());
            const call = await API.fetchAds(query);
            const ads = call.results;
            dispatch(fetchAdsSuccess(ads));
        } catch (error) {
            dispatch(fetchAdsFailure(error));
        }
    }
    return action
}

export const fetchTagsReq = () => ({
    type: TYPES.FETCH_TAGS
});

export const fetchTagsSuccess = tags => ({
    type: TYPES.FETCH_TAGS_SUCCESS,
    tags
});

export const fetchTagsFailure = error => ({
    type: TYPES.FETCH_TAGS_FAILURE,
    error
});

export const fetchTags = () => {
    async function action(dispatch, getState, API) {
        try {
            const storeTags = getTags(getState());

            if (storeTags.length < 1) {
            dispatch(fetchTagsReq());
            const tags = await API.getTags();
            console.log("API fetching on action", tags);
            dispatch(fetchTagsSuccess(tags));
            } else {
                return;
            }
        } catch (error) {
            dispatch(fetchTagsFailure(error));
        }
    }
    return action
};

export const userLogin = () => ({
    type: TYPES.USER_LOGIN,
});

export const userLogout = () => ({
    type: TYPES.USER_LOGOUT
});
