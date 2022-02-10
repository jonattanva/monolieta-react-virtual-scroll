import { DIRECTION_MIXED } from "../constant";

export default (direction: string, className: string = "") => {
    let result = "monolieta-virtual-scroll__main";

    if (direction !== DIRECTION_MIXED) {
        result += ` monolieta-virtual-scroll__main--${direction}`;
    }

    if (className !== "") {
        result += ` ${className}`;
    }

    return result;
};
