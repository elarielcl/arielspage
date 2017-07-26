const mongoose = require('mongoose');

// define the Auxiliar model schema
const AuxiliarSchema = new mongoose.Schema({
    name: String,
    route: {
        type: String,
        index: { unique: true }
    },
    info: String,
});

module.exports = mongoose.model('Auxiliar', AuxiliarSchema);