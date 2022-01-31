export type Direction = "vertical" | "horizontal" | "mixed";

export default (
    children: React.ReactNode[] | React.ReactNode[][],
    x: [number, number],
    y: [number, number],
    direction: Direction
) => {
    const [startX, endX] = x;
    const [startY, endY] = y;

    let results = [];
    switch (direction) {
        case "vertical": {
            results = children.slice(startY, endY);
            break;
        }

        case "horizontal": {
            results = children.slice(startX, endX);
            break;
        }

        default: {
            results = children.slice(startY, endY);
            break;
        }
    }

    return results;
};
