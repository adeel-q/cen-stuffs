/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
    /* open listings.json and create the Schema such that the object fields match */
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    address: String,
    updated_at: Date,
    created_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
listingSchema.pre('save', function(next) {
    /*  Before saving to database, check each Listing model and make sure the updated_at or created_at fields are correctly populated */
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;