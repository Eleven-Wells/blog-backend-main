import express from "express";
import logger from "./services/logger.service";
import config from "./config/environments";
import connectDB from "./config/db";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const startServer = async() => {
    try{
        await connectDB();
        app.listen(config.PORT, () => logger.info(`Server listening on port ${port}...`));
    } catch(error: any) {
        console.log(error);
    }
};

startServer();