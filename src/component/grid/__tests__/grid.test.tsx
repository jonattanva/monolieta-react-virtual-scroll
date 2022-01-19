import Grid from "..";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

const generate = (index: number = 6) => {
    return new Array(index).fill(null).map((_, i) => {
        return <div key={i}>{`row ${i}`}</div>;
    });
};

describe("<Grid/>", () => {
    beforeAll(() => {
        window.resizeTo = function resizeTo(width, height) {
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

    it("general style", () => {
        window.resizeTo(500, 500);

        render(
            <div style={{ width: "200px", height: "400px" }}>
                <Grid
                    columnCount={2}
                    rowHeight={100}
                    columnWidth={100}
                    scrollTop={100}
                >
                    {generate()}
                </Grid>
            </div>
        );

        const container = screen.getByRole("list");
        expect(container).toHaveClass("monolieta-virtual-scroll__main");
    });

    it("custom style", () => {
        window.resizeTo(500, 500);

        render(
            <div style={{ width: "200px", height: "400px" }}>
                <Grid
                    className="test-class"
                    columnCount={2}
                    rowHeight={100}
                    columnWidth={100}
                    scrollTop={100}
                >
                    {generate()}
                </Grid>
            </div>
        );

        const container = screen.getByRole("list");
        expect(container).toHaveClass(
            "monolieta-virtual-scroll__main test-class"
        );
    });

    it("vertical offset", () => {
        window.resizeTo(500, 500);

        const onScroll = jest.fn();
        render(
            <div style={{ width: "200px", height: "400px" }}>
                <Grid
                    columnCount={2}
                    onScroll={onScroll}
                    rowHeight={100}
                    columnWidth={100}
                    scrollTop={100}
                >
                    {generate()}
                </Grid>
            </div>
        );

        expect(onScroll).toHaveBeenCalledTimes(1);
    });

    it("visible elements", () => {
        window.resizeTo(500, 500);

        render(
            <div style={{ width: "200px", height: "400px" }}>
                <Grid columnCount={2} rowHeight={100} columnWidth={100}>
                    {generate()}
                </Grid>
            </div>
        );

        const items = screen.getAllByText(/row [0-9]/);
        expect(items).toHaveLength(4);
    });

    it("column count auto", () => {
        window.resizeTo(500, 500);

        render(
            <div style={{ width: "200px", height: "400px" }}>
                <Grid rowHeight={100} columnWidth={100}>
                    {generate()}
                </Grid>
            </div>
        );

        waitFor(
            () => {
                const items = screen.getAllByText(/row [0-9]/);
                expect(items).toHaveLength(4);
            },
            { timeout: 1000 }
        );
    });

    it("column count trunc", () => {
        window.resizeTo(500, 500);

        render(
            <div style={{ width: "200px", height: "400px" }}>
                <Grid columnCount={2} rowHeight={100} columnWidth={100}>
                    {generate(7)}
                </Grid>
            </div>
        );

        const items = screen.getAllByText(/row [0-9]/);
        expect(items).toHaveLength(4);
    });
});
