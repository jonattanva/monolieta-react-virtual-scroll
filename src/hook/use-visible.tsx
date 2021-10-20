import { useMemo } from "react";

export default (
    children: React.ReactNode[],
    startNode: number,
    visibleNodeCount: number
) => {
    return useMemo(() => {
        return children.slice(startNode, startNode + visibleNodeCount);
    }, [startNode, visibleNodeCount, children]);
};
