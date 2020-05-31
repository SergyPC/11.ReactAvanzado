import * as TYPES from './types';
import * as reducers from './reducers';

describe('Reducers testing', ()=> {
    let initialState = {
        tags: [], 
    };
    const tags = ['lifestyle', 'mobile', 'motor', 'work'];
    test('Debe implementar una acción FETCH_TAGS_SUCCESS', ()=> {
        const action = {
            type: TYPES.FETCH_TAGS_SUCCESS,
            tags
        }
        const expectedState = tags;
        expect(reducers.tags(initialState.tags, action)).toEqual(expectedState);
    });
});
