export default (
    counts: [number, number],
    total: number,
    direction: "horizontal" | "vertical"
) => {
    let [rows, columns] = counts;

    if (direction === "horizontal") {
        columns = rows > 0 ? total / rows : 0;
        if (columns % 1 !== 0) {
            columns = Math.trunc(columns + 1);
        }
    } else {
        rows = columns > 0 ? total / columns : 0;
        if (rows % 1 !== 0) {
            rows = Math.trunc(rows + 1);
        }
    }

    return [rows, columns];
};
