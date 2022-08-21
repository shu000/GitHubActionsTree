import { configs } from "./config";

type ParseResult = {
    indentDepth: number;
    directoryNames: string[];
    workflowName: string;
};

const calcIndentDepth = (splittedText: string[]): number => {
    return splittedText.length - 1;
};

const getDirectoryNames = (splittedText: string[]): string[] => {
    const names = [...splittedText];
    names.pop(); // 末尾を除く
    return names.filter((name) => name !== "");
};

const getWorkflowName = (splittedText: string[]): string => {
    const copy = [...splittedText];
    const name = copy.pop();
    return name ? name : "";
};

/**
 * .filter-itamのテキストをパースして、インデントの深さ・ディレクトリ名称・ワークフロー名称を取得する
 */
export const parseFilterItemText = (text: string): ParseResult => {
    const splitted = text.split(configs.separator);
    return {
        indentDepth: calcIndentDepth(splitted),
        directoryNames: getDirectoryNames(splitted),
        workflowName: getWorkflowName(splitted),
    };
};
