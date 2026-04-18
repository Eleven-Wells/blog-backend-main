import express from "express";
import logger from "./services/logger.service";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const startServer = async() => {
    try{
        app.listen(port, () => logger.info(`Server listening on port ${port}...`));
    } catch(error: any) {
        console.log(error);
    }
};

startServer();