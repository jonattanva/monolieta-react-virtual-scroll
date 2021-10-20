import { useRef } from "react";
import css from "./virtual.style";
import useRow from "./hook/useRow";
import useScroll from "./hook/useScroll";
import useVisible from "./hook/useVisible";

type PropTypes = {
    children: React.ReactNode[];
    height: number;
    width: number;
};

const List = (props: PropTypes) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const scrollPosition = useScroll(scrollRef);

    const columns = 1;
    const total = props.children.length;
    const rows = useRow(columns, total);

    const totalHeight = rows * props.height;
    const totalWidth = columns * props.width;

    const offsetWidth = scrollRef.current ? scrollRef.current.clientWidth : 0;
    const offsetX = offsetWidth - totalWidth;

    const scrollTop = scrollPosition ? scrollPosition.scrollTop : 0;
    const scrollHeight = scrollPosition ? scrollPosition.size.height : 0;

    let startNode = Math.max(0, Math.floor(scrollTop / props.height));
    let visibleNodeCount = Math.ceil(scrollHeight / props.height) + 2;
    visibleNodeCount = Math.min(rows - startNode, visibleNodeCount) * columns;

    const offsetY = startNode * props.height;
    startNode = startNode * columns;

    const visibleChildren = useVisible(
        props.children,
        startNode,
        visibleNodeCount
    ).map((item, index) => (
        <div
            key={index}
            style={{
                height: `${props.height}px`,
                width: `${props.width}px`,
            }}
        >
            {item}
        </div>
    ));

    return (
        <div ref={scrollRef} style={css.main}>
            <div style={{ height: totalHeight, ...css.viewport }}>
                <div style={css.body(offsetX, offsetY)}>{visibleChildren}</div>
            </div>
        </div>
    );
};

export default List;
