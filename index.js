import express  from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import routes from "./src/routes/routes.js";
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs'

dotenv.config({ config: process.env.NODE_ENV === 'dev' });
const db = process.env.NODE_ENV === "test" ? "my_brand_db_test" : "my-brand-db";
const url = `mongodb://localhost/${db}`;

const app = express();
const port = process.env.PORT

app.use(express.json());
app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({extended: true}));

app.use('/image',express.static('upload/images'));

app.use('/api/v1', routes);

// Connect to database

mongoose.set('strictQuery', false);
mongoose.connect(url, {useNewUrlParser: true});
const con = mongoose.connection

const swaggerJsDoc = YAML.load('./api.yaml');
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc))


export default app;


