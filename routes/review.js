const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../models/schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isReviewAuthor, isLoggedIn } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

// Reviews

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

// post route
router.post("/",
    isLoggedIn,
    validateReview, wrapAsync(reviewController.createReview)
);

// Delete Route review

router.delete("/:reviewId", 
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview),
);


module.exports = router;