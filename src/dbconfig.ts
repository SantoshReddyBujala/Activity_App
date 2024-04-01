const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect("mongodb+srv://bujalasanthoshreddy:uV99kY61vSEuSFXP@cluster0.9h3ljtz.mongodb.net/activity_app?retryWrites=true&w=majority&appName=Cluster0");
        if (connection) {
            console.log('Connection established');
        }
    } catch (err) {
        console.error(err);
    }
};


export default connectDB;