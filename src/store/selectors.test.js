import * as selector from './selectors';

describe('Selectors.', () => {
  test('El selector getAds debe devolver los anuncios', ()=> {
    const initialState = {
      ads: [
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
      ],
    };
    const ads = selector.getAds(initialState);
    expect(ads).toEqual(initialState.ads);
  });
});
