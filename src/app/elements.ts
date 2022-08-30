import { Constants } from "./constants";

const createFolderIconElement = (): SVGElement => {
    const folderIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    folderIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
    `;
    folderIcon.style.width = "21px";
    folderIcon.style.height = "21px";
    folderIcon.style.marginRight = "8px";
    return folderIcon;
};

export const createDirectoryElement = (text: string, paddingLeft: CSSStyleDeclaration["paddingLeft"]): HTMLElement => {
    const div = document.createElement("div");
    div.className = Constants.DirElementClassName;
    div.style.display = "flex";
    div.style.padding = `8px 16px 0 ${paddingLeft}`;
    div.style.fontSize = "14px";
    div.style.color = "#57606a";
    div.style.overflow = "hidden";
    div.style.textOverflow = "elipsis";
    div.style.whiteSpace = "nowrap";

    const svg = createFolderIconElement();
    div.appendChild(svg);

    const p = document.createElement("p");
    p.textContent = text;
    div.appendChild(p);

    return div;
};
