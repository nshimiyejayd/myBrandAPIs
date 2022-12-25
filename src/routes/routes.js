import {Router} from 'express';
import saveImage from '../upload/saveImage.js';
import Controllers from "../controllers/articleController.js";
import passport from 'passport';
import '../middleware/auth.js';
import Message from '../controllers/messageContriller.js'
import validateSignUp from "../middleware/validations/signUp.js"
import validateArticle from '../middleware/validations/articleValidate.js';
import signUp from '../middleware/sinUp.js'
import validateSignInSchema from '../middleware/validations/signIn.js'
import signIn from '../middleware/signIn.js';
import isArticleExist from '../middleware/articleExist.js'
import "../middleware/auth.js";
import commentController from "../controllers/commentConroller.js"
import commentValidate from "../middleware/validations/commentValidate.js"
import SendMessage from "../controllers/messageContriller.js";
import validateMessage from "../middleware/validations/messageValidate.js"
import isUserExist from '../middleware/isUserExist.js'
import dotenv from "dotenv";
dotenv.config();

const router = Router();

const readMessage = new Message();
const articleController = new Controllers();
const addCommentController = new commentController();
const sendMessage = new SendMessage();

router.get('/blogs', articleController.getArticles);

router.get('/blogs/:id', articleController.getSingleArticle);

router.post('/blogs/:id/comments', commentValidate, addCommentController.addComment);

router.get('/blogs/:id/likes', articleController.getLikesPerBlog);

router.post('/blogs/:id/likes', articleController.addLike);

router.post('/messages', validateMessage, sendMessage.sendMessage);

router.get('/messages', passport.authenticate('jwt', { session: false }), 
            readMessage.readMessage);

router.get('/search', articleController.searchArticle)

router.post('/signup', [ validateSignUp, isUserExist,
            passport.authenticate('signup', { session: false }), 
            signUp]);

router.post('/login',validateSignInSchema, signIn);

// Add an article 
router.post('/blogs', [ passport.authenticate('jwt', { session: false }), 
            saveImage.single('image'),isArticleExist, validateArticle], 
            articleController.CreateArticle);

// Delete an article

router.delete('/blogs/:id',[passport.authenticate('jwt', { session: false })], 
articleController.deleteArticle);

// update article

router.patch('/blogs/:id',  [ passport.authenticate('jwt', { session: false }), 
                saveImage.single('image'), 
                validateArticle], 
                articleController.updateArticle);


export default router;