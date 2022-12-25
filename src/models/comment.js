import mongoose from 'mongoose';

const comment = new mongoose.Schema({
        user: String,
        email: String,
        comment: String,
        article_id:{type: mongoose.Types.ObjectId, ref: "blog"},
        date: {
                type: Date, 
                default: () => Date.now()
        }
})


export default mongoose.model('comment', comment);


