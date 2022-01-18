export default (
    start: number,
    grid: [number, number],
    direction: "horizontal" | "vertical"
) => {
    const [columns, rows] = grid;
    return direction === "horizontal" ? start * rows : start * columns;
};
