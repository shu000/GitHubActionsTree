import { configs } from "./config";
import { modifyStyles } from "./modifyStyles";
import { parseWorkflowNames } from "./parseFilterItemText";

const main = () => {
    try {
        // spread side bar
        const sidebar = document.querySelector<HTMLElement>(".Layout-sidebar");
        if (sidebar) {
            sidebar.style.width = `${configs.sidebarWidth}px`;
        }

        const dir = document.querySelector(".ghatree-dir");
        if (dir) {
            console.log("duplicated");
            return;
        }

        const elements = Array.from(document.querySelectorAll<HTMLElement>(".filter-item"));

        const cachea = document.getElementById("ghatree-cache")?.dataset.parseResults;
        if (cachea) {
            console.log("cached");
            modifyStyles(elements, JSON.parse(cachea));
            return;
        }

        // modify styles of .filter-item
        const workflowNames = elements.map((elem) => elem.textContent?.trim() ?? "");
        const parseResults = parseWorkflowNames(workflowNames, configs.separator);
        console.log("oioioioi");
        console.log(workflowNames);
        console.log(parseResults);
        modifyStyles(elements, parseResults);

        const cache = document.createElement("div");
        cache.id = "ghatree-cache";
        cache.dataset.parseResults = JSON.stringify(parseResults);
        document.body.appendChild(cache);
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
        }
    }
};

main();
