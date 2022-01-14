import type { Scroll } from "./useScroll";

export default (
    item: [number, number],
    grid: [number, number],
    scroll?: Scroll,
    direction?: "horizontal" | "vertical"
) => {
    const [columns, rows] = grid;
    const [columnWidth, rowHeight] = item;

    if (direction === "horizontal") {
        const scrollLeft = scroll?.scrollLeft ?? 0;
        const scrollWidth = scroll?.width ?? 0;

        const startNode = Math.max(0, Math.floor(scrollLeft / columnWidth));

        const visibleNodeCount =
            Math.min(
                columns - startNode,
                Math.ceil(scrollWidth / columnWidth) + 2
            ) * rows;

        return [startNode, visibleNodeCount];
    } else {
        const scrollTop = scroll?.scrollTop ?? 0;
        const scrollHeight = scroll?.height ?? 0;

        const startNode = Math.max(0, Math.floor(scrollTop / rowHeight));
        const visibleNodeCount =
            Math.min(
                rows - startNode,
                Math.ceil(scrollHeight / rowHeight) + 2
            ) * columns;

        return [startNode, visibleNodeCount];
    }
};
