import mongoose from 'mongoose';

const blog = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    comments: Array,
    likes: Number,
    date: {
        type: Date, 
        default: () => Date.now()
}
});

export default mongoose.model('blog', blog);