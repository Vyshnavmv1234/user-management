import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/manage");
       console.log("mongodb connected")
    } catch (error) {
        console.log(error)

    }
}

export default connectDB; 