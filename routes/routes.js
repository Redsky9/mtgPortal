let $ = require('../util/util.js');
let dummy = require('../assets/json/dummyCards.json');
let autocomplete = require('../assets/json/allCardNames.json');
let latest_sets = require('../assets/json/latestSets.json');
let sets = [];
let bP = require('body-parser');
let qs = require('qs');
let math = require('mathjs');
let compression = require('compression');
let cards;
let currentPage = 1;

module.exports = (app) => {

    app.use(bP.urlencoded({extended: true}));
    app.use(bP.json());
    app.use(compression());

// ===== GET =====
    app.get('/', (req, res, next) => {
        $.setDefaultRedirect(req, res, next);
        sets = $.getAllSets();
        res.render('homepage.ejs', {sets: sets, latestSets: latest_sets, aaa: autocomplete, currentPage: -1, searchParams: {}, pageLimit: -1});
    });

    app.get('/auto', (req, res) => {
        res.send(autocomplete);
    });

    app.get('/cards/:id', async function(req, res) {
        let card = await $.getCardById(req.params.id);
        let setCards = await $.getCardBySet([], card[0].editions[0].set_id);
        res.locals.get = function() {
            var args = Array.prototype.slice.call(arguments, 0);
            var path = args[0].split('.');
            var root = this;
            for (var i = 0; i < path.length; i++) {
                if(root[path[i]] === void 0) {
                    return args[1]?args[1]:null;
                } else {
                    root = root[path[i]];
                }
            };
            console.log(root);
            return root;
        }
        res.render('details.ejs', {sets: sets, aaa: autocomplete, card: card[0], setCards: setCards});
    });

    app.get('/set/:id?', async function(req, res) {
        let setId = req.params.id.toUpperCase();
        if(Object.keys(req.query).length == 0){
            res.redirect('/set/' + setId + '?page=1');
            return;
        }
        let setCards = await $.getCardBySet([], setId);

        currentPage = req.query.page;
        delete req.query['page'];
        let searchParams = ("set/" + setId + "?");
        let pageLimit = setCards.length / 30;
        let pageCards = [];

        let limit = (setCards.length < (currentPage * 30) ? setCards.length : (currentPage * 30));
        for(let i = ((currentPage - 1) * 30); i < limit; i++){
            pageCards.push(setCards[i]);
        }
        res.render('index.ejs', {sets: sets, cards: pageCards, currentPage: currentPage, searchParams: searchParams, pageLimit: math.ceil(pageLimit)});
    });    

    app.get('/search?', (req, res) => {
        if(Object.keys(req.query).length == 2 && Object.keys(req.query)[0] == 'set'){
            res.redirect('/set/' + req.query.set + '?page=1');
            return;
        }
        currentPage = req.query.page;
        delete req.query['page'];
        let searchParams = ("search?&" + qs.stringify(req.query) + "&");
        let pageLimit = cards.length / 30;
        let pageCards = [];

        let limit = (cards.length < (currentPage * 30) ? cards.length : (currentPage * 30));
        for(let i = ((currentPage - 1) * 30); i < limit; i++){
            pageCards.push(cards[i]);
        }
        res.render('index.ejs', {sets: sets, cards: pageCards, currentPage: currentPage, searchParams: searchParams, pageLimit: math.ceil(pageLimit) });
    });


// ===== POST =====
    app.post('/', (req, res) => {
        let data = req.body;
        let final = {};
        for(let item in data){
            if(data[item] !== '' && data[item][0] !== ''){
                final[item] = data[item];
            }
        }
        cards = $.findCards(req.body);
        res.redirect('/search?' + qs.stringify(final) + '&page=1');
    });

};