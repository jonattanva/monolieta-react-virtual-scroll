import Virtual from "../virtual";
import { useRef } from "react";

type PropTypes = {
    children: React.ReactNode[];
    className?: string;
    onScroll?: (scrollTop: number) => void;
    padding?: number;
    rowHeight: number;
    scrollTop?: number;
};

const List = (props: PropTypes) => {
    const listRef = useRef<HTMLDivElement>(null);

    const renderer = (children: React.ReactNode, key: number) => (
        <div
            key={key}
            style={{
                height: `${props.rowHeight}px`,
                width: "100%",
            }}
        >
            {children}
        </div>
    );

    return (
        <Virtual
            className={props.className}
            columnCount={1}
            columnWidth="auto"
            onScroll={props.onScroll}
            padding={props.padding}
            ref={listRef}
            renderer={renderer}
            rowHeight={props.rowHeight}
            scrollTop={props.scrollTop}
        >
            {props.children}
        </Virtual>
    );
};

export default List;
