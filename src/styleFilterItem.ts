import { configs } from "./config";
import { createDirectoryElement } from "./elements";
import { parseFilterItemText } from "./parseFilterItemText";

const memo: Record<string, boolean> = {};

/**
 * <li class=".filter-item">のスタイルをいじる関数
 * @param target 対象の<li class=".filter-item">
 */
export const styleFileterItem = (target: HTMLElement) => {
    const parent = target.parentNode;
    const text = target.textContent?.trim();
    const svg = target.children[0];

    if (!parent || typeof text !== "string" || text === "") {
        return;
    }

    const { indentDepth, directoryNames, workflowName } = parseFilterItemText(text);

    directoryNames.map((name, i) => {
        // 初めて出現したディレクトリ名の場合のみdivを挿入する
        // workflow一覧がアルファベット順ソートされていることが前提
        if (!memo[name]) {
            const paddingLeft = `${configs.baseIndentWidth + configs.indentWidth * i}px`;
            parent.insertBefore(createDirectoryElement(name, paddingLeft), target);
            memo[name] = true;
        }
    });

    if (indentDepth) {
        target.innerHTML = "";
        if (svg) {
            target.appendChild(svg);
        }
        target.appendChild(document.createTextNode(workflowName));
        target.style.paddingLeft = `${configs.baseIndentWidth + configs.indentWidth * indentDepth}px`;
    }
};
