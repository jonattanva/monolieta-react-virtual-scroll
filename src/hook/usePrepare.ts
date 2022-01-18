type Setting = {
    columnCount: number | "auto";
    columnWidth: number | "auto";
    rowCount: number | "auto";
    rowHeight: number | "auto";
};

export default (
    rowHeight: number | "auto",
    columnWidth: number | "auto",
    direction: "vertical" | "horizontal"
): Setting => {
    if (direction === "vertical") {
        return {
            columnCount: 1,
            columnWidth: "auto",
            rowCount: "auto",
            rowHeight,
        };
    } else {
        return {
            columnCount: "auto",
            columnWidth,
            rowCount: 1,
            rowHeight: "auto",
        };
    }
};
