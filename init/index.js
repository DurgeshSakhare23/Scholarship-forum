const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/test";

main()
    .then(() => {
        console.log("Connected to DB");
        return initDB(); // Initialize the database after connecting
    })
    .catch((err) => {
        console.error(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    const listingsWithOwner = initdata.data.map((obj) => ({
        ...obj,
        owner: '6705315406a64506ebc9992e',
    }));
    await Listing.insertMany(listingsWithOwner);
    console.log("Data was initialized");
};


initDB();