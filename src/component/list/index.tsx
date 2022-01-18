import { useRef } from "react";
import Virtual from "../virtual";
import usePrepare from "../../hook/usePrepare";

type PropTypes = {
    children: React.ReactNode[];
    className?: string;
    columnWidth?: number | "auto";
    direction?: "vertical" | "horizontal";
    onScroll?: (scrollTop: number, scrollLeft: number) => void;
    padding?: number;
    rowHeight?: number | "auto";
    scrollLeft?: number;
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
            scrollLeft={props.scrollLeft}
            scrollTop={props.scrollTop}
        >
            {props.children}
        </Virtual>
    );
};

export default List;
