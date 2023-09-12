#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import fs from 'fs';
import { runCmdwithBun, runCmdwithNPM } from "./runFunctions.js";


// Checking the default runtime 
const configFile = "./config.json";
let defaultRuntime = 'npm';

let config = {};

try {
    config = JSON.parse(fs.readFileSync(configFile, 'utf-8'))
    defaultRuntime = config.runtime;
} catch (error) {
    console.log(error);
}

const projects = {
    "bun": [
        "Elysia",
        "React",
        "NextJS",
        "Astro",
        "Svelte"
    ],
    "npm": [
        "React",
        "NextJS",
        "Astro",
        "Svelte",
        "Qwik"
    ]
}

// startup command on running packit
async function welcome() {

    figlet(`\n\npackit`,
        {
            font: "Doom",
            horizontalLayout: "default",
            verticalLayout: "fitted",
            width: 50,
            whitespaceBreak: true,
        },
        (err, data) => {
            console.log(gradient.pastel.multiline(data));
            console.log(chalk.bold("\nGet started by selecting a framework\n"));
            console.log(chalk.bold(`Runtime: ${config.runtime} \n`));
        });
}

// Select default runtime for 
async function makeDefault(runtime) {
    config.runtime = runtime;
    fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
    console.log(`Successfully made ${runtime} your default runtime!`);
}

// Select the library to use for the project
async function selectLibrary() {
    const list = await inquirer.prompt({
        name: "library",
        type: "list",
        message: "Select a framework",
        choices: projects[defaultRuntime]
    })
    if (config.runtime == "npm") {
        runCmdwithNPM(list.library);
    }
    else {
        runCmdwithBun(list.library);
    }
}

// flags
if (process.argv.includes("-help") || process.argv.includes("-h")) {
    console.log(chalk.bold("\npackit : Run packit-cli"));
    console.log(chalk.bold("\n-runtime [-r] : Select a default runtime to use for creating projects"));
}
else if (process.argv.includes("-r") || process.argv.includes("-runtime")) {

    const runtime = await inquirer.prompt({
        name: "default",
        type: "list",
        message: "Select a default runtime",
        default: config.runtime || 'npm',
        choices: [
            `${defaultRuntime == 'npm' ? 'npm (default)' : 'npm'}`,
            `${defaultRuntime == 'bun' ? 'bun(default)' : 'bun'}`,
        ],
    });

    makeDefault(runtime.default);

}
else {
    await welcome();
    setTimeout(() => {
        selectLibrary();
    }, 1000)

}