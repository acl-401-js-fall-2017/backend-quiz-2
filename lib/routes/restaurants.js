const Router = require('express').Router;
const router = Router();
const Restaurant = require('../models/restaurant');

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
    });