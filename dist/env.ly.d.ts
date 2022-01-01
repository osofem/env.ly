declare const fs: any;
declare const path: any;
/**
 * Load .env file into process.env {pathToEnv: string; force: boolean; debug: boolean}
 * @param pathToEnv Optional. Parent directory of the .env file. Default to the current working directory.
 * @param force Optional. Force overwritting of already set variables. Default to false.
 * @param debug Optional. Log out information for debug purposes. Default to false.
 */
declare function load(arg: {
    pathToEnv: string;
    force: boolean;
    debug: boolean;
}): void;
/**
 * Parse line into key:value
 * @param pathToEnv full path + .env
 * @returns Returns validated array of key:value
 */
declare function parse(pathToEnv: string, debug: boolean): {
    key: string;
    value: string;
}[];
/**
 * Validate that the line meets the criteria key=value
 * @param line Line to validate
 * @returns Returns the validate line as array [key, value] or undefined if it does not meet the criteria
 */
declare function validate(line: string): string[] | undefined;
/**
 * Split each line in the file into an array
 * @param envFilePath path to .env file
 * @returns Returns array of strings representing each line of the .env file
 */
declare function arrayify(envFilePath: string): string[];
