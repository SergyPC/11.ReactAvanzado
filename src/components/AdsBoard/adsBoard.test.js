import React from 'react';
import { shallow } from 'enzyme';
import AdsBoard from './AdsBoard';

describe('Snapshot testing.', ()=> {
    const props = {
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
        tags: ['lifestyle', 'mobile', 'motor', 'work'],
        user: true,
        fetchAds: jest.fn(),
        getUserFromStorage: jest.fn(),
        fetchTags: jest.fn(),
    };

    let wrapper;

    beforeEach(()=> {
        wrapper = shallow(<AdsBoard {...props} />);
    });

    test("Renderizado de componentes", ()=> {
        expect(wrapper.exists('AdList')).toBe(true)
    });

    test("Debe renderizar una lista de anuncios", ()=> {
        //expect(wrapper.find('AdList').props().ads).toEqual(props.ads);
        expect(wrapper.find('AdList').props().ads).toHaveLength(2); //props.ads.length
    });

    test('Snapshot de AdsBoard', ()=> {
        expect(wrapper).toMatchSnapshot();
    });

});