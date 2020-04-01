const mongo = require('mongoose');
const productSchema = mongo.Schema({

    category: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    image: { type: [{ type: String }], default: 'null' },
    weight: { type: String, default: 'null' },
    created_at: { type: String },
    updated_at: { type: String }

});
module.exports = mongo.model('Product', productSchema);