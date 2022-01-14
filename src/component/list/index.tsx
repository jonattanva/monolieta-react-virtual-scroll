import { useRef } from "react";
import Virtual from "../virtual";

type Setting = {
    columnCount: number | "auto";
    columnWidth: number | "auto";
    rowCount: number | "auto";
    rowHeight: number | "auto";
};

type PropTypes = {
    children: React.ReactNode[];
    className?: string;
    columnWidth?: number | "auto";
    direction?: "vertical" | "horizontal";
    onScroll?: (scrollTop: number) => void;
    padding?: number;
    rowHeight?: number | "auto";
    scrollTop?: number;
};

const List = (props: PropTypes) => {
    const {
        direction = "vertical",
        columnWidth = "auto",
        rowHeight = "auto",
        padding = 0,
    } = props;

    const listRef = useRef<HTMLDivElement>(null);
    const prepare = usePrepare(rowHeight, columnWidth, direction);

    return (
        <Virtual
            {...prepare}
            className={props.className}
            direction={direction}
            onScroll={props.onScroll}
            padding={padding}
            ref={listRef}
            scrollTop={props.scrollTop}
        >
            {props.children}
        </Virtual>
    );
};

const usePrepare = (
    rowHeight: number | "auto",
    columnWidth: number | "auto",
    direction: "vertical" | "horizontal"
): Setting => {
    if (direction === "vertical") {
        return {
            columnCount: 1,
            columnWidth: "auto",
            rowCount: "auto",
            rowHeight,
        };
    } else {
        return {
            columnCount: "auto",
            columnWidth,
            rowCount: 1,
            rowHeight: "auto",
        };
    }
};

export default List;
