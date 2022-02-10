import { useRef } from "react";
import Virtual from "../virtual";
import { Direction } from "../../types";

type PropTypes = {
    children?: React.ReactNode[][];
    className?: string;
    columnWidth: number;
    direction?: Direction;
    onScroll?: (scrollLeft: number, scrollTop: number) => void;
    padding?: number;
    rowHeight: number;
    scrollLeft?: number;
    scrollTop?: number;
};

const Grid = (props: PropTypes) => {
    // prettier-ignore
    const {
        children = [],
        direction = "mixed",
        padding = 0
    } = props;

    const gridRef = useRef<HTMLDivElement>(null);

    const numColumns = children.reduce((previous, current) => {
        return Math.max(previous, current.length);
    }, 0);

    return (
        <Virtual
            className={props.className}
            columnWidth={props.columnWidth}
            direction={direction}
            numColumns={numColumns}
            numRows={children.length}
            onScroll={props.onScroll}
            padding={padding}
            ref={gridRef}
            rowHeight={props.rowHeight}
            scrollLeft={props.scrollLeft}
            scrollTop={props.scrollTop}
        >
            {children}
        </Virtual>
    );
};

export default Grid;
