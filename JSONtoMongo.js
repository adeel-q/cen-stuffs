'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
var data = fs.readFileSync('listings.json').toString();
var listingData = JSON.parse(data);

/* Go through all the listings.json objects and create a mongo model objects and save them */
for(var i=0; i<listingData.entries.length; i++) {
    var newEntry = new Listing(listingData.entries[i]);
    console.log(newEntry);
    newEntry.save(function(err) {
        if (err) throw err;
        console.log('entry added');
    });
};
console.log('done');

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */