export default (
    directionScroll: number,
    sizeScroll: number,
    total: number,
    size: number
) => {
    const translateNode = Math.floor(directionScroll / size);
    const startNode = Math.max(0, translateNode);

    const visibleColumnCount = Math.ceil(sizeScroll / size);
    const visibleNodeCount = Math.min(
        total - startNode,
        visibleColumnCount + 2
    );

    return [startNode, visibleNodeCount];
};
