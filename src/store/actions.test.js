import * as TYPES from './types';  
import * as actions from './actions';

describe('Acción síncrona.', () => {
  test('Debe crear una acción USER_LOGIN con éxito.', () => {
    const success = true;
    const expectedAction = {
      type: TYPES.USER_LOGIN,
      success,
    };
    expect(actions.loginUser(success)).toEqual(expectedAction);
  });
});

describe('Acción asíncrona.', ()=> {
  test('Debe despachar las acciones FETCH_ADS_REQUEST y FETCH_ADS_SUCCESS', async ()=> {
    const ads = [
      {
        _id: '5e4af71d3976de16b4d34276',
        name: 'Alfa Romeo',
        price: 1500,
        description: 'Lo vendo, baratito baratito pisha',
        type: 'sell',
        photo: 'https://cdn.pixabay.com/photo/2020/02/24/06/15/castle-4875322__340.jpg',
      },
      {
        _id: '5e4c3b443976de16b4d34287',
        name: 'Fallout New Vegas 2',
        price: 10,
        description: 'PS3 version',
        type: 'buy',
        photo: 'https://upload.wikimedia.org/wikipedia/en/3/34/Fallout_New_Vegas.jpg',
      },
    ];
  
    let query = "";
    const fetch = actions.fetchAds(query);
    const dispatch = jest.fn();
    const getState = jest.fn();
    const api = {fetchAds: jest.fn()}
    api.fetchAds.mockResolvedValue(ads);
    await fetch(dispatch, getState, api);
    expect(dispatch).toHaveBeenNthCalledWith(1, actions.fetchAdsReq());
    expect(api.fetchAds).toHaveBeenCalled();
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.fetchAdsSuccess());
  });
});
