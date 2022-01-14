import { useRef } from "react";
import Virtual from "../virtual";

type PropTypes = {
    children: React.ReactNode[];
    className?: string;
    columnCount?: number | "auto";
    columnWidth: number;
    direction?: "vertical" | "horizontal";
    onScroll?: (scrollTop: number) => void;
    padding?: number;
    rowHeight: number;
    scrollTop?: number;
};

export const Grid = (props: PropTypes) => {
    const { columnCount = "auto", direction = "vertical", padding = 0 } = props;

    const gridRef = useRef<HTMLDivElement>(null);

    return (
        <Virtual
            className={props.className}
            columnCount={columnCount}
            columnWidth={props.columnWidth}
            direction={direction}
            onScroll={props.onScroll}
            padding={padding}
            ref={gridRef}
            rowCount="auto"
            rowHeight={props.rowHeight}
            scrollTop={props.scrollTop}
        >
            {props.children}
        </Virtual>
    );
};

export default Grid;
