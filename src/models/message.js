import mongoose from 'mongoose';

const message = new mongoose.Schema({
        userName: String,
        email: String,
        message: String,
        article_id: String,
        date: {
                type: Date, 
                default: () => Date.now()
        }
});

export default mongoose.model('message', message);


