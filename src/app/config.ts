import { Configs } from "./types";

export class Config {
    static get(): Configs {
        return {
            sidebarWidth: 348,
            indentWidth: 16,
            separator: "/",
        };
    }
}
