/* Dependencies */
var mongoose = require("mongoose"),
  Listing = require("../models/listings.server.model.js");

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial 
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a listing */
exports.create = function(req, res) {
  /* Instantiate a Listing */
  var listing = new Listing(req.body);

  /* Then save the listing */
  listing.save(function(err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  console.log("Read was called. Printing request object");
  // console.log(req);
  res.json(req.listing);
};

/* Update a listing */
exports.update = function(req, res) {
  var listing = req.listing; // the current listing (by middle-ware)
  var updatedListing = req.body;
  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */

  // add additional logic to validate this
  listing.name = updatedListing.name;
  listing.code = updatedListing.code;
  listing.address = updatedListing.address;
  listing.coordinates = updatedListing.coordinates;

  /* Save the article */
  listing.save(function(err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;

  /** TODO **/
  /* Remove the article */
  if (listing) {
    // iff middleware hook can find the listing, then proceed.
    listing.remove(function(err) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(listing);
      }
    });
  } else {
    res.status(400).send("Nothing to delete!");
  }
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /** TODO **/
  /* Your code here */

  Listing.find({}, null, { sort: { code: 1 } }, function(err, listing) {
    if (err) throw err;
    else {
      res.json(listing);
    }
  });
};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if (err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};
