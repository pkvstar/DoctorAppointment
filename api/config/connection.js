const mongoose = require('mongoose');

const connection = async () => {
    await mongoose.connect("mongodb://localhost:27017/DoctorAppointment")
    console.log("Connected to MongoDB");
}

module.exports = connection;
