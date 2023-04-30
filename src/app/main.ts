import { ActionItems } from "./actionItems";
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
        console.log("hi");

        if (isAlreadyModified()) {
            return;
        }

        const { indentWidth, separator } = Config.get();
        const modifyOptions = {
            baseIndentWidth: Constants.BaseIndentWidth,
            indentWidth,
        };

        // const cache = new PageCache();
        const actionListItem = new ActionItems(document);

        /*
        const cachedParseResults = cache.get("parseResults");
        if (cachedParseResults) {
            modifyStyles(elements, JSON.parse(cachedParseResults), modifyOptions);
            return;
        }
        */

        const elements = actionListItem.getElements();
        const workflowNames = actionListItem.getWorkflowNames();
        const parseResults = parseWorkflowNames(workflowNames, separator);
        modifyStyles(elements, parseResults, modifyOptions);

        // cache.save("parseResults", JSON.stringify(parseResults));
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
        }
    }
};

main();
