import { Configs } from "./types";

export class Config {
    static get(): Configs {
        return {
            indentWidth: 16,
            separator: "/",
        };
    }
}
