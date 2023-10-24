const router = require('express').Router();
const paypal = require('paypal-rest-sdk'); // paypal library
const paypalConfig = require('../config/paypal'); // import config paypal

// take "paypal config" and use in configure"
paypal.configure(paypalConfig);

const { products } = require("../config/products.json");

// return initial page and send products
router.get('/', (req, res) => res.render('index', { products }));

// redirect to paypal router, when client buy item
router.post('/buy', (req, res) => {

    const productID = req.query.id; // save product id on this variable
    const product = products.reduce((all, item) => item.id === product ? product : all, {}); // resgate product
    if (!product.id) return res.render('index', { products });

    //building cart
    const cart = [{
        "name": product.title,
        "sku": product.id,
        "price": product.price.toFixed(2),
        "currency": "BRL",
        "quantity": 1
    }];

    const price = { "currency": "BRL", "total": product.price.toFixed(2) };
    const description = product.description;

    const json_payment = {
        "intent": "sale",
        "prayer": { payment_method: "paypal" },
        "redirect_urls": {
            "return-url": "https://localhost:3000/success",
            "cancel-url": "https://localhost:3000/cancel"
        },
        "transactions":[{
            "item_list": {"items": cart},
            "amount": price,
            "description": description
        }]
    };


    // when the client click to buy

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