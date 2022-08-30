import { createDirectoryElement } from "./elements";
import { ParseResult } from "./types";

type Tree = Record<string, Branch>;
interface Branch extends Tree {}

type ModifyOptions = {
    baseIndentWidth: number;
    indentWidth: number;
};

const tree: Tree = {}; // destructive...

const modifyStyle = (target: HTMLElement, parseResult: ParseResult, options: ModifyOptions): void => {
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

        const paddingLeft = `${options.baseIndentWidth + options.indentWidth * i}px`;
        parent.insertBefore(createDirectoryElement(name, paddingLeft), target);

        memo[name] = {};
        memo = memo[name];
    });

    target.innerHTML = "";
    if (svg) {
        target.appendChild(svg);
    }
    target.appendChild(document.createTextNode(parseResult.workflowName));
    target.style.paddingLeft = `${options.baseIndentWidth + options.indentWidth * parseResult.indentDepth}px`;
};

export const modifyStyles = (
    elements: HTMLElement[],
    parseResults: ParseResult[],
    options: ModifyOptions = { baseIndentWidth: 16, indentWidth: 16 },
): void => {
    if (elements.length !== parseResults.length) {
        return;
    }

    elements.map((element, i) => {
        modifyStyle(element, parseResults[i], options);
    });
};
