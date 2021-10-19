import css from "./virtual.style";
import { useRef, useMemo } from "react";
import useScroll from "./hook/use-scroll";

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

    const total = props.children.length;
    const rowHeight = props.rowHeight + padding * 2;
    const rowWidth = props.rowWidth + padding * 2;

    const rows = useMemo(() => {
        let rows = props.columnCount > 0 ? total / props.columnCount : 0;
        if (rows % 1 !== 0) {
            rows = Math.trunc(rows + 1);
        }
        return rows;
    }, [props.columnCount, total]);

    const height = rows * rowHeight;
    const width = props.columnCount * rowWidth;
    const offsetWidth = scrollRef.current ? scrollRef.current.clientWidth : 0;
    const offsetX = offsetWidth - width;

    const scrollTop = scrollPosition ? scrollPosition.scrollTop : 0;
    const scrollHeight = scrollPosition ? scrollPosition.size.height : 0;

    let startNode = Math.max(0, Math.floor(scrollTop / rowHeight));
    let visibleNodeCount = Math.ceil(scrollHeight / rowHeight) + 2;
    visibleNodeCount =
        Math.min(rows - startNode, visibleNodeCount) * props.columnCount;

    const offsetY = startNode * rowHeight;
    startNode = startNode * props.columnCount;

    const visibleChildren = useMemo(() => {
        return props.children.slice(startNode, startNode + visibleNodeCount);
    }, [startNode, visibleNodeCount, props.children]);

    return (
        <div ref={scrollRef} style={css.main}>
            <div style={{ height, ...css.viewport }}>
                <div style={css.body(offsetX, offsetY)}>{visibleChildren}</div>
            </div>
        </div>
    );
};

export default Grid;
