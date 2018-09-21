"use strict";
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require("fs"),
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  Listing = require("./ListingSchema.js"),
  config = require("./config");

/* Connect to your database */
mongoose.connect(
  config.db.uri,
  { useNewUrlParser: true }
);

var db = mongoose.connection; // Get a handle to the database connection object
db.on("error", console.error.bind(console, "connection error:")); // From mongoose documentation

// use db.once('open')
db.once("open", function() {
  /* 
      Instantiate a mongoose model for each listing object in the JSON file, 
      and then save it to your Mongo database 
    */
  var data = fs.readFileSync("listings.json").toString();
  var listingData = JSON.parse(data);

  /* Create an array of Promise objects to store each "save" promise */
  var promisesArr = [];

  /* Go through all the listings.json objects and create mongo model objects and save them */
  for (var i = 0; i < listingData.entries.length; i++) {
    var newEntry = new Listing(listingData.entries[i]);

    //console.log(newEntry);

    var entryPromise = newEntry
      .save()
      .then(function callback(entry) {
        console.log("Saved entry " + entry.name);
      })
      .catch(function err_callback(err) {
        console.log(err);
      });
    promisesArr.push(entryPromise);
  }

  /* Once all promises are resolved, close mongoose connection */
  Promise.all(promisesArr)
    .then(function(test) {
      console.log("Finished saving all entries.");
      mongoose.connection.close();
    })
    .catch(function err_callback2(err) {
      console.log(err);
    });
});

console.log("End of script."); // Will be run async.

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */
