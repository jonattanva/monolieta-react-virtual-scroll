import "./index.css";
import useRow from "../../hook/useRow";
import useScroll from "../../hook/useScroll";
import { forwardRef, useEffect } from "react";

type PropTypes = {
    children: React.ReactNode[];
    columnCount: number;
    onScroll?: (scrollTop: number) => void;
    padding?: number;
    renderer: (children: React.ReactNode, key: number) => React.ReactNode;
    rowHeight: number;
    rowWidth: number | "auto";
    scrollTop?: number;
};

const Virtual = forwardRef<HTMLDivElement, PropTypes>((props, ref) => {
    const { padding = 0, onScroll } = props;

    const scrollRef = ref as React.MutableRefObject<HTMLDivElement>;
    const scrollPosition = useScroll(scrollRef, props.scrollTop);

    useEffect(() => {
        if (onScroll && scrollPosition) {
            onScroll(scrollPosition?.scrollTop ?? 0);
        }
    }, [scrollPosition, onScroll]);

    const columns = props.columnCount;
    const total = props.children.length;
    const rows = useRow(columns, total);

    const rowHeight = props.rowHeight + padding * 2;
    const rowWidth =
        (props.rowWidth === "auto"
            ? scrollPosition?.size.width ?? 0
            : props.rowWidth) +
        padding * 2;

    const totalHeight = rows * rowHeight;
    const totalWidth = columns * rowWidth;

    const offsetWidth = scrollRef.current ? scrollRef.current.clientWidth : 0;
    const offsetX = offsetWidth - totalWidth;

    const scrollTop = scrollPosition?.scrollTop ?? 0;
    const scrollHeight = scrollPosition?.size.height ?? 0;

    let startNode = Math.max(0, Math.floor(scrollTop / rowHeight));
    let visibleNodeCount = Math.ceil(scrollHeight / rowHeight) + 2;
    visibleNodeCount = Math.min(rows - startNode, visibleNodeCount) * columns;

    const offsetY = startNode * rowHeight;
    startNode = startNode * columns;

    const visibleChildren = props.children
        .slice(startNode, startNode + visibleNodeCount)
        .map(props.renderer);

    const position = {
        transform: `translateY(${offsetY}px)`,
        width: `calc(100% - ${offsetX}px)`,
    };

    return (
        <div ref={ref} className="monolieta__virtual-scroll-main" role="list">
            <div
                className="monolieta__virtual-scroll-viewport"
                style={{ height: totalHeight }}
            >
                <div
                    className="monolieta__virtual-scroll-body"
                    style={position}
                >
                    {visibleChildren}
                </div>
            </div>
        </div>
    );
});

Virtual.displayName = "Virtual";

export default Virtual;