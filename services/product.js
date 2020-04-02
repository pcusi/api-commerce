const Product = require('../models/Product');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

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

        category ? product ? res.status(200).send({ products: product }) :
            res.status(400).send({ message: 'Product not created' })
            : res.status(200).send({ products });

        return;

    } catch (error) {

        res.status(500).send({ message: 'Something happens', error });

        return;

    }

}

function productImage(req, res) {

    let id = req.params.id;
    let fileName = 'No subido...';

    if (req.files) {

        const image = req.files.image.path;

        const imageSplit = image.split('.');

        const fileExt = imageSplit[1];

        //get the filename from the request
        fileName = imageSplit.join('.');

        if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'gif') {
            Product.findByIdAndUpdate(id, { image: fileName }, { new: true }, (err, product) => {
                if (!product) {

                    removeFiles(res, image, 'removed');

                } else {
                    res.status(200).send({ user: product });
                }
            })
        } else {
            res.status(200).send({ message: 'Extensión del archivo no válida' });
        }

    } else {

        removeFiles(res, req.files, 'removed');

    }

}

function removeFiles(res, image, message) {
    fs.unlink(image, (err) => {
        return res.status(200).send({ message: message, err });
    })
}

function getImageFile(req, res) {

    const image = req.params.image;

    const pathFile = './products/' + image;
    fs.exists(pathFile, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(200).send({ message: 'No existe la imagen...' });
        }
    })
}

module.exports = {
    newProduct,
    getProduct,
    productImage,
    getImageFile
}