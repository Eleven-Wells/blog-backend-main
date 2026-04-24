import dotenv from "dotenv";
import path from "path";
import logger from "../services/logger.service";

dotenv.config({ path: path.join(__dirname, '../../.env')});

const mandatoryVariables = [
    "PORT",
    "APP_ENV",
    "DATABASE_URI",
];

const missingVariables = mandatoryVariables.filter(( variable) => !process.env[variable]);

if(missingVariables.length > 0) {
    const variableString = JSON.stringify(missingVariables);

    logger.error(`Environment variable(s) [ ${variableString.substring(1, variableString.length - 1)} ] are required to start the server.

If running on local machine, create a .env file in your root directory and declare them there like:

PORT=<port_number>.

`);

    process.exit(1);
};

const config = {
    PORT: process.env.PORT,
    APP_ENV: process.env.APP_ENV,
    DATABASE_URI: process.env.DATABASE_URI
};

export default config;