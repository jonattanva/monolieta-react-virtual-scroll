import Virtual from "../virtual";
import { useRef } from "react";

type PropTypes = {
    children: React.ReactNode[];
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
            columnCount={1}
            onScroll={props.onScroll}
            padding={props.padding}
            ref={listRef}
            renderer={renderer}
            rowHeight={props.rowHeight}
            rowWidth="auto"
            scrollTop={props.scrollTop}
        >
            {props.children}
        </Virtual>
    );
};

export default List;
