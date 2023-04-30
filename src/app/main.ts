import { PageCache } from "./cache";
import { Config } from "./config";
import { Constants } from "./constants";
import { modifyStyles } from "./modifyStyles";
import { parseWorkflowNames } from "./parseWorkflowNames";

const isAlreadyModified = (): boolean => {
    const dir = document.querySelector(`.${Constants.DirElementClassName}`);
    if (dir) {
        return true;
    }

    return false;
};

const main = (): void => {
    try {
        if (isAlreadyModified()) {
            return;
        }

        const { indentWidth, separator } = Config.get();
        const modifyOptions = {
            baseIndentWidth: Constants.BaseIndentWidth,
            indentWidth,
        };

        const cache = new PageCache();
        const elements = Array.from(document.querySelectorAll<HTMLElement>(".filter-item"));

        const cachedParseResults = cache.get("parseResults");
        if (cachedParseResults) {
            modifyStyles(elements, JSON.parse(cachedParseResults), modifyOptions);
            return;
        }

        const workflowNames = elements.map((elem) => elem.textContent?.trim() ?? "");
        const parseResults = parseWorkflowNames(workflowNames, separator);
        modifyStyles(elements, parseResults, modifyOptions);

        cache.save("parseResults", JSON.stringify(parseResults));
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
        }
    }
};

main();
