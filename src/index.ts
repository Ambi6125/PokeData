import { log } from "console";
import { config } from "dotenv";
import { resolve } from "path";

const envFile = process.env.NODE_ENV === "development" ? ".dev.env" : ".env";

const envFilePath = resolve(process.cwd(), envFile); //Grabs the path from current directory to envFile

config({ path: envFilePath });

console.log("Application running in " + process.env.TEST);
