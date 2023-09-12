
import { execSync } from "child_process";
import inquirer from "inquirer";
import { exit } from "process";

export async function runCmdwithNPM(library) {

    switch (library) {
        case "React":
            const reactOption = await inquirer.prompt({
                name: "react_build",
                type: "list",
                message: "Select the build tool you want to use",
                choices: [
                    "Vite (recommended)",
                    "Create-react-app (CRA)",
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

export async function runCmdwithBun(library) {

    if (library == "Qwik (Not yet supported in bun)") {
        console.log("Bun does not support Qwik yet. Failed to build");
        exit(0);
    }

    const project = await inquirer.prompt({
        name: "name",
        type: "input",
        message: "Project name: ",

    })

    switch (library) {
        case "React":
            const reactOption = await inquirer.prompt({
                name: "react_build",
                type: "list",
                message: "Select the build tool you want to use",
                choices: [
                    "Vite (recommended)",
                    "Create-react-app (CRA)",
                ],

            })


            if (reactOption.react_build == "Vite") {
                execSync(`bun create vite@latest  ${project.name}`, { stdio: 'inherit' });
            }
            else {
                execSync(`bunx create react-app ${project.name}`, { stdio: 'inherit' });
            }
            break;
        case "NextJS":
            execSync(`bunx create-next-app@latest ${project.name}`, { stdio: 'inherit' });
            break;
        case "Svelte":
            execSync(`bun create svelte@latest ${project.name}`, { stdio: 'inherit' });
            break;
        case "Astro":
            execSync(`bun create astro@latest ${project.name}`, { stdio: 'inherit' });
            break;
    }

}