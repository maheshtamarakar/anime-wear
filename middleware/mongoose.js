/* eslint-disable no-undef */
import mongoose from 'mongoose';

const connectDb = async (handler) => {
    if(mongoose.connection[0].readyState){
        return handler(req, res)
    }
    await mongoose.connection(process.env.MONGO_URI)
    return handler(req, res)
}

export default connectDb;