"use strict";
const fs = require("fs");
const path = require('path');
/**
 * Load .env file into process.env {pathToEnv: string; force: boolean; debug: boolean}
 * @param pathToEnv Optional. Parent directory of the .env file. Default to the current working directory.
 * @param force Optional. Force overwritting of already set variables. Default to false.
 * @param debug Optional. Log out information for debug purposes. Default to false.
 */
function load(arg) {
    //set default values
    if (arg == undefined)
        arg = { pathToEnv: process.cwd(), force: false, debug: false };
    if (arg.pathToEnv == undefined)
        arg.pathToEnv = process.cwd();
    if (arg.force == undefined)
        arg.force = false;
    if (arg.debug == undefined)
        arg.debug = false;
    //resolve path
    let pathToEnv = path.resolve(arg.pathToEnv, '.env');
    //Parse to key:value
    let v = parse(pathToEnv, arg.debug);
    for (let i = 0; i < v.length; i++) {
        if (Object.keys(process.env).includes(v[i].key) && !arg.force) {
            if (arg.debug) {
                console.log(`${v[i].key} already set in process.env and will NOT be overwritten! To overwrite it, set force to true.`);
            }
        }
        else if (Object.keys(process.env).includes(v[i].key) && arg.force) {
            process.env[v[i].key] = v[i].value;
            if (arg.debug) {
                console.log(`${v[i].key} overwritten in process.env!`);
            }
        }
        else {
            process.env[v[i].key] = v[i].value;
        }
    }
}
/**
 * Parse line into key:value
 * @param pathToEnv full path + .env
 * @returns Returns validated array of key:value
 */
function parse(pathToEnv, debug) {
    let a = arrayify(pathToEnv);
    let res = [];
    for (let i = 0; i < a.length; i++) {
        let env = validate(a[i]);
        if (env == undefined) {
            if (debug) {
                console.log(`${a[i]} does not match the key=value criteria!`);
            }
        }
        else {
            res.push({ key: env[0], value: env[1] });
        }
    }
    return res;
}
/**
 * Validate that the line meets the criteria key=value
 * @param line Line to validate
 * @returns Returns the validate line as array [key, value] or undefined if it does not meet the criteria
 */
function validate(line) {
    let spl = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/); //ensure the line matches key=value
    if (spl != null) {
        return [spl[1], spl[2] || '' /*if value is empty, set to empty string*/];
    }
    else {
        return undefined;
    }
}
/**
 * Split each line in the file into an array
 * @param envFilePath path to .env file
 * @returns Returns array of strings representing each line of the .env file
 */
function arrayify(envFilePath) {
    return fs.readFileSync(envFilePath).toString().replace(/\r\n|\r|\n\r/g, "\n").split("\n");
}
module.exports.load = load;
