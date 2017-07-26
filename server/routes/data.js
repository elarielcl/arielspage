const express = require('express');
const Auxiliar = require('mongoose').model('Auxiliar');
const router = new express.Router();

const password = "pleasedonthackthis";


router.get('/getAuxiliarsNamesAndRoutes',(req, res) => {
    Auxiliar.find({},"name route", function(err, auxiliars) {
        if (err || !auxiliars) res.status(400).end();
        else res.status(200).json(auxiliars);
    });
});

router.post('/getAuxiliarsInfo',(req, res) => {
    const route = req.body.route;
    Auxiliar.findOne({route:route}, 'info', function (err, auxiliar) {
        if (err || !auxiliar) res.status(400).end();
        else res.status(200).json(auxiliar);
    })
});

router.post('/addAuxiliar',(req, res) => {
    if (!(req.body.password == password)) return res.status(400).end();
    const name = req.body.name;
    const route = req.body.route;
    const info = req.body.info;
    const newAux = new Auxiliar({name:name, route:route, info:info});
    newAux.save(function (err) {
        if (err) res.status(400).end();
        res.status(200).end();
    });
});









module.exports = router;
