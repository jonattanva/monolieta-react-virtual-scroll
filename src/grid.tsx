import { useRef } from "react";
import css from "./virtual.style";
import useRow from "./hook/useRow";
import useScroll from "./hook/useScroll";
import useVisible from "./hook/useVisible";

type PropTypes = {
    children: React.ReactNode[];
    columnCount: number;
    padding?: number;
    rowHeight: number;
    rowWidth: number;
};

const Grid = ({ padding = 0, ...props }: PropTypes) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const scrollPosition = useScroll(scrollRef);

    const columns = props.columnCount;
    const total = props.children.length;
    const rows = useRow(columns, total);

    const rowHeight = props.rowHeight + padding * 2;
    const rowWidth = props.rowWidth + padding * 2;

    const totalHeight = rows * rowHeight;
    const totalWidth = columns * rowWidth;

    const offsetWidth = scrollRef.current ? scrollRef.current.clientWidth : 0;
    const offsetX = offsetWidth - totalWidth;

    const scrollTop = scrollPosition ? scrollPosition.scrollTop : 0;
    const scrollHeight = scrollPosition ? scrollPosition.size.height : 0;

    let startNode = Math.max(0, Math.floor(scrollTop / rowHeight));
    let visibleNodeCount = Math.ceil(scrollHeight / rowHeight) + 2;
    visibleNodeCount = Math.min(rows - startNode, visibleNodeCount) * columns;

    const offsetY = startNode * rowHeight;
    startNode = startNode * columns;

    const visibleChildren = useVisible(
        props.children,
        startNode,
        visibleNodeCount
    ).map((item, index) => (
        <div
            key={index}
            style={{
                height: `${props.rowHeight}px`,
                margin: `${padding}px`,
                width: `${props.rowWidth}px`,
            }}
        >
            {item}
        </div>
    ));

    return (
        <div ref={scrollRef} style={css.main}>
            <div style={{ height: totalHeight, ...css.viewport }}>
                <div style={css.body(offsetX, offsetY)}>{visibleChildren}</div>
            </div>
        </div>
    );
};

export default Grid;
