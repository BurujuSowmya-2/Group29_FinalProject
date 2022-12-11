const mongoose = require('mongoose');

const dietPlanSchema = new mongoose.Schema({

    Calories: Number,
    Category:  {   type: String,
    enum: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Normal']},
    picture : String
});


module.exports = mongoose.model('dietPlan', dietPlanSchema);