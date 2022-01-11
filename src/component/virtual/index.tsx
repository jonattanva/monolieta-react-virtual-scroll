import "./index.css";
import useRow from "../../hook/useRow";
import useScroll from "../../hook/useScroll";
import { forwardRef, useEffect } from "react";

type PropTypes = {
    children: React.ReactNode[];
    className?: string;
    columnCount: number | "auto";
    columnWidth: number | "auto";
    onScroll?: (scrollTop: number) => void;
    padding: number;
    renderer: (children: React.ReactNode, key: number) => React.ReactNode;
    rowHeight: number | "auto";
    scrollTop?: number;
};

const Virtual = forwardRef<HTMLDivElement, PropTypes>((props, ref) => {
    const { onScroll } = props;

    const scrollRef = ref as React.MutableRefObject<HTMLDivElement>;
    const scrollPosition = useScroll(scrollRef, props.scrollTop);

    useEffect(() => {
        if (onScroll && scrollPosition) {
            onScroll(scrollPosition?.scrollTop ?? 0);
        }
    }, [scrollPosition, onScroll]);

    const columnWidth = Math.floor(
        (props.columnWidth === "auto"
            ? scrollPosition?.width ?? 0
            : props.columnWidth) +
            props.padding * 2
    );

    const rowHeight = Math.floor(
        (props.rowHeight === "auto"
            ? scrollPosition?.height ?? 0
            : props.rowHeight) +
            props.padding * 2
    );

    const columnCount = Math.floor(
        props.columnCount === "auto"
            ? (scrollPosition?.width ?? 0) / columnWidth
            : props.columnCount
    );

    const columns = columnCount;
    const total = props.children.length;
    const rows = useRow(columns, total);

    const totalWidth = columns * columnWidth;
    const totalHeight = rows * rowHeight;

    const offsetWidth = scrollRef.current?.clientWidth ?? 0;
    const offsetX = offsetWidth - totalWidth;

    const scrollTop = scrollPosition?.scrollTop ?? 0;
    const scrollHeight = scrollPosition?.height ?? 0;

    let startNode = Math.max(0, Math.floor(scrollTop / rowHeight));
    let visibleNodeCount = Math.ceil(scrollHeight / rowHeight) + 2;
    visibleNodeCount = Math.min(rows - startNode, visibleNodeCount) * columns;

    const translateY = startNode * rowHeight;
    startNode = startNode * columns;

    const visibleChildren = props.children
        .slice(startNode, startNode + visibleNodeCount)
        .map(props.renderer);

    const position = {
        transform: `translateY(${translateY}px)`,
        width: `calc(100% - ${offsetX}px)`,
    };

    const className = !props.className
        ? "monolieta-virtual-scroll__main"
        : `monolieta-virtual-scroll__main ${props.className}`;

    return (
        <div ref={ref} className={className} role="list">
            <div
                className="monolieta-virtual-scroll__viewport"
                style={{ height: totalHeight }}
            >
                <div
                    className="monolieta-virtual-scroll__body"
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
