import { ParseResult, parseWorkflowNames } from "./parseFilterItemText";

const SEPARATOR = "/";

describe("parseWorkflowNames", () => {
    it("should throw Error when separator.length is not 1", () => {
        expect(() => {
            parseWorkflowNames([], "");
        }).toThrow();

        expect(() => {
            parseWorkflowNames([], "aa");
        }).toThrow();
    });

    it("should run correctory if regexp special separator", () => {
        const extected: ParseResult[] = [
            {
                indentDepth: 1,
                directoryNames: ["parent"],
                workflowName: "child",
            },
        ];

        const names = ["+parent+child+"];

        expect(parseWorkflowNames(names, "+")).toEqual(extected);
    });

    it("should run correctory if normal separator", () => {
        const extected: ParseResult[] = [
            {
                indentDepth: 1,
                directoryNames: ["parent"],
                workflowName: "child",
            },
        ];

        const names = ["0parent0child0"];

        expect(parseWorkflowNames(names, "0")).toEqual(extected);
    });

    it("should return [] when names is []", () => {
        expect(parseWorkflowNames([], SEPARATOR)).toEqual([]);
    });

    it("should return default when name is ''", () => {
        const extected: ParseResult[] = [
            {
                indentDepth: 0,
                directoryNames: [],
                workflowName: "",
            },
        ];

        expect(parseWorkflowNames([""], SEPARATOR)).toEqual(extected);
    });

    it("should return default when name includes only separator", () => {
        const extected: ParseResult[] = [
            {
                indentDepth: 0,
                directoryNames: [],
                workflowName: "",
            },
        ];

        const names = ["///"];

        expect(parseWorkflowNames(names, SEPARATOR)).toEqual(extected);
    });

    it("should ignore empty parent", () => {
        const extected: ParseResult[] = [
            {
                indentDepth: 1,
                directoryNames: ["parent"],
                workflowName: "child",
            },
        ];

        const names = ["parent//child"];

        expect(parseWorkflowNames(names, SEPARATOR)).toEqual(extected);
    });

    it("should ignore emplty child", () => {
        const extected: ParseResult[] = [
            {
                indentDepth: 0,
                directoryNames: [],
                workflowName: "parent",
            },
        ];

        const names = ["parent/"];

        expect(parseWorkflowNames(names, SEPARATOR)).toEqual(extected);
    });

    it("should run correctory if deep directory", () => {
        const extected: ParseResult[] = [
            {
                indentDepth: 2,
                directoryNames: ["root", "middle"],
                workflowName: "leef",
            },
        ];

        const names = ["root/middle/leef"];

        expect(parseWorkflowNames(names, SEPARATOR)).toEqual(extected);
    });

    it("should run correctory if multi directories", () => {
        const extected: ParseResult[] = [
            {
                indentDepth: 1,
                directoryNames: ["root"],
                workflowName: "leef1",
            },
            {
                indentDepth: 1,
                directoryNames: ["root"],
                workflowName: "leef2",
            },
            {
                indentDepth: 2,
                directoryNames: ["root", "middle"],
                workflowName: "leef3",
            },
            {
                indentDepth: 2,
                directoryNames: ["root", "middle"],
                workflowName: "leef4",
            },
            {
                indentDepth: 3,
                directoryNames: ["root", "middle", "root"],
                workflowName: "leef5",
            },
            {
                indentDepth: 1,
                directoryNames: ["other"],
                workflowName: "leef6",
            },
        ];

        const names = [
            "root/leef1",
            "root/leef2",
            "root/middle/leef3",
            "root/middle/leef4",
            "root/middle/root/leef5",
            "other/leef6",
        ];

        expect(parseWorkflowNames(names, SEPARATOR)).toEqual(extected);
    });
});
