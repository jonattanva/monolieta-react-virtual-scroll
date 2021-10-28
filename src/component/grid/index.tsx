import Virtual from "../virtual";
import { useRef } from "react";

type PropTypes = {
    children: React.ReactNode[];
    columnCount: number;
    onScroll?: (scrollTop: number) => void;
    padding?: number;
    rowHeight: number;
    rowWidth: number;
    scrollTop?: number;
};

export const Grid = (props: PropTypes) => {
    const gridRef = useRef<HTMLDivElement>(null);

    const renderer = (children: React.ReactNode, key: number) => (
        <div
            key={key}
            style={{
                height: `${props.rowHeight}px`,
                margin: `${props.padding ?? 0}px`,
                width: `${props.rowWidth}px`,
            }}
        >
            {children}
        </div>
    );

    return (
        <Virtual
            columnCount={props.columnCount}
            onScroll={props.onScroll}
            padding={props.padding}
            ref={gridRef}
            renderer={renderer}
            rowHeight={props.rowHeight}
            rowWidth={props.rowWidth}
            scrollTop={props.scrollTop}
        >
            {props.children}
        </Virtual>
    );
};

export default Grid;
