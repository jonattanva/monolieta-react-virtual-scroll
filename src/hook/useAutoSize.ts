export default (
    value: number | "auto",
    sizeScroll: number,
    padding: number = 0
) => Math.floor((value === "auto" ? sizeScroll : value) + padding * 2);
