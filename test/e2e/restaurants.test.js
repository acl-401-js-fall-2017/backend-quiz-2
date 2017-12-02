const request = require('./request');
const mongoose = require('mongoose');
const assert = require('chai').assert;

describe('restaurants API', () => {
    
    beforeEach(() => mongoose.connection.dropDatabase());

    const beauThai = {
        name: 'Beau Thai',
        address: {
            street: '730 NW 21st Ave',
            city: 'Portland'
        },
        cuisine: 'asian',
        review: []
    };

    it('saves with id', () => {
        return request.post('/api/restaurants')
            .send(beauThai)
            .then(res => {
                const restaurant = res.body;
                assert.ok(restaurant._id);
                assert.equal(restaurant.name, beauThai.name);
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
});