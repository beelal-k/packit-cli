#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { execSync } from "child_process"

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
        });
}

async function selectLibrary() {
    const list = await inquirer.prompt({
        name: "library",
        type: "list",
        message: "Select a framework",
        choices: [
            "React",
            "NextJS",
            "Svelte",
            "Astro",
            "Qwik"
        ],
    })

    runCmd(list.library);
}


async function runCmd(library) {

    switch (library) {
        case "React":
            const reactOption = await inquirer.prompt({
                name: "react_build",
                type: "list",
                message: "Select the build tool you want to use",
                choices: [
                    "Create-react-app (CRA)",
                    "Vite",
                ],

            })

            if (reactOption.react_build == "Vite") {
                execSync("npm create vite@latest", { stdio: 'inherit' });
            }
            else {

                const project = await inquirer.prompt({
                    name: "name",
                    type: "input",
                    message: "Project name: ",

                })
                execSync(`npx create-react-app ${project.name}`, { stdio: 'inherit' });
            }
            break;
        case "NextJS":
            execSync("npx create-next-app@latest", { stdio: 'inherit' });
            break;
        case "Svelte":
            execSync("npm create svelte@latest", { stdio: 'inherit' });
            break;
        case "Astro":
            execSync("npm create astro@latest", { stdio: 'inherit' });
            break;
        case "Qwik":
            execSync("npm create qwik@latest", { stdio: 'inherit' });
            break;
    }

}

await welcome();
setTimeout(() => {
    selectLibrary();
}, 1000)
