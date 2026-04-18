import dotenv from "dotenv";
import { mkdir } from "fs/promises";
import path from "path";
import { createLogger, format, level, transports} from "winston";
const { printf, json, combine, colorize, timestamp} = format;

dotenv.config();
const environment = process.env.APP_ENV;

const createLoggerFolder = async() => {
    try{
        await mkdir(path.join(__dirname, '../logs'), {recursive: true});
    } catch(error: any) {
        throw new Error(error);
    };
};

if(environment === 'production') {
    createLoggerFolder();
};


const loggerFormat = printf(({ timestamp, level, message }) => {
    return `${timestamp} [ ${level} ] : ${message}`;
});

const logger = createLogger({
    level: environment === 'development' ? 'debug' : 'info',
    format: combine(timestamp(), environment === 'development' ? combine(colorize(), loggerFormat) : json()),
    transports: environment === 'development' ? [ new transports.Console() ] : [ 
        new transports.Console(),
        new transports.File({ filename: path.join(__dirname, '../logs/combined.log')}),
        new transports.File({ filename: path.join(__dirname, '../logs/errors.log'), level: 'error'})
    ]
});

export default logger;