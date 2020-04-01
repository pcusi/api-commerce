const mongo = require('mongoose');
const userSchema = mongo.Schema({

    email: { type: String, unique: true },
    password: { type: String },
    created_at: { type: String },
    photo: { type: [{ type: String }], default: 'null' }

});
module.exports = mongo.model('User', userSchema);