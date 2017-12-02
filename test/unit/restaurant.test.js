const { assert } = require('chai');
const Restaurant = require('../lib/models/restaurant'); 

describe('Restaurant Model', () => {
    
    it('valid model', () => {
        const restaurant = new Restaurant({
            name: 'Beau Thai',
            address: {
                street: '730 NW 21st Ave',
                city: 'Portland'
            },
            cuisine: 'asian'
        
        });

        assert.equal(restaurant.validateSync(), undefined);
    });

    it('required fields', () => {
        const restaurant = new Restaurant({});
        const { errors } = restaurant.validateSync();
        assert.equal(errors['name'].kind, 'required');
        assert.equal(errors['cuisine'].kind, 'required');
    });

    it('cuisine must be valid', () => {
        const restaurant = new Restaurant({
            cuisine: 'mexican'
        });
        const { errors } = restaurant.validateSync();
        assert.equal(errors['restaurant.cuisine'].kind, 'enum');
    });


});