const Product = require('../models/Product');
const moment = require('moment');

async function newProduct(req, res) {

    let { title, description, price, stock, discount, weight, category } = req.body;

    let created_at = moment().unix();

    let product = new Product({
        category,
        title,
        description,
        price,
        stock,
        discount,
        created_at,
        updated_at: created_at,
        weight
    });

    try {

        let newProduct = await product.save();

        newProduct ? res.status(200).send({ product: newProduct })
            : res.status(400).send({ message: 'Product not created' });

        return;

    } catch (error) {


        error.code == 11000 ? res.status(201).send({ field_duplicated: error.keyValue, message: error.errmsg }) : null;

        return;

    }

}


async function getProduct(req, res) {

    let category = req.params.category;

    let regex = RegExp(category, 'i');

    try {

        let product = await Product.find({ category: regex })
                                   .select('title description price category weight');

        let products = await Product.find()
                                    .select('title description price category weight');

        category ?  product ? res.status(200).send({ products: product }) :
                    res.status(400).send({ message: 'Product not created' }) 
                 : res.status(200).send({products});

        return;

    } catch (error) {

        console.log(error);

    }

}

module.exports = {
    newProduct,
    getProduct
}