const express = require('express');
const Page = require('mongoose').model('Page');
const router = new express.Router();

const password = "pleasedonthackthis";



router.post('/getPagesNamesAndRoutes',(req, res) => {
    const route = decodeURIComponent(req.body.route);
    Page.findOne({route:route}, function(err, page) {
        if (err || !page) return res.status(400).end();
    }).populate('childrensPages').exec(function (err, page) {
        if (err || !page) return res.status(400).end();
        res.status(200).json((page.childrensPages)? page.childrensPages : []);
    });
});

router.post('/getPagesInfo',(req, res) => {
    const route = decodeURIComponent(req.body.route);
    Page.findOne({route:route}, function (err, page) {
        if (err || !page) res.status(400).end();
        else res.status(200).json(page);
    });
});

router.post('/addPage',(req, res) => {
    if (!(decodeURIComponent(req.body.password) == password)) return res.status(400).end();
    const name = decodeURIComponent(req.body.name);
    const route = decodeURIComponent(req.body.route);
    const info = decodeURIComponent(req.body.info);
    const parentsroute = decodeURIComponent(req.body.parentsroute);
    Page.findOne({route: parentsroute}, function (err, page) {
        if (err || !page) res.status(400).end();
        else {
            const newPage = new Page({name:name, route:route, info:info, parentsPage: page});
            newPage.save(function (err) {
                if (err) res.status(400).end();
                else res.status(200).end();
            });
        }
    });

});

router.post('/modifyPage',(req, res) => {
    if (!(decodeURIComponent(req.body.password) == password)) return res.status(400).end();
    const name = decodeURIComponent(req.body.name);
    const route = decodeURIComponent(req.body.route);
    const info = decodeURIComponent(req.body.info);
    Page.findOne({route:route}, function (err, page) {
        if (err || !page) res.status(400).end();
        else {
            page.route = route;
            page.name = name;
            page.info = info;
            page.save(function (err) {
                if (err) res.status(400).end();
                res.status(200).end();
            });
        }
    });
});

router.post('/removePage',(req, res) => {
    if (!(decodeURIComponent(req.body.password) == password)) return res.status(400).end();
    const route = decodeURIComponent(req.body.route);
    Page.findOne({route:route}, function (err, page) {
        if (err || !page) return res.status(400).end();
    }).remove(function (err) {
        if (err) res.status(400).end();
        else res.status(200).end();
    });
});

module.exports = router;
