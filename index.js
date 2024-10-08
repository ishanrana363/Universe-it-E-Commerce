const app = require("./app");
require("dotenv").config();

const connectDB = require("./db");

const port = process.env.PORT||3000;

app.listen(port,()=>{
    console.log(`server run successfully at http://localhost:${port}`);
    connectDB();
});