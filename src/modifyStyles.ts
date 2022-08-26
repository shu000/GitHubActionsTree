import { configs } from "./config";
import { createDirectoryElement } from "./elements";
import { ParseResult } from "./parseFilterItemText";

const modifyStyle = (target: HTMLElement, parseResult: ParseResult) => {
    const parent = target.parentNode;
    const svg = target.children[0];

    if (!parent) {
        return;
    }

    parseResult.directoryNames.map((name, i) => {
        const paddingLeft = `${configs.baseIndentWidth + configs.indentWidth * i}px`;
        parent.insertBefore(createDirectoryElement(name, paddingLeft), target);
    });

    target.innerHTML = "";
    if (svg) {
        target.appendChild(svg);
    }
    target.appendChild(document.createTextNode(parseResult.workflowName));
    target.style.paddingLeft = `${configs.baseIndentWidth + configs.indentWidth * parseResult.indentDepth}px`;
};

export const modifyStyles = (elements: HTMLElement[], parseResults: ParseResult[]) => {
    if (elements.length !== parseResults.length) {
        return;
    }

    elements.map((element, i) => {
        modifyStyle(element, parseResults[i]);
    });
};
