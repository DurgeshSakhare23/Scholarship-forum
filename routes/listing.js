const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../models/schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

// validate listing
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post( isLoggedIn,validateListing,
        wrapAsync(listingController.createListings)
    );

    
//new ROute
router.get("/new", isLoggedIn,listingController.renderNewForm);

router
    .route("/:id")
    .get( 
        wrapAsync(listingController.showListings)
    )
    .put( 
        isLoggedIn,
        validateListing,
        wrapAsync(listingController.updateListings)
    )
    .delete(
        isLoggedIn,
        wrapAsync(listingController.loiginListing)
    );



// Edit route
router.get("/:id/edit",
    isLoggedIn,
    wrapAsync(listingController.editListings)
);

module.exports = router;