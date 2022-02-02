import "./index.css";
import Row from "./index.row";
import Body from "./index.body";
import Item from "./index.item";
import Viewport from "./index.viewport";
import useScroll from "../../hook/useScroll";
import useAutoSize from "../../hook/useAutoSize";
import { Children, forwardRef, useEffect } from "react";
import usePrepareGroup from "../../hook/usePrepareGroup";

export const DIRECTION_MIXED = "mixed";
export const DIRECTION_VERTICAL = "vertical";

type Direction = "horizontal" | "vertical" | "mixed";

type PropTypes = {
    children: React.ReactNode[] | React.ReactNode[][];
    className?: string;
    columnWidth: number | "auto";
    direction: Direction;
    numColumns: number;
    numRows: number;
    onScroll?: (scrollLeft: number, scrollTop: number) => void;
    padding: number;
    rowHeight: number | "auto";
    scrollLeft?: number;
    scrollTop?: number;
};

const Virtual = forwardRef<HTMLDivElement, PropTypes>((props, ref) => {
    const { onScroll } = props;

    const scrollRef = ref as React.MutableRefObject<HTMLDivElement>;
    const scrollPosition = useScroll(
        scrollRef,
        props.scrollLeft,
        props.scrollTop
    );

    useEffect(() => {
        if (onScroll) {
            onScroll(scrollPosition.scrollLeft, scrollPosition.scrollTop);
        }
    }, [onScroll, scrollPosition]);

    const columnWidth = useAutoSize(
        props.columnWidth,
        scrollPosition.width,
        props.padding
    );

    const rowHeight = useAutoSize(
        props.rowHeight,
        scrollPosition.height,
        props.padding
    );

    const totalHeight = props.numRows * rowHeight;
    const totalWidth = props.numColumns * columnWidth;

    const [startNodeX, visibleNodeCountX] = usePrepareGroup(
        scrollPosition.scrollLeft,
        scrollPosition.width,
        props.numColumns,
        columnWidth
    );

    const [startNodeY, visibleNodeCountY] = usePrepareGroup(
        scrollPosition.scrollTop,
        scrollPosition.height,
        props.numRows,
        rowHeight
    );

    const translateX = startNodeX * columnWidth;
    const translateY = startNodeY * rowHeight;

    let visibleChildren = [];
    if (props.direction === DIRECTION_MIXED) {
        visibleChildren = props.children
            .slice(startNodeY, startNodeY + visibleNodeCountY)
            .map((it, key) => (
                <Row key={key} padding={props.padding}>
                    {Children.toArray(it)
                        .slice(startNodeX, startNodeX + visibleNodeCountX)
                        .map((it, key) => (
                            <Item
                                key={key}
                                height={rowHeight}
                                width={columnWidth}
                            >
                                {it}
                            </Item>
                        ))}
                </Row>
            ));
    } else {
        const [start, end] =
            props.direction === DIRECTION_VERTICAL
                ? [startNodeY, startNodeY + visibleNodeCountY]
                : [startNodeX, startNodeX + visibleNodeCountX];

        visibleChildren = props.children.slice(start, end).map((it, key) => (
            <Row key={key} padding={props.padding}>
                <Item height={rowHeight} width={columnWidth}>
                    {it}
                </Item>
            </Row>
        ));
    }

    const className = !props.className
        ? "monolieta-virtual-scroll__main"
        : `monolieta-virtual-scroll__main ${props.className}`;

    return (
        <div ref={ref} className={className} role="list">
            <Viewport height={totalHeight} width={totalWidth}>
                <Body
                    padding={props.padding}
                    translateX={translateX}
                    translateY={translateY}
                >
                    {visibleChildren}
                </Body>
            </Viewport>
        </div>
    );
});

Virtual.displayName = "Virtual";

export default Virtual;
