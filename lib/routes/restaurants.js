const Router = require('express').Router;
const router = Router();
const Restaurant = require('../models/restaurant');

router
    .post('/', (req, res, next) => {
        new Restaurant(req.body).save()
            .then(restaurant => res.json(restaurant))
            . catch(next);
    })

    .get('/', (req, res, next) => {
        Restaurant.find()
            .select('name')
            .then(restaurant => res.json(restaurant))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Restaurant.find(req.query)
            .select('name cuisine')
            .then(restaurant => res.json(restaurant))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Restaurant.findById(req.params.id)
            .then(restaurant => res.json(restaurant))
            .catch(next);
    });


module.exports = router;