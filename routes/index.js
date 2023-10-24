const router = require('express').Router();
const paypal = require('paypal-rest-sdk'); // paypal library
const paypalConfig = require('../config/paypal'); // import config paypal

// take "paypal config" and use in configure"
paypal.configure(paypalConfig);

const {products} = require("../config/products.json");

// return initial page and send products
router.get('/', (req, res) => res.render('index', { products }));

// redirect to paypal router, when client buy item
router.post('/buy', (req, res) => {
    // when the client click to buy
    res.send('success');
});

router.get('/success', (req, res) => {
    // when the client pays successfully
    res.render('success');
})

router.get('/cancel', (req, res) => {
    // when the client cancels the purchase
    res.render('cancel');
})

module.exports = router;