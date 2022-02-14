import useScroll from "../../hook/useScroll";
import { forwardRef, useEffect } from "react";
import useAutoSize from "../../hook/useAutoSize";
import useTranslate from "../../hook/useTranslate";
import { Direction, Size, Style } from "../../types";
import usePrepareGroup from "../../hook/usePrepareGroup";
import { getSizeStyle, getTranslateStyle } from "../../style";

type PropTypes = {
    columnWidth: Size;
    dataSource: React.ReactNode[] | React.ReactNode[][];
    direction: Direction;
    numColumns: number;
    numRows: number;
    onScroll?: (scrollLeft: number, scrollTop: number) => void;
    padding: number;
    render: React.FunctionComponent<any>;
    rowHeight: Size;
    scrollLeft?: number;
    scrollTop?: number;
    style: Style;
};

const Virtual = forwardRef<HTMLDivElement, PropTypes>((props, ref) => {
    // prettier-ignore
    const {
        onScroll,
        render: Render
    } = props;

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

    const translateY = useTranslate(startNodeY * rowHeight);
    const translateX = useTranslate(startNodeX * columnWidth);

    return (
        <div
            className={`monolieta-virtual-scroll__main ${props.style.main}`}
            ref={ref}
            role="list"
        >
            <div
                className="monolieta-virtual-scroll__viewport"
                style={getSizeStyle(totalHeight, totalWidth)}
            >
                <div
                    className={props.style.body}
                    style={getTranslateStyle(
                        translateX,
                        translateY,
                        props.padding
                    )}
                >
                    <Render
                        columnWidth={columnWidth}
                        direction={props.direction}
                        padding={props.padding}
                        rowHeight={rowHeight}
                        startNodeX={startNodeX}
                        startNodeY={startNodeY}
                        visibleNodeCountX={visibleNodeCountX}
                        visibleNodeCountY={visibleNodeCountY}
                    >
                        {props.dataSource}
                    </Render>
                </div>
            </div>
        </div>
    );
});

export default Virtual;
