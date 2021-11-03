import Virtual from "../virtual";
import { useRef } from "react";

type PropTypes = {
    children: React.ReactNode[];
    className?: string;
    columnCount: number;
    columnWidth: number;
    onScroll?: (scrollTop: number) => void;
    padding?: number;
    rowHeight: number;
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
                width: `${props.columnWidth}px`,
            }}
        >
            {children}
        </div>
    );

    return (
        <Virtual
            className={props.className}
            columnCount={props.columnCount}
            columnWidth={props.columnWidth}
            onScroll={props.onScroll}
            padding={props.padding}
            ref={gridRef}
            renderer={renderer}
            rowHeight={props.rowHeight}
            scrollTop={props.scrollTop}
        >
            {props.children}
        </Virtual>
    );
};

export default Grid;
