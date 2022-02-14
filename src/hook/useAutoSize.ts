import { Size } from "../types";

export default (value: Size, sizeScroll: number, padding: number) =>
    Math.floor((value === "auto" ? sizeScroll : value) + padding * 2);
