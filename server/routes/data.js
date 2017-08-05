const express = require('express');
const Page = require('mongoose').model('Page');
const router = new express.Router();

const password = "pleasedonthackthis";



router.post('/getPagesNamesAndRoutes',(req, res) => {
    const route = req.body.route;
    Page.findOne({route:route}, function(err, page) {
        if (err || !page) return res.status(400).end();
    }).populate('childrensPages').populate({path: 'parentsPage', populate: {path:'childrensPages'}})
        .exec(function (err, page) {
        if (err || !page) return res.status(400).end();
        var pages = (page.childrensPages)? page.childrensPages : [];
        if (pages.length == 0) return res.status(200).json(page.parentsPage.childrensPages);
        else return res.status(200).json(pages);
    });
});

router.post('/getPagesInfo',(req, res) => {
    const route = req.body.route;
    Page.findOne({route:route}, function (err, page) {
        if (err || !page) return res.status(400).end();
        else return res.status(200).json(page);
    });
});

router.post('/addPage',(req, res) => {
    if (!(req.body.password == password)) return res.status(400).end();
    const name = req.body.name;
    const route = req.body.route;
    const info = req.body.info;
    const parentsroute = req.body.parentsroute;
    Page.findOne({route: parentsroute}, function (err, page) {
        if (err || !page) return res.status(400).end();
        else {
            const newPage = new Page({name:name, route:route, info:info, parentsPage: page});
            newPage.save(function (err) {
                if (err) return res.status(400).end();
                else return res.status(200).end();
            });
        }
    });

});

router.post('/modifyPage',(req, res) => {
    if (!(req.body.password == password)) return res.status(400).end();
    const name = req.body.name;
    const route = req.body.route;
    const info = req.body.info;
    const id = req.body.id;
    Page.findById(id, function (err, page) {
        if (err || !page) return res.status(400).end();
        else {
            page.route = route;
            page.name = name;
            page.info = info;
            page.save(function (err) {
                if (err) return res.status(400).end();
                return res.status(200).end();
            });
        }
    });
});

router.post('/removePage',(req, res) => {
    if (!(req.body.password == password)) return res.status(400).end();
    const id = req.body.id;
    Page.findById(id, function (err, page) {
        if (err || !page) return res.status(400).end();
    }).remove(function (err) {
        if (err) return res.status(400).end();
        else return res.status(200).end();
    });
});

module.exports = router;
