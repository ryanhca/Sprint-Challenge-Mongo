const mongoose = require('mongoose');

const CategorySchema= new mongoose.Schmea({
    title: {
        type:String,
        required:true
    }
});

module.exports =mongoose.model('Cateogry', CategorySchema);