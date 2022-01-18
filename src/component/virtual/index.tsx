import "./index.css";
import useScroll from "../../hook/useScroll";
import { forwardRef, useEffect } from "react";
import useStartNode from "../../hook/useStartNode";
import useCalculateGrid from "../../hook/useCalculateGrid";
import useCalculateSlice from "../../hook/useCalculateSlice";
import useCalculateVirtualScroll from "../../hook/useCalculateVirtualScroll";

type PropTypes = {
    children: React.ReactNode[];
    className?: string;
    columnCount: number | "auto";
    columnWidth: number | "auto";
    direction: "vertical" | "horizontal";
    onScroll?: (scrollTop: number, scrollLeft: number) => void;
    padding: number;
    rowCount: number | "auto";
    rowHeight: number | "auto";
    scrollLeft?: number;
    scrollTop?: number;
};

const Virtual = forwardRef<HTMLDivElement, PropTypes>((props, ref) => {
    const { onScroll } = props;

    const scrollRef = ref as React.MutableRefObject<HTMLDivElement>;
    const scrollPosition = useScroll(
        scrollRef,
        props.scrollTop,
        props.scrollLeft
    );

    useEffect(() => {
        if (onScroll && scrollPosition) {
            onScroll(
                scrollPosition?.scrollTop ?? 0,
                scrollPosition?.scrollLeft ?? 0
            );
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

    const rowCount = Math.floor(
        props.rowCount === "auto"
            ? (scrollPosition?.height ?? 0) / rowHeight
            : props.rowCount
    );

    const [rows, columns] = useCalculateGrid(
        [rowCount, columnCount],
        props.children.length,
        props.direction
    );

    const totalHeight = rows * rowHeight;
    const totalWidth = columns * columnWidth;

    const clientWidth = scrollPosition?.width ?? 0;
    const offsetX = clientWidth - totalWidth;

    const clientHeight = scrollPosition?.height ?? 0;
    const offsetY = clientHeight - totalHeight;

    const [start, visibleNodeCount] = useCalculateSlice(
        [columnWidth, rowHeight],
        [columns, rows],
        scrollPosition,
        props.direction
    );

    const translateY = start * rowHeight;
    const translateX = start * columnWidth;
    const startNode = useStartNode(start, [columns, rows], props.direction);

    const visibleChildren = props.children
        .slice(startNode, startNode + visibleNodeCount)
        .map((children: React.ReactNode, key: number) => (
            <div
                key={key}
                style={{
                    height: `${rowHeight}px`,
                    margin: `${props.padding}px`,
                    width: `${columnWidth}px`,
                }}
            >
                {children}
            </div>
        ));

    const style = useCalculateVirtualScroll(
        {
            translate: {
                x: translateX,
                y: translateY,
            },
            offset: {
                x: offsetX,
                y: offsetY,
            },
            width: totalWidth,
            height: totalHeight,
        },
        props.direction
    );

    const className = !props.className
        ? "monolieta-virtual-scroll__main"
        : `monolieta-virtual-scroll__main ${props.className}`;

    return (
        <div ref={ref} className={className} role="list">
            <div
                className="monolieta-virtual-scroll__viewport"
                style={style.viewport}
            >
                <div
                    className="monolieta-virtual-scroll__body"
                    style={style.body}
                >
                    {visibleChildren}
                </div>
            </div>
        </div>
    );
});

Virtual.displayName = "Virtual";

export default Virtual;
