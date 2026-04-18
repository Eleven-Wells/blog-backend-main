import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const startServer = async() => {
    try{
        app.listen(port, () => console.log(`Server listening on port ${port}...`));
    } catch(error: any) {
        console.log(error);
    }
};

startServer();