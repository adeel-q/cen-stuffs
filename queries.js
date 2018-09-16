/* Fill out these functions using Mongoose queries*/
var Listing = require('./ListingSchema.js'),
    mongoose = require('mongoose'),
    config = require('./config.js');


/* Connect to your database */
mongoose.connect(config.db.uri);

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
    Listing.find({ name: 'Library West' }, function (err, listing) {
        if (err) throw err;
        console.log(listing);
    })
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
    Listing.find({ code: 'CABL' }, function (err, listing) {
        if (err) throw err;
        console.log(listing);
        /*listing.remove(function (err) {
            if (err) throw err;
            console.log('Entry deleted');
        });*/
    });
    Listing.remove({ code: 'CABL' }, function (err) {
        if (err) throw err;
    });
    console.log('entry removed');
};
var updatePhelpsLab = function() {
  /*
    Phelps Laboratory's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
    Listing.find({code: 'PHL' }, function (err, listings) {
        if (err) throw err;
        for (var i = 0; i < listings.length; i++) {
            listings[i].address = '100 Phelps Lab, Gainesville, FL 32603, United States';
            listings[i].save(function (err) {
                if (err) throw err;
                console.log('entry updated');
            });
        };
        console.log(listings);
    });
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
    Listing.find({}, function (err, listing) {
        if (err) throw err;
        console.log(listing);
    });
};

findLibraryWest();
//removeCable();
//updatePhelpsLab();
//retrieveAllListings();
