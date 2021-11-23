const { Schema, model } = require('mongoose')

const SchemaUser = new Schema({

    usuario: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },

    contrasenia: {
        type: String,
        trim: true,
        required: true
    },

    login: {
        type: Boolean,
        default: false
    }

})

const userModel = model('user', SchemaUser)
module.exports = userModel;
