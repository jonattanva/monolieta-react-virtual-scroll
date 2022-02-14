import Virtual from "../virtual";
import Row from "../virtual/index.row";
import Item from "../virtual/index.item";
import { Direction, Render } from "../../types";
import { useRef, Children, Fragment } from "react";

type PropTypes = {
    children?: React.ReactNode[][];
    className?: string;
    columnWidth: number;
    direction?: Direction;
    onScroll?: (scrollLeft: number, scrollTop: number) => void;
    padding?: number;
    rowHeight: number;
    scrollLeft?: number;
    scrollTop?: number;
};

const Grid = (props: PropTypes) => {
    // prettier-ignore
    const {
        children = [],
        className= "",
        direction = "mixed",
        padding = 0
    } = props;

    const ref = useRef<HTMLDivElement>(null);

    const numColumns = children.reduce((previous, current) => {
        return Math.max(previous, current.length);
    }, 0);

    const style = {
        body: `monolieta-virtual-scroll__body`,
        main: `monolieta-virtual-scroll__main--${props.direction} ${className}`,
    };

    return (
        <Virtual
            columnWidth={props.columnWidth}
            dataSource={children}
            direction={direction}
            numColumns={numColumns}
            numRows={children.length}
            onScroll={props.onScroll}
            padding={padding}
            ref={ref}
            render={Body}
            rowHeight={props.rowHeight}
            scrollLeft={props.scrollLeft}
            scrollTop={props.scrollTop}
            style={style}
        />
    );
};

const Body = (props: Render) => (
    <Fragment>
        {props.children
            .slice(props.startNodeY, props.startNodeY + props.visibleNodeCountY)
            .map((child, key) => (
                <Row key={key} padding={props.padding}>
                    {Children.toArray(child)
                        .slice(
                            props.startNodeX,
                            props.startNodeX + props.visibleNodeCountX
                        )
                        .map((child, key) => (
                            <Item
                                key={key}
                                width={props.columnWidth}
                                height={props.rowHeight}
                            >
                                {child}
                            </Item>
                        ))}
                </Row>
            ))}
    </Fragment>
);

export default Grid;
