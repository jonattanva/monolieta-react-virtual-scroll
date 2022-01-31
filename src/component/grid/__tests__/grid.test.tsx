import Grid from "..";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

describe("<Grid/>", () => {
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

    it("visible elements", () => {
        window.resizeTo(200, 400);

        render(
            <Grid rowHeight={100} columnWidth={100}>
                {new Array(10)
                    .fill(0)
                    .map((_, i) =>
                        new Array(2)
                            .fill(0)
                            .map((_, j) => (
                                <div key={j}>{`row ${i} column ${j}`}</div>
                            ))
                    )}
            </Grid>
        );

        const items = screen.getAllByText(/row [0-9] column [0-9]/);
        expect(items).toHaveLength(12);
    });

    it("on scroll", () => {
        window.resizeTo(200, 400);
        const onScroll = jest.fn();

        render(
            <Grid
                columnWidth={100}
                onScroll={onScroll}
                rowHeight={100}
                scrollLeft={100}
                scrollTop={100}
            >
                {new Array(10)
                    .fill(0)
                    .map(() =>
                        new Array(10)
                            .fill(0)
                            .map((_, j) => <div key={j}>{`row ${j}`}</div>)
                    )}
            </Grid>
        );

        expect(onScroll).toHaveBeenCalledTimes(2);
    });

    it("custom style", () => {
        window.resizeTo(500, 500);

        render(
            <Grid
                className="test-class"
                rowHeight={100}
                columnWidth={100}
                scrollTop={100}
            ></Grid>
        );

        const container = screen.getByRole("list");
        expect(container).toHaveClass(
            "monolieta-virtual-scroll__main test-class"
        );
    });
});
