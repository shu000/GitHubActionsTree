import { trim } from "./util";

export type ParseResult = {
    indentDepth: number;
    directoryNames: string[];
    workflowName: string;
};

const defaultParseResult = {
    indentDepth: 0,
    directoryNames: [],
    workflowName: "",
};

const parse = (name: string, separator: string): ParseResult => {
    if (name === "") {
        return defaultParseResult;
    }

    const splitted = trim(name, separator).split(separator);
    const directoryNames = splitted.slice(0, -1).filter((name) => name !== "");
    const workflowName = splitted.slice(-1)[0];

    return {
        indentDepth: directoryNames.length,
        directoryNames,
        workflowName,
    };
};

export const parseWorkflowNames = (names: string[], separator: string): ParseResult[] => {
    if (separator.length !== 1) {
        throw new Error("Length of separator should be 1.");
    }

    return names.map((name) => {
        return parse(name, separator);
    });
};
