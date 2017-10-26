let $ = require('../util/util.js');
let dummy = require('../assets/json/dummyCards.json');
let autocomplete = require('../assets/json/allCardNames.json');
let sets = [];
let bP = require('body-parser');
let qs = require('qs');
let cards;
let currentPage = 1;

module.exports = (app) => {

    app.use(bP.urlencoded({extended: true}));
    app.use(bP.json());
// ===== GET =====
    app.get('/', (req, res) => {
        sets = $.getAllSets();
        res.render('index.ejs', {sets: sets, cards: dummy, aaa: autocomplete, currentPage: -1});
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

    app.get('/page=:id', (req, res) => {
        currentPage = req.params.id;
        let pageNumber = cards.length / 30;
        let pageCards = [];

        let limit = (cards.length < ((+currentPage + 1) * 30) ? cards.length : ((+currentPage + 1) * 30));
        for(let i = (currentPage * 30); i < limit; i++){
            pageCards.push(cards[i]);
        }
        console.log(cards.length);
        res.render('index.ejs', {sets: sets, cards: pageCards, currentPage: currentPage});
    });

// ===== POST =====
    app.post('/', (req, res) => {
        cards = $.findCards(req.body);
        console.log(qs.stringify(req.body, { a: null, b: undefined }));
        // let pageNumber = cards.length / 30;
        // let pageData = [];
        // for(let i = (currentPage * 30); i <  ((currentPage + 1) * 30); i++){
        //     pageData.push(cards[i]);
        // }
        // console.log(pageData.length);
        // res.render('index.ejs', {sets: sets, cards: cards});
        // currentPage = 0;
        // res.redirect('/page=0');
        res.redirect('/page=0');
    });

};