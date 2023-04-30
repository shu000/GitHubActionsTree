export type ParseResult = {
    indentDepth: number;
    directoryNames: string[];
    workflowName: string;
};

export type Configs = {
    indentWidth: number;
    separator: string;
};
