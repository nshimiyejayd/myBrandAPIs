import app from "./index.js"
import dotenv from "dotenv";
dotenv.config({ config: process.env.NODE_ENV === 'dev' });
const port = process.env.PORT

app.listen(port, () =>{
    console.log(`Server has started on port: ${port}`);
})