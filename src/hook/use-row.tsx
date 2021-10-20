import { useMemo } from "react";

export default (columnCount: number, total: number) => {
    return useMemo(() => {
        let rows = columnCount > 0 ? total / columnCount : 0;
        if (rows % 1 !== 0) {
            rows = Math.trunc(rows + 1);
        }
        return rows;
    }, [columnCount, total]);
};
