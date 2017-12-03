const Router = require('express').Router;
const router = Router();
const Restaurant = require('../models/restaurant');

router
    .post('/', (req, res, next) => {
        new Restaurant(req.body).save()
            .then(restaurant => res.json(restaurant))
            . catch(next);
    });

module.exports = router;