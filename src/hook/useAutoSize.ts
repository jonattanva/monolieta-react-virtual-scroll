import { Size } from "../types";

export default (value: Size, sizeScroll: number, padding: number = 0) =>
    Math.floor((value === "auto" ? sizeScroll : value) + padding * 2);
