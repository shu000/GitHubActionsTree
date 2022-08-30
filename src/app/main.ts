import { PageCache } from "./cache";
import { configs } from "./config";
import { modifyStyles } from "./modifyStyles";
import { parseWorkflowNames } from "./parseWorkflowNames";

const isAlreadyModified = (): boolean => {
    const dir = document.querySelector(".ghatree-dir");
    if (dir) {
        return true;
    }

    return false;
};

const expandSideBar = (): void => {
    const sidebar = document.querySelector<HTMLElement>(".Layout-sidebar");
    if (sidebar) {
        sidebar.style.width = `${configs.sidebarWidth}px`;
    }
};

const main = (): void => {
    try {
        if (isAlreadyModified()) {
            return;
        }

        expandSideBar();

        const cache = new PageCache();
        const elements = Array.from(document.querySelectorAll<HTMLElement>(".filter-item"));

        const cachedParseResults = cache.get("parseResults");
        if (cachedParseResults) {
            modifyStyles(elements, JSON.parse(cachedParseResults));
            return;
        }

        const workflowNames = elements.map((elem) => elem.textContent?.trim() ?? "");
        const parseResults = parseWorkflowNames(workflowNames, configs.separator);
        modifyStyles(elements, parseResults);

        cache.save("parseResults", JSON.stringify(parseResults));
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
        }
    }
};

main();
