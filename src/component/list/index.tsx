import Virtual from "../virtual";
import { Render } from "../../types";
import Row from "../virtual/index.row";
import Item from "../virtual/index.item";
import { useRef, Fragment } from "react";

type PropTypes =
    | {
          children?: React.ReactNode[];
          className?: string;
          columnWidth?: never;
          direction: "vertical";
          onScroll?: (scrollLeft: number, scrollTop: number) => void;
          padding?: number;
          rowHeight: number;
          scrollLeft?: never;
          scrollTop?: number;
      }
    | {
          children?: React.ReactNode[];
          className?: string;
          columnWidth: number;
          direction: "horizontal";
          onScroll?: (scrollLeft: number, scrollTop: number) => void;
          padding?: number;
          rowHeight?: never;
          scrollLeft?: number;
          scrollTop?: never;
      };

const List = (props: PropTypes) => {
    const {
        children = [],
        className = "",
        columnWidth = "auto",
        padding = 0,
        rowHeight = "auto",
    } = props;

    const ref = useRef<HTMLDivElement>(null);

    const [numRows, numColumns] =
        props.direction === "vertical"
            ? [children.length, 1]
            : [1, children.length];

    const style = {
        body: `monolieta-virtual-scroll__body monolieta-virtual-scroll__body--${props.direction}`,
        main: `monolieta-virtual-scroll__main--${props.direction} ${className}`,
    };

    return (
        <Virtual
            columnWidth={columnWidth}
            dataSource={children}
            direction={props.direction}
            numColumns={numColumns}
            numRows={numRows}
            onScroll={props.onScroll}
            padding={padding}
            ref={ref}
            render={Body}
            rowHeight={rowHeight}
            scrollLeft={props.scrollLeft}
            scrollTop={props.scrollTop}
            style={style}
        />
    );
};

const Body = (props: Render) => {
    const [start, end] =
        props.direction === "vertical"
            ? [props.startNodeY, props.startNodeY + props.visibleNodeCountY]
            : [props.startNodeX, props.startNodeX + props.visibleNodeCountX];

    return (
        <Fragment>
            {props.children.slice(start, end).map((child, key) => (
                <Row key={key} padding={props.padding}>
                    <Item width={props.columnWidth} height={props.rowHeight}>
                        {child}
                    </Item>
                </Row>
            ))}
        </Fragment>
    );
};

export default List;
