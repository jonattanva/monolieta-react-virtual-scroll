import { useRef } from "react";
import Virtual from "../virtual";

type PropTypes = {
    children: React.ReactNode[];
    className?: string;
    columnCount?: number | "auto";
    columnWidth: number;
    onScroll?: (scrollTop: number) => void;
    padding?: number;
    rowHeight: number;
    scrollTop?: number;
};

export const Grid = (props: PropTypes) => {
    const { columnCount = "auto", padding = 0 } = props;

    const gridRef = useRef<HTMLDivElement>(null);

    const renderer = (children: React.ReactNode, key: number) => (
        <div
            key={key}
            style={{
                height: `${props.rowHeight}px`,
                margin: `${padding}px`,
                width: `${props.columnWidth}px`,
            }}
        >
            {children}
        </div>
    );

    return (
        <Virtual
            className={props.className}
            columnCount={columnCount}
            columnWidth={props.columnWidth}
            onScroll={props.onScroll}
            padding={padding}
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
