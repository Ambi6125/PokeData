import { config } from "dotenv";
import { resolve } from "path";

const envFile = process.env.NODE_ENV === "development" ? ".dev.env" : ".env";

const envFilePath = resolve(process.cwd(), envFile); //Grabs the path from current directory to envFile

config({ path: envFilePath });

export function getEnvVar(name: string, fallback?: string): string {
    const value = process.env[name] ?? fallback;
    if(value === undefined) {
        throw new Error("No definition for " + name);
    }

    return value;
}