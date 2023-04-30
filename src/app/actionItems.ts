const ParentSelector = ".ActionList-item--hasSubItem";
const ItemsSelector = ".ActionList-item";
const ShowMoreButtonText = "Show more workflows...";

export class ActionItems {
    private elements: HTMLElement[] = [];
    private workflowNames: string[] = [];

    private showAll() {
        this.elements.map((e) => {
            if (e.textContent?.trim() === ShowMoreButtonText) {
                e.click();
            }
        });
    }

    constructor(document: Document) {
        const parent = document.querySelector(ParentSelector);
        if (!parent) {
            return;
        }

        this.elements = Array.from(parent.querySelectorAll(ItemsSelector));

        // FIXME
        this.showAll();

        this.workflowNames = this.elements
            .map((e) => e.textContent?.trim() ?? "")
            .filter((name) => name !== ShowMoreButtonText);
    }

    getElements() {
        return this.elements;
    }

    getWorkflowNames() {
        return this.workflowNames;
    }
}
