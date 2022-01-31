import List from "..";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

describe("<List/>", () => {
    beforeAll(() => {
        window.resizeTo = function resizeTo(width, height) {
            Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
                configurable: true,
                value: width,
            });

            Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
                configurable: true,
                value: height,
            });

            Object.assign(this, {
                innerHeight: height,
                innerWidth: width,
                offsetHeight: height,
                offsetWidth: width,
                outerHeight: height,
                outerWidth: width,
            }).dispatchEvent(new this.Event("resize"));
        };
    });

    it("custom style", () => {
        window.resizeTo(300, 400);

        render(
            <List
                direction="vertical"
                rowHeight={100}
                className="test-class"
            ></List>
        );

        const container = screen.getByRole("list");
        expect(container).toHaveClass(
            "monolieta-virtual-scroll__main test-class"
        );
    });

    it("visible elements - vertical", () => {
        window.resizeTo(300, 400);

        render(
            <List direction="vertical" rowHeight={100}>
                {new Array(100).fill(null).map((_, i) => {
                    return <div key={i}>{`row ${i}`}</div>;
                })}
            </List>
        );

        const items = screen.getAllByText(/row [0-9]/);
        expect(items).toHaveLength(6);
    });

    it("visible elements - horizontal", () => {
        window.resizeTo(300, 400);

        render(
            <List direction="horizontal" columnWidth={100}>
                {new Array(100).fill(null).map((_, i) => {
                    return <div key={i}>{`row ${i}`}</div>;
                })}
            </List>
        );

        const items = screen.getAllByText(/row [0-9]/);
        expect(items).toHaveLength(5);
    });

    it("on scroll", () => {
        window.resizeTo(300, 400);
        const onScroll = jest.fn();

        render(
            <List
                direction="horizontal"
                columnWidth={100}
                onScroll={onScroll}
                scrollLeft={100}
            >
                {new Array(100).fill(null).map((_, i) => {
                    return <div key={i}>{`row ${i}`}</div>;
                })}
            </List>
        );

        expect(onScroll).toHaveBeenCalledTimes(2);
    });
});
