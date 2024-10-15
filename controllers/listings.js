const Listing = require("../models/listing");

module.exports.index = async (req,res)=> {
    const allListing= await Listing.find({});
    res.render("listings/index.ejs", {allListing});
};


module.exports.renderNewForm = (req,res)=> {
    res.render("listings/new.ejs");
};


module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({path: "reviews", populate: {path: "author"}})
        .populate("owner");
    if (!listing) {
        req.flash("error", "Scholarship you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing, currUser: req.user });
};

module.exports.createListings = async (req, res, next) => {
    try {
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id; // Assign the logged-in user as the owner
        await newListing.save();
        req.flash("success", "New Scholarship Added!");
        res.redirect("/listings");
    } catch (err) {
        console.error("Error creating listing:", err);
        next(err); // Pass the error to the error handler
    }
};


module.exports.editListings = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Scholarship not found");
    }
    res.render("listings/edit.ejs", { listing });
};


module.exports.updateListings = async (req, res)=> {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Scholarship Updated!");
    res.redirect(`/listings/${id}`);
};


module.exports.loiginListing = async (req, res)=> {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id); // Make sure to delete the listing
    req.flash("success", "Scholarship Deleted!");
    res.redirect("/listings");
}