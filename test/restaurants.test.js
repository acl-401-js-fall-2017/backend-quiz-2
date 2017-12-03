const request = require('./request');
const mongoose = require('mongoose');
const assert = require('chai').assert;

describe('Restaurants API', () => {
    
    beforeEach(() => mongoose.connection.dropDatabase());

    const bambooSushi = {
        name: 'bamboo',
        cuisine: 'asian',
        reviews: [{
            rating: 5,
            comments: 'very fresh',
            email: 'kate@me.com'
        }]
    };


    it('saves a restaurant', () => {
        return request.post('/api/restaurants')
            .send(bambooSushi)
            .then(res => res.body)
            .then(Restaurant =>  {
                assert.deepEqual(Restaurant.name, bambooSushi.name);
            });
    });
});