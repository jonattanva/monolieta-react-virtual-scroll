export type Size = number | "auto";
export type Direction = "horizontal" | "vertical" | "mixed";

export type Style = {
    body: string;
    main: string;
};

export type Render = {
    children: React.ReactNode[] | React.ReactNode[][];
    columnWidth: number;
    direction: Direction;
    padding: number;
    rowHeight: number;
    startNodeX: number;
    startNodeY: number;
    visibleNodeCountX: number;
    visibleNodeCountY: number;
};
