import { getEnvVar } from "./utils";

export const Keys = {
    clientToken: getEnvVar("CLIENT_TOKEN"),
} as const;

export default Keys;