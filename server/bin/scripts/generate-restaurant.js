const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");
const Restaurant = require("./models/Restaurant");

const PAGE_SIZE = 100; // The number of data you specify for each page

const dataDirectory = 'data';

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory);
}

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/restaurant-rating")
  .then(() => {
    console.log("Mongoose connection successfull!");
    generateRestaurants(0);
  })
  .catch((error) => {
    console.error("Mongoose connection error:", error);
  });

const generateRestaurants = async (skip) => {
  try {
    const restaurants = await Restaurant.find({}).skip(skip).limit(PAGE_SIZE);

    if (restaurants.length > 0) {
      const time = new Date().getTime();
      const fileName = `data/restaurants-${time}.json`;
      const dataToWrite = JSON.stringify(restaurants);

      fs.writeFileSync(fileName, dataToWrite);
      console.log(`The data was successfully saved to a file named ${fileName}.`);
      
      // process the next page
      generateRestaurants(skip + PAGE_SIZE);
    } else {
      console.log("All restaurants processed.");
      // MongoDB connection close
      mongoose.connection.close();
    }
  } catch (err) {
    console.error("Error retrieving data or writing to file:", err);
    
    // MongoDB connection close
    mongoose.connection.close();

    if (err.message.includes('no open file descriptors')) {
      console.error("You may not have permission to open more files. Please check the system configuration.");
    }
  }
};
