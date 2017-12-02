const request = require('./request');
const mongoose = require('mongoose');
const assert = require('chai').assert;

describe('restaurants API', () => {
    
    beforeEach(() => mongoose.connection.dropDatabase());

    const rawData = [
        {
            name: 'Beau Thai',
            address: {
                street: '730 NW 21st Ave',
                city: 'Portland'
            },
            cuisine: 'asian',
            review: []
        },
        {
            name: 'Muu-Muu\'s',
            address: {
                street: '730 NW 21st Ave',
                city: 'Portland'
            },
            cuisine: 'other',
            review: []
        }
    ];

    it('posts two restaurants', () => {
        rawData.forEach((x) => {
            return request.post('/api/restaurants')
                .send(rawData[x])
                .then(res => {
                    const restaurant = res.body;
                    assert.ok(restaurant._id);
                    assert.equal(restaurant.name, rawData[x].name);
                });});
    });

    it('saves with id', () => {
        return request.post('/api/restaurants')
            .send(rawData[0])
            .then(res => {
                const restaurant = res.body;
                assert.ok(restaurant._id);
                assert.equal(restaurant.name, rawData[0].name);
            });
    });

    it('fails on save with validation errors', () => {
        return request.post('/api/restaurants')
            .send({})
            .then(
                () => { throw new Error('Unexpected successful response'); },
                err => {
                    assert.equal(err.status, 400);    
                    const body = err.response.body;
                    assert.ok(Object.keys(body.errors).length);
                }
            );
    });

    it('gets all restaurants', () => {
        

        const posts = [rawData[0], rawData[1]].map(restaurant => {
            return request.post('/api/restaurants')
                .send(restaurant)
                .then(res => res.body);
        });

        let saved = null;
        return Promise.all(posts)
            .then(_saved => {
                saved = _saved;
                return request.get('/api/restaurants');
            })
            .then(res => {
                assert.deepEqual(res.body, saved);
            });
    });

    it('get by id', () => {
        let restaurant = null;
        return request.post('/api/restaurants')
            .send(rawData[0])
            .then(res => {
                restaurant = res.body;
                return request.get(`/api/restaurants/${restaurant._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, restaurant);
            });
    });

    it('get by id returns 404 for bad id', () => {
        return request.get('/api/restaurants/26adcfec161bf7beacd93ce2')
            .then(
                () => { throw new Error('Unexpected successful response'); },
                err => {
                    assert.equal(err.status, 404);    
                }
            );
    });
});