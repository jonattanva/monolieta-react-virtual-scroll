import { useRef } from "react";
import Virtual from "../virtual";
import { DIRECTION_VERTICAL } from "../../constant";

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
        columnWidth = "auto",
        padding = 0,
        rowHeight = "auto",
    } = props;

    const gridRef = useRef<HTMLDivElement>(null);

    const [numRows, numColumns] =
        props.direction === DIRECTION_VERTICAL
            ? [children.length, 1]
            : [1, children.length];

    return (
        <Virtual
            className={props.className}
            columnWidth={columnWidth}
            direction={props.direction}
            numColumns={numColumns}
            numRows={numRows}
            onScroll={props.onScroll}
            padding={padding}
            ref={gridRef}
            rowHeight={rowHeight}
            scrollLeft={props.scrollLeft}
            scrollTop={props.scrollTop}
        >
            {children}
        </Virtual>
    );
};

export default List;
