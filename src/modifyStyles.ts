import { configs } from "./config";
import { createDirectoryElement } from "./elements";
import { ParseResult } from "./types";

type Tree = Record<string, Branch>;
interface Branch extends Tree {}

const tree: Tree = {}; // destructive...

const modifyStyle = (target: HTMLElement, parseResult: ParseResult) => {
    const parent = target.parentNode;
    const svg = target.children[0];

    if (!parent) {
        return;
    }

    let memo = tree;
    parseResult.directoryNames.map((name, i) => {
        if (memo[name]) {
            memo = memo[name];
            return;
        }

        const paddingLeft = `${configs.baseIndentWidth + configs.indentWidth * i}px`;
        parent.insertBefore(createDirectoryElement(name, paddingLeft), target);

        memo[name] = {};
        memo = memo[name];
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
