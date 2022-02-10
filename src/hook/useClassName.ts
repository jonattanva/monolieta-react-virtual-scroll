import { Direction } from "../types";

export default (direction: Direction, className: string = "") => {
    let result = "monolieta-virtual-scroll__main";

    if (direction !== "mixed") {
        result += ` monolieta-virtual-scroll__main--${direction}`;
    }

    if (className !== "") {
        result += ` ${className}`;
    }

    return result;
};
