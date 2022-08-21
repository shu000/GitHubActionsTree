import { configs } from "./config";
import { styleFileterItem } from "./styleFilterItem";

const main = () => {
    // サイドバーの幅を広げる
    const sidebar = document.querySelector<HTMLElement>(".Layout-sidebar");
    if (sidebar) {
        sidebar.style.width = `${configs.sidebarWidth}px`;
    }

    // .filter-itemのスタイルを編集する
    const items = document.querySelectorAll<HTMLElement>(".filter-item");
    for (let i = 0; i < items.length; i++) {
        styleFileterItem(items[i]);
    }
};

main();
