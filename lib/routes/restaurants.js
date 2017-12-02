const Router = require('express').Router;
const router = Router();
const Restaurant = require('../models/restaurant');
const Review = require('../models/review');

router
    .post('/', (req, res) => {
        new Restaurant(req.body).save()
            .then(restaurant => res.json(restaurant))
            .catch(err => {
                res.statusCode = 400;
                res.json({
                    errors: err.errors
                });
            });
    })
    .post('/:id/reviews', (req, res) => {
        Restaurant.findById(req.params.id)
            .then(restaurant => {
                if(!restaurant) {
                    res.statusCode = 404;
                    res.send(`id ${req.params.id} does not exist`);
                }
                else {
                    new Review(req.body).save()
                        .then(review => res.json(review))
                        .catch(err => {
                            res.statusCode = 400;
                            res.json({
                                errors: err.errors
                            });
                        });
                }
            });
    })
    .get('/', (req, res) => {
        Restaurant.find()
            .then(restaurants => res.json(restaurants));
    })
    .get('/:id', (req, res) => {
        Restaurant.findById(req.params.id)
            .then(restaurant => {
                if(!restaurant) {
                    res.statusCode = 404;
                    res.send(`id ${req.params.id} does not exist`);
                }
                else res.json(restaurant);
            });
    })
    
;