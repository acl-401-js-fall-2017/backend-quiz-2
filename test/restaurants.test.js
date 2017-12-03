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

    const kensArtisanPizza = {
        name: 'kens',
        cuisine: 'northwest',
        reviews: [{
            rating: 4,
            comments: 'just like I had in Napoli',
            email: 'tav@me.com'
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
    
    it('gets all restaurants', () => {
        const allRestaurants = [bambooSushi, kensArtisanPizza];
        return Promise.all(allRestaurants.map(restaurant => {
            return request.post('/api/restaurants')
                .send(restaurant)
                .then(res => res.body);
        }))
            .then(() => {
                return request.get('/api/restaurants')
                    .then(restaurants => {
                        assert.deepEqual(restaurants.body.length, 2);
                    });
            });
        
    });
});
